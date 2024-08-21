package dynamo

import (
	"fmt"
	"os"
	"strconv"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/dynamodb"
)

type DataAnalysis map[string]float64
type TempAnalysis map[string]uint16
type CadenceAnalysis map[string]uint16
type HeartAnalysis map[string]uint16
type PowerAnalysis map[string]uint16

type DynamoDBAPI interface {
	UpdateItem(input *dynamodb.UpdateItemInput) (*dynamodb.UpdateItemOutput, error)
}

type UpdateItemInput struct {
	PostID           string
	TempAnalysis     TempAnalysis
	CadenceAnalysis  CadenceAnalysis
	Distance         float64
	HeartAnalysis    HeartAnalysis
	ElevationGain    float32
	StoppedTime      int
	ElapsedTime      int
	NormalizedPower  float32
	Zones            []string
	PowerZoneBuckets []string
	TimeInRedSecs    int
	S3Key            string
	PowerAnalysis    PowerAnalysis
	GPXFile          string
}

func uint16MapToDynamoDBMap(input map[string]uint16) map[string]*dynamodb.AttributeValue {
	result := make(map[string]*dynamodb.AttributeValue)
	for k, v := range input {
		result[k] = &dynamodb.AttributeValue{
			N: aws.String(strconv.Itoa(int(v))),
		}
	}
	return result
}

func UpdateItem(svc DynamoDBAPI, input UpdateItemInput) error {
	postTable := "Post-" + os.Getenv("API_NEXTJSBLOG_GRAPHQLAPIIDOUTPUT") + "-" + os.Getenv("ENV")
	fmt.Printf("Table: %s", postTable)

	tempMap := uint16MapToDynamoDBMap(input.TempAnalysis)
	cadenceMap := uint16MapToDynamoDBMap(input.CadenceAnalysis)
	heartMap := uint16MapToDynamoDBMap(input.HeartAnalysis)
	powerMap := uint16MapToDynamoDBMap(input.PowerAnalysis)

	updateItemInput := &dynamodb.UpdateItemInput{
		TableName: aws.String(postTable),
		Key: map[string]*dynamodb.AttributeValue{
			"id": {
				S: aws.String(input.PostID),
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
				N: aws.String(fmt.Sprintf("%f", input.Distance)),
			},
			":hr": {
				M: heartMap,
			},
			":pa": {
				M: powerMap,
			},
			":el": {
				N: aws.String(fmt.Sprintf("%f", input.ElevationGain)),
			},
			":st": {
				N: aws.String(fmt.Sprintf("%d", input.StoppedTime)),
			},
			":et": {
				N: aws.String(fmt.Sprintf("%d", input.ElapsedTime)),
			},
			":np": {
				N: aws.String(fmt.Sprintf("%f", input.NormalizedPower)),
			},
			":pz": {
				L: func() []*dynamodb.AttributeValue {
					if input.Zones != nil {
						var attributeValues []*dynamodb.AttributeValue
						for _, zone := range input.Zones {
							attributeValues = append(attributeValues, &dynamodb.AttributeValue{S: aws.String(zone)})
						}
						return attributeValues
					}
					return []*dynamodb.AttributeValue{}
				}(),
			},
			":pzb": {
				L: func() []*dynamodb.AttributeValue {
					if input.PowerZoneBuckets != nil {
						var attributeValues []*dynamodb.AttributeValue
						for _, bucket := range input.PowerZoneBuckets {
							attributeValues = append(attributeValues, &dynamodb.AttributeValue{S: aws.String(bucket)})
						}
						return attributeValues
					}
					return []*dynamodb.AttributeValue{}
				}(),
			},
			":red": {
				N: aws.String(fmt.Sprintf("%d", input.TimeInRedSecs)),
			},
			":tsf": {
				S: aws.String(input.S3Key),
			},
			":gpx": {
				S: aws.String(input.GPXFile),
			},
		},
	}

	result, err := svc.UpdateItem(updateItemInput)

	if err != nil {
		fmt.Printf("Error: %v", err)
		return err
	} else {
		fmt.Printf("Result: %v", result)
	}

	return nil
}
