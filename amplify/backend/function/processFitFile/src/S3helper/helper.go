package S3helper

import (
	"bytes"
	"encoding/json"
	"fmt"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
)

type UploadParams struct {
	Powers []float64
	Bucket string
	PostID string
}

func UploadToS3(coordinates [][]float32, elevation []float32, powers []uint16, distances []float32, elevationGrades []float64, powerAnalysis map[string]uint16, hearts []uint8, bucket string, identityID string, s3key string) error {
	fmt.Println("Uploading object to S3")
	sess, err := session.NewSession(&aws.Config{
		Region: aws.String("us-east-1"),
	})

	if err != nil {
		return fmt.Errorf("failed to create AWS session: %v", err)
	}

	svc := s3.New(sess)

	// s3key := fmt.Sprintf("timeseries/%s.json", uuid.New().String())
	fmt.Println("S3 key: ", s3key)

	data := map[string]interface{}{
		"coordinates":     coordinates,
		"elevation":       elevation,
		"powers":          powers,
		"distances":       distances,
		"elevationGrades": elevationGrades,
		"powerAnalysis":   powerAnalysis,
		"hearts":          hearts,
	}

	jsonData, err := json.Marshal(data)
	if err != nil {
		return fmt.Errorf("failed to marshal data to JSON: %v", err)
	}
	var s3filename = fmt.Sprintf("private/%s/%s", identityID, s3key)
	fmt.Println("S3 filename: ", s3filename)
	// fmt.Println("JSON data: ", string(jsonData))
	fmt.Println("Bucket: ", bucket)

	res, err := svc.PutObject(&s3.PutObjectInput{
		Body:   aws.ReadSeekCloser(bytes.NewReader(jsonData)),
		Bucket: aws.String(bucket),
		Key:    aws.String(s3filename),
	})

	if err != nil {
		fmt.Println("failed to upload object to S3: %v", err)
	} else {
		fmt.Println("Response: ", res)
		fmt.Println("Object uploaded successfully")
	}

	return nil
}
