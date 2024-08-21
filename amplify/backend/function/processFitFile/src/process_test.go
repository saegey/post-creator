package main

import (
	"lambda/S3helper"
	"lambda/dynamo"
	"lambda/fitHelper"
	"os"
	"testing"

	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

func TestProcessActivityRecords(t *testing.T) {
	// Add your test cases here
	t.Run("Test1", func(t *testing.T) {

		data, _ := os.ReadFile("fixtures/Morning_Ride-8.fit")

		fit, _ := fitHelper.DecodeFITFile(data)
		activity, _ := fitHelper.GetFITFileActivity(fit)

		var metaData = S3helper.MetaData{Key: "123", PostId: "123", Bucket: "123"}

		// mockSvc := new(dynamo.MockDynamoDBAPI)

		mockSvc := new(dynamo.MockDynamoDBAPI)

		mockOutput := &dynamodb.UpdateItemOutput{}
		mockSvc.On("UpdateItem", mock.Anything).Return(mockOutput, nil)

		opts := ProcessActivityOptions{
			Activity:    activity,
			Svc:         mockSvc,
			PostId:      &metaData.PostId,
			Bucket:      metaData.Bucket,
			IdentityId:  "420identity",
			GpxFileName: "123",
		}

		ProcessActivityRecords(opts)
		// Assert
		args := mockSvc.Calls[0].Arguments.Get(0).(*dynamodb.UpdateItemInput)
		assert.Equal(t, metaData.PostId, *args.Key["id"].S)
	})
	t.Run("Test2", func(t *testing.T) {
		// Add your test cases here
	})
}
