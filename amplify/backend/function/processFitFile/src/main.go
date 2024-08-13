package main

import (
	"context"
	"fmt"
	"lambda/S3helper"
	"lambda/dynamo"
	"lambda/fitHelper"
	"lambda/myevent"
	powercalc "lambda/powerCalc"
	"lambda/publish"
	"lambda/simplify"
	"log"
	"math"
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
	// Variables for calculations and data storage
	var totalPower int
	var count int
	var powers []uint16
	var cads []uint8
	var temps []int8
	var coordinates [][]float64
	var distances []float32
	var elevations []float64
	var hearts []uint8
	var isHeartRateValid bool

	var totalElevationGain float32
	var previousAltitude float32
	first := true
	var stoppedTime time.Duration

	// Loop through each record in the activity file
	for i, record := range activity.Records {
		power := record.Power
		if i > 0 {
			prevRecord := activity.Records[i-1]
			currRecord := activity.Records[i]

			// If the distance hasn't changed, assume the time is "stopped"
			if currRecord.Distance == prevRecord.Distance {
				stoppedTime += currRecord.Timestamp.Sub(prevRecord.Timestamp)
			}

			// Store power data
			if power != 65535 {
				totalPower += int(power)
				powers = append(powers, power)
			} else {
				powers = append(powers, 0)
			}

			// Store cadence data
			if record.Cadence != 255 {
				cads = append(cads, uint8(record.Cadence))
			} else {
				cads = append(cads, 0)
			}

			// Store temperature data
			if record.Temperature != 0 {
				temps = append(temps, record.Temperature)
			}

			// Store heart rate data
			hearts = append(hearts, record.HeartRate)
			if record.HeartRate != 255 {
				isHeartRateValid = true
			}

			// Store coordinate data
			coordinates = append(coordinates, []float64{float64(record.PositionLong.Degrees()), float64(record.PositionLat.Degrees()), float64(record.EnhancedAltitude)})

			// Store distance data
			distances = append(distances, (float32(record.Distance) / 100)) // convert to meters

			count++

			// Calculate elevation gain
			if record.Altitude != 0 {
				altitude := record.EnhancedAltitude
				var decodedAltitude = fitHelper.DecodeAltitude(altitude)

				elevation, _ := strconv.ParseFloat(fmt.Sprintf("%.2f", float32(decodedAltitude)*3.28084), 32)
				elevations = append(elevations, elevation)

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

	// Check if any records were found
	if count == 0 {
		fmt.Println("No records found")
		return
	}

	// Calculate average power
	averagePower := float64(totalPower) / float64(count)

	// Calculate total distance
	totalDistance := (float64(activity.Records[len(activity.Records)-1].Distance) / 100) / 1000
	normalizedPower := myevent.CalcNormalizedPower(powers)

	// Print calculated data
	fmt.Printf("Total Distance: %.2f kilometers\n", totalDistance)
	fmt.Printf("Moving Time: %.2f hours\n", float64(count)/3600)
	fmt.Printf("Elapsed Time: %s\n", activity.Records[len(activity.Records)-1].Timestamp.Sub(activity.Records[0].Timestamp))
	fmt.Printf("Average Power: %.2f watts\n", averagePower)
	fmt.Printf("Average Speed: %.2f km/h\n", float64(totalDistance)/(float64(count)/3600))
	fmt.Printf("Normalized Power: %.2f watts\n", normalizedPower)
	fmt.Printf("Total Elevation Gain: %.2f meters\n", totalElevationGain)

	// Calculate best powers for different time intervals
	var powerResults = myevent.CalcBestPowers(powercalc.TimeIntervals(), powers, false)
	var cadenceResults = myevent.CalcBestPowers(powercalc.TimeIntervals(), convertToUint16Slice(cads), true)
	var tempResults = myevent.CalcBestPowers(powercalc.TimeIntervals(), convertToUint16Slice([]uint8(convertToInt8Slice(temps))), true)
	var heartResults = myevent.CalcBestPowers(powercalc.TimeIntervals(), convertToUint16Slice(hearts), true)
	// var elevationGrades = myevent.CalcElevationGrades(coordinates, distances, elevations)
	var elapsedTime = activity.Records[len(activity.Records)-1].Timestamp.Sub(activity.Records[0].Timestamp)

	// Simplify the points (with a tolerance of 1)
	var simplifiedCoordinates = simplify.SimplifyDouglasPeucker(coordinates, 0.00000001)

	timeElevationMap := make([][]float64, len(elevations))
	for i := range elevations {
		timeElevationMap[i] = []float64{float64(distances[i]), float64(i)}
	}
	var simplifiedElevations = simplify.Simplify(timeElevationMap, 0.1, true)

	// Merge distance, powers, and grades into a new map
	mergedData := make([]interface{}, len(simplifiedElevations))
	for i, val := range simplifiedElevations {
		var grade float64
		var gradeFinal float64
		if i == 0 {
			grade = 0
		} else {
			var elevationChange = elevations[int(val[1])] - elevations[int(simplifiedElevations[i-1][1])]
			var distanceChange = float64(distances[int(val[1])] - distances[int(simplifiedElevations[i-1][1])])
			grade = elevationChange / distanceChange
			if math.IsNaN(grade) || math.IsInf(grade, 0) {
				gradeFinal = 0.0
			} else {
				gradeFinal = grade
			}
			// fmt.Println("Grade:", grade)
			// fmt.Println("Elevation Change:", elevationChange)
			// fmt.Println("Distance Change:", distanceChange)
		}

		mergedData[i] = map[string]interface{}{
			"p": powers[int(val[1])],
			"d": val[0],
			"t": val[1],
			"e": float32(elevations[int(val[1])]),
			"h": hearts[int(val[1])],
			"g": gradeFinal,
		}
	}

	// Print the merged data
	// fmt.Println("Merged Data:", mergedData)

	// fmt.Println("Original indexes of simplified points:", originalIndexes)
	// // fmt.Println("Filtered filterDistance:", filterDistance)
	// // fmt.Println("Filtered filterPowers:", filterPowers)
	// // fmt.Println("Filtered filterElevation:", filterElevation)
	// fmt.Println("Simplified Coordinates Length:", len(simplifiedCoordinates))
	// fmt.Println("Simplified Elevation Length:", len(simplifiedElevations))
	// fmt.Println("originalIndexes Length:", len(originalIndexes))
	// fmt.Println("filterDistance Length:", len(filterDistance))

	// Upload data to S3
	s3key := fmt.Sprintf("timeseries/%s.json", uuid.New().String())

	// Convert simplifiedElevations to []float32
	// var simplifiedElevationsFloat32 []float32
	// for _, elev := range simplifiedElevations {
	// 	simplifiedElevationsFloat32 = append(simplifiedElevationsFloat32, float32(elev))
	// }

	if isHeartRateValid {
		S3helper.UploadToS3(simplifiedCoordinates, mergedData, bucket, identityId, s3key)
	} else {
		S3helper.UploadToS3(simplifiedCoordinates, mergedData, bucket, identityId, s3key)
	}

	// Update DynamoDB item
	dynamo.UpdateItem(*postId, tempResults, cadenceResults, totalDistance, heartResults, totalElevationGain, int(stoppedTime.Seconds()), int(elapsedTime.Seconds()), normalizedPower, nil, nil, 0, s3key, powerResults)
}

func main() {
	lambda.Start(HandleRequest)
}
