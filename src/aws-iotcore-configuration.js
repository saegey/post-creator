// src/aws-iotcore-configuration.js
var awsIotConfiguration = {
  endpoint: 'https://iot.us-east-1.amazonaws.com',
  region: 'us-east-1',
  apiVersion: '2015-05-28',
  policy:
    '{"Version": "2012-10-17", "Statement": [{"Effect": "Allow", "Action": [ "iot:Subscribe" ], "Resource": ["arn:aws:iot:us-east-1:123456789012:topicfilter/*"]},{"Effect": "Allow","Action": [ "iot:Connect" ],"Resource": ["arn:aws:iot:us-east-1:123456789012:client/*"] },{"Effect": "Allow","Action": [ "iot:Publish","iot:Receive" ],"Resource": ["arn:aws:iot:us-east-1:123456789012:topic/*"]}]}',
};
