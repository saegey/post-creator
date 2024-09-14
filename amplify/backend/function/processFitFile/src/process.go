package main

import (
	"fmt"
	"lambda/S3helper"
	"lambda/dynamo"
	"lambda/fitHelper"
	"lambda/myevent"
	powercalc "lambda/powerCalc"
	"lambda/simplify"
	"math"
	"strconv"
	"time"

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

type ProcessActivityOptions struct {
	Svc         dynamo.DynamoDBAPI
	Activity    *fit.ActivityFile
	PostId      *string
	Bucket      string
	IdentityId  string
	GpxFileName string
}

type ProcessedActivityData struct {
	SimplifiedCoordinates [][]float64
	MergedData            []S3helper.MergedDataItem
	S3Key                 string
	TempResults           dynamo.TempAnalysis
	CadenceResults        dynamo.CadenceAnalysis
	TotalDistance         float64
	HeartResults          dynamo.HeartAnalysis
	TotalElevationGain    float32
	StoppedTime           int
	ElapsedTime           int
	NormalizedPower       float32
	PowerResults          dynamo.PowerAnalysis
}

func ProcessActivityRecords(opts ProcessActivityOptions) (*ProcessedActivityData, error) {
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

	var totalElevationGain float32
	var previousAltitude float32
	first := true
	var stoppedTime time.Duration
	var activity = opts.Activity

	// Loop through each record in the activity file
	for i, record := range opts.Activity.Records {
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

			// Store coordinate data
			if record.PositionLat.Degrees() != 0 && record.PositionLong.Degrees() != 0 {
				lat := float64(record.PositionLat.Degrees())
				long := float64(record.PositionLong.Degrees())
				altitude := float64(record.EnhancedAltitude)

				// Ensure no NaN values are added
				if !math.IsNaN(lat) && !math.IsNaN(long) && !math.IsNaN(altitude) && altitude != 4294967295 {
					coordinates = append(coordinates, []float64{long, lat, altitude})
				}
			}

			// Store distance data
			// 4,294,967,295
			if record.Distance != 4294967295 {
				distances = append(distances, (float32(record.Distance) / 100)) // convert to meters
			}
			count++

			// Calculate elevation gain
			if record.Altitude != 0 && record.Altitude != 65535 {
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
		return nil, fmt.Errorf("no records found")
	}

	// Calculate total distance
	totalDistance := (float64(activity.Records[len(activity.Records)-1].Distance) / 100) / 1000
	normalizedPower := myevent.CalcNormalizedPower(powers)

	// Calculate best powers for different time intervals
	var timeIntervals = powercalc.GenerateIntervals(len(activity.Records))

	var powerResults = myevent.CalculateMaxAveragePowers(timeIntervals, powers)
	var cadenceResults = myevent.CalculateMaxAveragePowers(timeIntervals, convertToUint16Slice(cads))
	var tempResults = myevent.CalculateMaxAveragePowers(timeIntervals, convertToUint16Slice([]uint8(convertToInt8Slice(temps))))
	var heartResults = myevent.CalculateMaxAveragePowers(timeIntervals, convertToUint16Slice(hearts))
	var elapsedTime = activity.Records[len(activity.Records)-1].Timestamp.Sub(activity.Records[0].Timestamp)

	// Simplify coordinates and get indices
	simplifiedCoordinates, indices := simplify.SimplifyWithIndices(coordinates, 0.00001, true)

	// Use indices to extract corresponding data
	simplifiedElevations := make([]float64, len(indices))
	simplifiedPowers := make([]uint16, len(indices))
	simplifiedHearts := make([]uint8, len(indices))
	simplifiedDistances := make([]float32, len(indices))

	for i, idx := range indices {
		simplifiedElevations[i] = elevations[idx]
		simplifiedPowers[i] = powers[idx]
		simplifiedHearts[i] = hearts[idx]
		simplifiedDistances[i] = distances[idx]
	}

	// Now you can create MergedData using the simplified data
	mergedData := make([]S3helper.MergedDataItem, len(indices))
	for i := range indices {
		var grade float64
		if i == 0 {
			grade = 0
		} else {
			elevationChange := simplifiedElevations[i] - simplifiedElevations[i-1]
			distanceChange := float64(simplifiedDistances[i] - simplifiedDistances[i-1])
			if distanceChange != 0 {
				grade = elevationChange / distanceChange
			}
		}

		mergedData[i] = S3helper.MergedDataItem{
			Power:     simplifiedPowers[i],
			Distance:  float64(simplifiedDistances[i]),
			Time:      float64(indices[i]),
			Elevation: float32(simplifiedElevations[i]),
			HeartRate: simplifiedHearts[i],
			Grade:     grade,
		}
	}

	// // Simplify the points (with a tolerance of 1)
	// var simplifiedCoordinates = simplify.SimplifyDouglasPeucker(coordinates, 0.00000001)

	// timeElevationMap := make([][]float64, len(elevations))
	// for i := range elevations {
	// 	timeElevationMap[i] = []float64{float64(distances[i]), float64(i)}
	// }
	// var simplifiedElevations = simplify.Simplify(timeElevationMap, 3, true)
	// // fmt.Println("Simplified Elevations len:", len(simplifiedElevations))

	// // Merge distance, powers, and grades into a new map
	// mergedData := make([]S3helper.MergedDataItem, len(simplifiedElevations))
	// for i, val := range simplifiedElevations {
	// 	var grade float64
	// 	var gradeFinal float64
	// 	if i == 0 {
	// 		grade = 0
	// 	} else {
	// 		var elevationChange = elevations[int(val[1])] - elevations[int(simplifiedElevations[i-1][1])]
	// 		var distanceChange = float64(distances[int(val[1])] - distances[int(simplifiedElevations[i-1][1])])
	// 		grade = elevationChange / distanceChange
	// 		if math.IsNaN(grade) || math.IsInf(grade, 0) {
	// 			gradeFinal = 0.0
	// 		} else {
	// 			gradeFinal = grade
	// 		}
	// 	}

	// 	mergedData[i] = S3helper.MergedDataItem{
	// 		Power:     powers[int(val[1])],
	// 		Distance:  val[0],
	// 		Time:      val[1],
	// 		Elevation: float32(elevations[int(val[1])]),
	// 		HeartRate: hearts[int(val[1])],
	// 		Grade:     gradeFinal,
	// 	}
	// }

	// Generate S3 key
	s3key := fmt.Sprintf("timeseries/%s.json", uuid.New().String())

	// Return the processed data
	return &ProcessedActivityData{
		SimplifiedCoordinates: simplifiedCoordinates,
		MergedData:            mergedData,
		S3Key:                 s3key,
		TempResults:           tempResults,
		CadenceResults:        cadenceResults,
		TotalDistance:         totalDistance,
		HeartResults:          heartResults,
		TotalElevationGain:    totalElevationGain,
		StoppedTime:           int(stoppedTime.Seconds()),
		ElapsedTime:           int(elapsedTime.Seconds()),
		NormalizedPower:       normalizedPower,
		PowerResults:          powerResults,
	}, nil
}
