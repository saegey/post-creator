package main

import (
	"context"
	"fmt"
	"lambda/S3helper"
	"lambda/dynamo"
	"lambda/fitHelper"
	"lambda/myevent"
	"lambda/publish"
	"strings"

	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/iotdataplane"
	"github.com/aws/aws-sdk-go/service/s3"
)

func HandleRequest(ctx context.Context, s3event myevent.Event) (string, error) {
	// Specify the endpoint
	endpoint := "a29ieb9zd32ips-ats.iot.us-east-1.amazonaws.com"

	// Create a new session
	iotSess := session.Must(session.NewSession())

	// Create an IoT Data Plane client with the custom endpoint
	iotClient := iotdataplane.New(iotSess, &aws.Config{
		Endpoint: aws.String(endpoint),
		Region:   aws.String("us-east-1"),
	})

	// Initialize the S3 client
	sess, err := session.NewSession(&aws.Config{
		Region: aws.String("us-east-1"), // Change this to your region
	})
	if err != nil {
		return "", fmt.Errorf("failed to create session: %v", err)
	}

	svc := s3.New(sess)
	var metaData S3helper.MetaData

	dynamoSess := session.Must(session.NewSessionWithOptions(session.Options{
		SharedConfigState: session.SharedConfigEnable,
	}))
	dynamoSvc := dynamodb.New(dynamoSess)

	// Extract bucket and object key from the event
	for _, record := range s3event.Records {
		metaData, err = S3helper.ExtractMetaData(record, svc)
		if err != nil {
			return "", fmt.Errorf("failed to extract metadata: %v", err)
		}

		// Example usage: publishing a message
		err = publish.PublishMessage(iotClient, &metaData.PostId, "go-start-processing")
		if err != nil {
			fmt.Println("Error publishing to IoT:", err)
			break
		}

		// Get the object from S3
		body, err := myevent.GetObjectBody(svc, metaData.Bucket, metaData.Key)
		if err != nil {
			return "", fmt.Errorf("failed to get object from S3: %v", err)
		}

		// Decode the FIT file
		fit, err := fitHelper.DecodeFITFile(body)
		if err != nil {
			fmt.Println(err)
			return "", fmt.Errorf("failed to decode object body: %v", err)
		}

		// Print the FIT file details
		fitHelper.PrintFITFileDetails(fit)

		// Get the activity from the FIT file
		activity, err := fitHelper.GetFITFileActivity(fit)
		if err != nil {
			fmt.Println(err)
			return "", fmt.Errorf("failed to get activity: %v", err)
		}

		// Split the string by "/"
		parts := strings.Split(metaData.Key, "/")

		// Get the last element
		fitFilename := parts[len(parts)-1]

		// Process the activity records
		processedData, err := ProcessActivityRecords(ProcessActivityOptions{
			Activity:    activity,
			PostId:      &metaData.PostId,
			Bucket:      metaData.Bucket,
			IdentityId:  metaData.IdentityId,
			GpxFileName: fitFilename,
			Svc:         dynamoSvc,
		})
		if err != nil {
			fmt.Printf("Error processing activity records: %v", err)
			// return
		}
		fmt.Println("Power Breakdown:", processedData.PowerResults)
		fmt.Println("Cadence Breakdoon:", processedData.CadenceResults)
		fmt.Println("Heart Rate Breakdown:", processedData.HeartResults)

		// Upload data to S3
		err = S3helper.UploadToS3(S3helper.UploadToS3Input{
			Coordinates: processedData.SimplifiedCoordinates,
			Elevation:   processedData.MergedData,
			Bucket:      metaData.Bucket,
			IdentityID:  metaData.IdentityId,
			S3Key:       processedData.S3Key,
		})
		if err != nil {
			fmt.Printf("Error uploading to S3: %v", err)
		}

		// Update DynamoDB item
		err = dynamo.UpdateItem(dynamoSvc, dynamo.UpdateItemInput{
			PostID:           metaData.PostId,
			TempAnalysis:     processedData.TempResults,
			CadenceAnalysis:  processedData.CadenceResults,
			Distance:         processedData.TotalDistance,
			HeartAnalysis:    processedData.HeartResults,
			ElevationGain:    processedData.TotalElevationGain,
			StoppedTime:      processedData.StoppedTime,
			ElapsedTime:      processedData.ElapsedTime,
			NormalizedPower:  processedData.NormalizedPower,
			Zones:            nil, // Assuming you have no data for Zones
			PowerZoneBuckets: nil, // Assuming you have no data for PowerZoneBuckets
			TimeInRedSecs:    0,   // Assuming no time in red
			S3Key:            processedData.S3Key,
			PowerAnalysis:    processedData.PowerResults,
			GPXFile:          fitFilename,
		})
		if err != nil {
			fmt.Printf("Error updating DynamoDB: %v", err)
		}
	}

	// Example usage: publishing a message
	err = publish.PublishMessage(iotClient, &metaData.PostId, "go-finish-processing")
	if err != nil {
		fmt.Println("Error publishing to IoT:", err)
	}

	return fmt.Sprintf("Hello, %s!", s3event.Records[0].S3.Object.Key), nil
}

func main() {
	lambda.Start(HandleRequest)
}
