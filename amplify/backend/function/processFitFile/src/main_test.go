package main

import (
	"context"
	"errors"
	"lambda/myevent"
	"testing"

	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/aws/aws-sdk-go/service/s3/s3iface"
)

// MockS3Client is a mock implementation of the S3API interface
type MockS3Client struct {
	s3iface.S3API
	HeadObjectFunc func(input *s3.HeadObjectInput) (*s3.HeadObjectOutput, error)
}

// HeadObject is a mock implementation of the HeadObject method
func (m *MockS3Client) HeadObject(input *s3.HeadObjectInput) (*s3.HeadObjectOutput, error) {
	if m.HeadObjectFunc != nil {
		return m.HeadObjectFunc(input)
	}
	return nil, errors.New("HeadObjectFunc is not implemented")
}

func TestHandleRequest(t *testing.T) {
	// Create a mock S3 client
	// mockS3Client := &MockS3Client{
	// 	HeadObjectFunc: func(input *s3.HeadObjectInput) (*s3.HeadObjectOutput, error) {
	// 		// Mock the response of the HeadObject method
	// 		return &s3.HeadObjectOutput{
	// 			Metadata: map[string]*string{
	// 				"postid": aws.String("123"),
	// 			},
	// 		}, nil
	// 	},
	// }

	// Create a test event
	event := myevent.Event{
		Records: []myevent.Record{
			{
				S3: myevent.S3{
					Object: myevent.Object{
						Key: "private/us-east-1:d0793677-36a8-4f9d-96aa-af199ce7dd0f/uploads/RCC_Tahuya.fit",
					},
					Bucket: myevent.Bucket{
						Name: "nextjsblog619f9308251149be95e1a59d89c85e5e233823-dev",
					},
				},
			},
		},
	}

	// Call the HandleRequest function with the mock S3 client and test event
	// response, err := HandleRequest(context.Background(), event, mockS3Client)
	response, err := HandleRequest(context.Background(), event)
	if err != nil {
		t.Fatalf("Expected no error, got %v", err)
	}

	expectedResponse := "Hello, private/us-east-1:d0793677-36a8-4f9d-96aa-af199ce7dd0f/uploads/RCC_Tahuya.fit!"
	if response != expectedResponse {
		t.Fatalf("Expected response %s, got %s", expectedResponse, response)
	}
}
