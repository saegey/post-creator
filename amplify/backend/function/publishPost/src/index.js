/* Amplify Params - DO NOT EDIT
	API_NEXTJSBLOG_GRAPHQLAPIENDPOINTOUTPUT
	API_NEXTJSBLOG_GRAPHQLAPIIDOUTPUT
	API_NEXTJSBLOG_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

// /**
//  * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
//  */

const aws = require('aws-sdk');
const uuid = require('uuid');
const zlib = require('zlib');
const crypto = require('@aws-crypto/sha256-js');
const { defaultProvider } = require('@aws-sdk/credential-provider-node');
const { SignatureV4 } = require('@aws-sdk/signature-v4');
const { HttpRequest } = require('@aws-sdk/protocol-http');
const { Sha256 } = crypto;

const AWS_REGION = process.env.AWS_REGION || 'us-east-1';
// AWS.config.update({ region: AWS_REGION });
const ddb = new aws.DynamoDB();

const GRAPHQL_ENDPOINT = process.env.API_NEXTJSBLOG_GRAPHQLAPIENDPOINTOUTPUT;

const postTable = `PublishedPost-${process.env.API_NEXTJSBLOG_GRAPHQLAPIIDOUTPUT}-${process.env.ENV}`;

const query = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      type
      id
      title
      gpxFile
      images
      headerImage
      date
      publishedDate
      location
      postLocation
      stravaUrl
      resultsUrl
      subType
      teaser
      currentFtp
      components
      powerAnalysis
      coordinates
      powers
      elevation
      elevationGrades
      distances
      author {
        id
        fullName
        email
        image
        username
        createdAt
        updatedAt
        owner
        __typename
      }
      elevationTotal
      normalizedPower
      distance
      heartAnalysis
      cadenceAnalysis
      tempAnalysis
      elapsedTime
      stoppedTime
      timeInRed
      powerZones
      powerZoneBuckets
      createdAt
      heroImage
      subhead
      shortUrl
      raceResults
      raceResultsProvider
      privacyStatus
      updatedAt
      blogPostsId
      postRelatedId
      postAuthorId
      owner
      __typename
    }
  }
`;

const uncompress = async (input) => {
  return new Promise((resolve, reject) => {
    return zlib.gunzip(Buffer.from(input, 'base64'), (err, buffer) => {
      if (!err) {
        const widgetString = buffer.toString('utf-8');
        resolve(widgetString);
      } else {
        reject(err);
      }
    });
  });
};

exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const { body } = event;
  const { postId } = JSON.parse(body);

  console.log(`postId: ${postId}`);

  let date = new Date();

  const endpoint = new URL(GRAPHQL_ENDPOINT);

  const signer = new SignatureV4({
    credentials: defaultProvider(),
    region: AWS_REGION,
    service: 'appsync',
    sha256: Sha256,
  });

  const variables = {
    id: postId,
  };

  const requestToBeSigned = new HttpRequest({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      host: endpoint.host,
    },
    hostname: endpoint.host,
    body: JSON.stringify({ query, variables }),
    path: endpoint.pathname,
  });

  const signed = await signer.sign(requestToBeSigned);
  const request = new Request(GRAPHQL_ENDPOINT, signed);

  let statusCode = 200;
  let resBody;
  let response;

  try {
    response = await fetch(request);
    resBody = await response.json();
    console.log('resBody', resBody);
    if (resBody.errors) statusCode = 400;
  } catch (error) {
    statusCode = 500;
    body = {
      errors: [
        {
          message: error.message,
        },
      ],
    };
  }

  const identityId =
    event.requestContext.identity.cognitoIdentityId.split(':')[1];

  let params = {
    Item: {
      id: { S: uuid.v1() },
      __typename: { S: 'PublishedPost' },
      owner: {
        S: `${identityId}::${identityId}`,
      },
      title: { S: resBody.data.getPost.title },
      images: {
        S: resBody.data.getPost.images ? resBody.data.getPost.images : '[]',
      },
      publishedDate: {
        S: resBody.data.getPost.publishedDate
          ? resBody.data.getPost.publishedDate
          : '',
      },
      postLocation: {
        S: resBody.data.getPost.postLocation
          ? resBody.data.getPost.postLocation
          : '',
      },
      teaser: {
        S: resBody.data.getPost.teaser ? resBody.data.getPost.teaser : '',
      },
      currentFtp: {
        S: resBody.data.getPost.currentFtp
          ? resBody.data.getPost.currentFtp
          : '0',
      },
      components: {
        S: resBody.data.getPost.components
          ? resBody.data.getPost.components
          : '[]',
      },
      powerAnalysis: {
        S: resBody.data.getPost.powerAnalysis
          ? resBody.data.getPost.powerAnalysis
          : '',
      },
      createdAt: { S: date.toISOString() },
      updatedAt: { S: date.toISOString() },
    },
    TableName: postTable,
  };
  console.log(params);

  try {
    await ddb.putItem(params).promise();
    console.log('Success');
  } catch (err) {
    console.log('Error', err);
  }

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
    body: JSON.stringify('Hello from Lambda!'),
  };
};
