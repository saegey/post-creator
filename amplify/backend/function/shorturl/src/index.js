import AWS from 'aws-sdk';

// const GRAPHQL_ENDPOINT = process.env.API_NEXTJSBLOG_GRAPHQLAPIENDPOINTOUTPUT;
const AWS_REGION = process.env.AWS_REGION || 'us-east-1';
AWS.config.update({ region: AWS_REGION });

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const docClient = new AWS.DynamoDB.DocumentClient();

function generateUID() {
  // I generate the UID from two parts here
  // to ensure the random number provide enough bits.
  var firstPart = (Math.random() * 46656) | 0;
  var secondPart = (Math.random() * 46656) | 0;
  firstPart = ('000' + firstPart.toString(36)).slice(-3);
  secondPart = ('000' + secondPart.toString(36)).slice(-3);
  return firstPart + secondPart;
}

const updateShortUrl = async ({ params }) => {
  const data = await docClient.update(params).promise();
  return data;
};

export const handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const body = JSON.parse(event.body);
  console.log(`PAYLOAD: ${JSON.stringify(body)}`);
  console.log(`user: ${event.requestContext.identity.cognitoIdentityId}`);

  const params = {
    TableName: 'url-short-LinkTable-1GWGF5F1ZD65K',
    Key: {
      id: generateUID(),
    },
    UpdateExpression: 'SET #url = :u, #owner = :o',
    ExpressionAttributeValues: {
      ':u': body.url,
      ':o': event.requestContext.identity.cognitoIdentityId,
    },
    ExpressionAttributeNames: {
      '#url': 'url',
      '#owner': 'owner',
    },
    ReturnValues: 'ALL_NEW'
  };
  const res = await updateShortUrl({ params });

  console.log(`RES: ${JSON.stringify(res)}`);

  return {
    statusCode: 201,
    //  Uncomment below to enable CORS requests
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
    body: JSON.stringify(res),
  };
};
