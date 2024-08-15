package main

import (
	"context"
	"fmt"
	"lambda/S3helper"
	"lambda/fitHelper"
	"lambda/myevent"
	"lambda/publish"

	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
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

	// Extract bucket and object key from the event
	for _, record := range s3event.Records {
		metaData, err = S3helper.ExtractMetaData(record, svc)

		// Example usage: publishing a message
		err = publish.PublishMessage(iotClient, &metaData.PostId, "go-start-processing")
		if err != nil {
			fmt.Println("Error publishing to IoT:", err)
			break
		} else {
			fmt.Printf("Message published successfully - postId: %s", metaData.PostId)
		}

		// Get the object from S3
		body, err := myevent.GetObjectBody(svc, metaData.Bucket, metaData.Key)
		if err != nil {
			return "", fmt.Errorf("failed to get object from S3: %v", err)
		}

		fit, err := fitHelper.DecodeFITFile(body)
		if err != nil {
			fmt.Println(err)
			return "", fmt.Errorf("failed to decode object body: %v", err)
		}

		fitHelper.PrintFITFileDetails(fit)

		activity, err := fitHelper.GetFITFileActivity(fit)
		if err != nil {
			fmt.Println(err)
			return "", fmt.Errorf("failed to get activity: %v", err)
		}

		ProcessActivityRecords(activity, &metaData.PostId, metaData.Bucket, metaData.IdentityId)
	}

	err = publish.PublishMessage(iotClient, &metaData.PostId, "go-finish-processing")
	if err != nil {
		fmt.Println("Error publishing to IoT:", err)
	}

	return fmt.Sprintf("Hello, %s!", s3event.Records[0].S3.Object.Key), nil
}

func main() {
	lambda.Start(HandleRequest)
}
