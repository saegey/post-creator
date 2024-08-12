package main

import (
	"context"
	"fmt"
	"lambda/S3helper"
	"lambda/dynamo"
	"lambda/fitHelper"
	"lambda/myevent"
	"lambda/publish"
	"log"
	"net/url"
	"strconv"
	"time"

	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/iotdataplane"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/google/uuid"
	"github.com/tormoder/fit"
)

func timeIntervals() []int {
	return []int{
		1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 20, 25, 30, 35, 40, 45, 50,
		55, 60, 70, 80, 90, 100, 110, 120, 180, 240, 300, 360, 420, 480, 540, 600,
		660, 720, 780, 840, 900, 960, 1020, 1080, 1140, 1200, 1500, 1800, 2100, 2400,
		2700, 3000, 3300, 3600, 4200, 4800, 5400, 6000, 6600, 7200, 7800, 8400, 9000,
		9600, 10200, 10800, 12000, 13200, 14400, 15600, 16800, 18000, 19200, 20400,
		21600,
	}
}

func convertToUint16Slice(slice []uint8) []uint16 {
	result := make([]uint16, len(slice))
	for i, v := range slice {
		result[i] = uint16(v)
	}
	return result
}

func convertToInt8Slice(slice []int8) []uint8 {
	result := make([]uint8, len(slice))
	for i, v := range slice {
		result[i] = uint8(v)
	}
	return result
}

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
	var postId *string
	var identityId *string
	var bucket string

	// Extract bucket and object key from the event
	for _, record := range s3event.Records {
		sanitizedKey, err := url.QueryUnescape(record.S3.Object.Key)
		if err != nil {
			fmt.Println("Error unescaping string:", err)
		}
		bucket = record.S3.Bucket.Name
		// key := record.S3.Object.Key
		log.Printf("Processing S3 object from bucket %s with key %s", bucket, sanitizedKey)

		// Get the metadata of the S3 object
		metaData, err := myevent.GetObjectMetadata(svc, bucket, sanitizedKey)
		if err != nil {
			return "", fmt.Errorf("failed to get object metadata: %v", err)
		}
		postId = metaData.Metadata["Postid"]
		if postId == nil {
			return "", fmt.Errorf("missing post id: %v", err)
		}

		identityId = metaData.Metadata["Identityid"]
		if identityId == nil {
			return "", fmt.Errorf("missing identity id: %v", err)
		}

		// Example usage: publishing a message
		err = publish.PublishMessage(iotClient, postId)
		if err != nil {
			fmt.Println("Error publishing to IoT:", err)
			break
		} else {
			fmt.Printf("Message published successfully - postId: %s", *postId)
		}

		// Get the object from S3
		body, err := myevent.GetObjectBody(svc, bucket, sanitizedKey)
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

		processActivityRecords(activity, postId, bucket, *identityId)
	}

	return fmt.Sprintf("Hello, %s!", s3event.Records[0].S3.Object.Key), nil
}

func processActivityRecords(activity *fit.ActivityFile, postId *string, bucket string, identityId string) {
	var totalPower int
	var count int
	var powers []uint16
	var cads []uint8
	var temps []int8
	var coordinates [][]float32
	var distances []float32
	var elevations []float32
	var hearts []uint8
	var isHeartRateValid bool

	var totalElevationGain float32
	var previousAltitude float32
	first := true
	var stoppedTime time.Duration

	for i, record := range activity.Records {
		power := record.Power
		if i > 0 {
			prevRecord := activity.Records[i-1]
			currRecord := activity.Records[i]

			// If the distance hasn't changed, assume the time is "stopped"
			if currRecord.Distance == prevRecord.Distance {
				stoppedTime += currRecord.Timestamp.Sub(prevRecord.Timestamp)
			}
			// speed := record.Speed
			// fmt.Printf("Speed: %d\n", record.Speed1s)

			if power != 65535 {
				totalPower += int(power)
				powers = append(powers, power)
			}
			if record.Cadence != 255 {
				cads = append(cads, uint8(record.Cadence))
			} else {
				cads = append(cads, 0)
			}

			if record.Temperature != 0 {
				temps = append(temps, record.Temperature)
			}

			hearts = append(hearts, record.HeartRate)
			if record.HeartRate != 255 {
				isHeartRateValid = true
			}
			coordinates = append(coordinates, []float32{float32(record.PositionLong.Degrees()), float32(record.PositionLat.Degrees()), float32(record.EnhancedAltitude)})
			distances = append(distances, (float32(record.Distance) / 100)) // convert to meters

			count++

			if record.Altitude != 0 {
				altitude := record.EnhancedAltitude
				var decodedAltitude = fitHelper.DecodeAltitude(altitude)

				elevation, _ := strconv.ParseFloat(fmt.Sprintf("%.2f", float32(decodedAltitude)*3.28084), 32)
				elevations = append(elevations, float32(elevation))

				if !first {
					if decodedAltitude > previousAltitude {
						totalElevationGain += (decodedAltitude - previousAltitude)
					}
				} else {
					first = false
				}

				previousAltitude = decodedAltitude
			}
		}
	}
	if count == 0 {
		fmt.Println("No records found")
		return
	}

	averagePower := float64(totalPower) / float64(count)
	totalDistance := (float64(activity.Records[len(activity.Records)-1].Distance) / 100) / 1000
	fmt.Printf("Total Distance: %.2f kilometers\n", totalDistance)
	fmt.Printf("Moving Time: %.2f hours\n", float64(count)/3600)
	fmt.Printf("Elapsed Time: %s\n", activity.Records[len(activity.Records)-1].Timestamp.Sub(activity.Records[0].Timestamp))
	fmt.Printf("Average Power: %.2f watts\n", averagePower)
	fmt.Printf("Average Speed: %.2f km/h\n", float64(totalDistance)/(float64(count)/3600))
	fmt.Printf("Normalized Power: %.2f watts\n", myevent.CalcNormalizedPower(powers))
	fmt.Printf("Total Elevation Gain: %.2f meters\n", totalElevationGain)

	var powerResults = myevent.CalcBestPowers(timeIntervals(), powers, false)
	var cadenceResults = myevent.CalcBestPowers(timeIntervals(), convertToUint16Slice(cads), true)

	var tempResults = myevent.CalcBestPowers(timeIntervals(), convertToUint16Slice([]uint8(convertToInt8Slice(temps))), true)
	fmt.Println("Temp Results:", tempResults)

	var heartResults = myevent.CalcBestPowers(timeIntervals(), convertToUint16Slice(hearts), true)
	var elevationGrades = myevent.CalcElevationGrades(coordinates, distances, elevations)
	// var stoppedTime = activity.Records[len(activity.Records)-1].Timestamp.Sub(activity.Records[0].Timestamp) - activity.Records[0].Timestamp.Sub(activity.Records[0].Timestamp)
	var elapsedTime = activity.Records[len(activity.Records)-1].Timestamp.Sub(activity.Records[0].Timestamp)

	fmt.Println("Best Powers:", powerResults)
	fmt.Println("Best Cadences:", cadenceResults)
	s3key := fmt.Sprintf("timeseries/%s.json", uuid.New().String())

	if isHeartRateValid {
		S3helper.UploadToS3(coordinates, elevations, powers, distances, elevationGrades, powerResults, hearts, bucket, identityId, s3key)
	} else {
		S3helper.UploadToS3(coordinates, elevations, powers, distances, elevationGrades, powerResults, []uint8{}, bucket, identityId, s3key)
	}

	dynamo.UpdateItem(*postId, tempResults, cadenceResults, totalDistance, heartResults, totalElevationGain, int(stoppedTime.Seconds()), int(elapsedTime.Seconds()), myevent.CalcNormalizedPower(powers), nil, nil, 0, s3key, powerResults)
}

func main() {
	lambda.Start(HandleRequest)
}
