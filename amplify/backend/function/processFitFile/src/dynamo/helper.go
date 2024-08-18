package dynamo

import (
	"fmt"
	"os"
	"strconv"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
)

type DataAnalysis map[string]float64
type TempAnalysis map[string]uint16
type CadenceAnalysis map[string]uint16
type HeartAnalysis map[string]uint16
type PowerAnalysis map[string]uint16

func UpdateItem(postId string, tempAnalysis TempAnalysis, cadenceAnalysis CadenceAnalysis, distance float64, heartAnalysis HeartAnalysis, elevationGain float32, stoppedTime int, elapsedTime int, normalizedPower float32, zones []string, powerZoneBuckets []string, timeInRedSecs int, s3key string, powerAnalysis PowerAnalysis, gpxFile string) error {
	sess := session.Must(session.NewSessionWithOptions(session.Options{
		SharedConfigState: session.SharedConfigEnable,
	}))
	postTable := "Post-" + os.Getenv("API_NEXTJSBLOG_GRAPHQLAPIIDOUTPUT") + "-" + os.Getenv("ENV")
	fmt.Printf("Table: %s", postTable)

	tempMap := make(map[string]*dynamodb.AttributeValue)
	for k, v := range tempAnalysis {
		tempMap[k] = &dynamodb.AttributeValue{
			N: aws.String(strconv.Itoa(int(v))),
		}
	}

	cadenceMap := make(map[string]*dynamodb.AttributeValue)
	for k, v := range cadenceAnalysis {
		cadenceMap[k] = &dynamodb.AttributeValue{
			N: aws.String(strconv.Itoa(int(v))),
		}
	}

	heartMap := make(map[string]*dynamodb.AttributeValue)
	for k, v := range heartAnalysis {
		heartMap[k] = &dynamodb.AttributeValue{
			N: aws.String(strconv.Itoa(int(v))),
		}
	}

	powerMap := make(map[string]*dynamodb.AttributeValue)
	for k, v := range powerAnalysis {
		powerMap[k] = &dynamodb.AttributeValue{
			N: aws.String(strconv.Itoa(int(v))),
		}
	}

	svc := dynamodb.New(sess)

	// cadenceJson, err := json.Marshal(cadenceAnalysis)
	// if err != nil {
	// 	log.Fatalf("Failed to marshal JSON: %v", err)
	// }
	fmt.Printf("Temp Analysis: %v", tempAnalysis["entire"])

	input := &dynamodb.UpdateItemInput{
		TableName: aws.String(postTable),
		Key: map[string]*dynamodb.AttributeValue{
			"id": {
				S: aws.String(postId),
			},
		},
		UpdateExpression: aws.String("SET distance = :dis, heartAnalysis = :hr, elevationTotal = :el, stoppedTime = :st, elapsedTime = :et, normalizedPower = :np, cadenceAnalysis = :ca, tempAnalysis = :ta, powerZones = :pz, powerZoneBuckets = :pzb, timeInRed = :red, timeSeriesFile = :tsf, powerAnalysis = :pa, gpxFile = :gpx"),
		ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
			":ta": {
				M: tempMap,
			},
			":ca": {
				M: cadenceMap,
			},
			":dis": {
				N: aws.String(fmt.Sprintf("%f", distance)),
			},
			":hr": {
				M: heartMap,
			},
			":pa": {
				M: powerMap,
			},
			":el": {
				N: aws.String(fmt.Sprintf("%f", elevationGain)),
			},
			// ":et": {
			// 	M: map[string]*dynamodb.AttributeValue{
			// 		"seconds": {N: aws.String(fmt.Sprintf("%d", elapsedTime))},
			// 	},
			// },
			":st": {
				N: aws.String(fmt.Sprintf("%d", stoppedTime)),
			},
			":et": {
				N: aws.String(fmt.Sprintf("%d", elapsedTime)),
			},
			":np": {
				N: aws.String(fmt.Sprintf("%f", normalizedPower)),
			},
			":pz": {
				L: func() []*dynamodb.AttributeValue {
					if zones != nil {
						var attributeValues []*dynamodb.AttributeValue
						for _, zone := range zones {
							attributeValues = append(attributeValues, &dynamodb.AttributeValue{S: aws.String(zone)})
						}
						return attributeValues
					}
					return []*dynamodb.AttributeValue{}
				}(),
			},
			":pzb": {
				L: func() []*dynamodb.AttributeValue {
					if powerZoneBuckets != nil {
						var attributeValues []*dynamodb.AttributeValue
						for _, bucket := range powerZoneBuckets {
							attributeValues = append(attributeValues, &dynamodb.AttributeValue{S: aws.String(bucket)})
						}
						return attributeValues
					}
					return []*dynamodb.AttributeValue{}
				}(),
			},
			":red": {
				N: aws.String(fmt.Sprintf("%d", timeInRedSecs)),
			},
			":tsf": {
				S: aws.String(s3key),
			},
			":gpx": {
				S: aws.String(gpxFile),
			},
		},
	}

	result, err := svc.UpdateItem(input)

	if err != nil {
		fmt.Printf("Error: %v", err)
		return err
	} else {
		fmt.Printf("Result: %v", result)
	}

	return nil
}
