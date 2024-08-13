package S3helper

import (
	"bytes"
	"encoding/json"
	"fmt"
	"lambda/myevent"
	"log"
	"net/url"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
)

type UploadParams struct {
	Powers []float64
	Bucket string
	PostID string
}

func UploadToS3(coordinates [][]float64, elevation []interface{}, bucket string, identityID string, s3key string) error {
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
		"coordinates": coordinates,
		"elevation":   elevation,
		// "powers":          powers,
		// "distances":       distances,
		// "elevationGrades": elevationGrades,
		// "times":           times,
		// "powerAnalysis":   powerAnalysis,
		// "hearts": hearts,
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
	fmt.Println("Response: ", res)

	if err != nil {
		fmt.Printf("failed to upload object to S3: %v\n", err)
	} else {
		fmt.Println("Response: ", res)
		fmt.Println("Object uploaded successfully")
	}

	return nil
}

type MetaData struct {
	Key        string
	Bucket     string
	PostId     string
	IdentityId string
}

func ExtractMetaData(record myevent.Record, svc *s3.S3) (MetaData, error) {
	sanitizedKey, err := url.QueryUnescape(record.S3.Object.Key)
	if err != nil {
		return MetaData{}, fmt.Errorf("error unescaping string: %v", err)
	}

	var bucket = record.S3.Bucket.Name
	log.Printf("Processing S3 object from bucket %s with key %s", bucket, sanitizedKey)

	// Get the metadata of the S3 object
	metaData, err := myevent.GetObjectMetadata(svc, bucket, sanitizedKey)
	if err != nil {
		return MetaData{}, fmt.Errorf("failed to get metadata: %v", err)
	}
	var postId = metaData.Metadata["Postid"]
	if postId == nil {
		return MetaData{}, fmt.Errorf("missing post id: %v", err)
	}

	var identityId = metaData.Metadata["Identityid"]
	if identityId == nil {
		return MetaData{}, fmt.Errorf("missing identity id: %v", err)
	}
	return MetaData{Bucket: bucket, PostId: *postId, IdentityId: *identityId, Key: sanitizedKey}, nil
}
