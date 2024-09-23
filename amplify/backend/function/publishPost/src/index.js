/* Amplify Params - DO NOT EDIT
  API_NEXTJSBLOG_GRAPHQLAPIENDPOINTOUTPUT
  API_NEXTJSBLOG_GRAPHQLAPIIDOUTPUT
  API_NEXTJSBLOG_GRAPHQLAPIKEYOUTPUT
  ENV
  REGION
  STORAGE_ROUTEFILES_BUCKETNAME
Amplify Params - DO NOT EDIT */

// /**
//  * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
//  */

const AWS = require("aws-sdk");
const uuid = require("uuid");
const fetch = require("node-fetch");

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
      currentFtp
      components
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
      powerAnalysis
      tempAnalysis
      elapsedTime
      stoppedTime
      timeInRed
      powerZones
      powerZoneBuckets
      createdAt
      heroImage
      subhead

      raceResults
      webscorerResults
      crossResults
      omniResults
      runSignupResults

      raceResultsProvider
      privacyStatus
      updatedAt
      blogPostsId
      postRelatedId
      postAuthorId
      timeSeriesFile
      owner
      __typename
    }
  }
`;

exports.handler = async (event) => {
  const startTime = Date.now();
  console.log("Lambda function started at", new Date(startTime).toISOString());

  const crypto = require("@aws-crypto/sha256-js");
  const { defaultProvider } = require("@aws-sdk/credential-provider-node");
  const { SignatureV4 } = require("@aws-sdk/signature-v4");
  const { HttpRequest } = require("@aws-sdk/protocol-http");
  const { Sha256 } = crypto;

  const docClient = new AWS.DynamoDB.DocumentClient();
  const S3 = new AWS.S3();

  const AWS_REGION = process.env.AWS_REGION || "us-east-1";
  const GRAPHQL_ENDPOINT = process.env.API_NEXTJSBLOG_GRAPHQLAPIENDPOINTOUTPUT;
  const publishedPostTable = `PublishedPost-${process.env.API_NEXTJSBLOG_GRAPHQLAPIIDOUTPUT}-${process.env.ENV}`;
  const postTable = `Post-${process.env.API_NEXTJSBLOG_GRAPHQLAPIIDOUTPUT}-${process.env.ENV}`;

  const { body } = event;
  const { postId, origin } = JSON.parse(body);

  let date = new Date();
  console.log(
    "GraphQL Endpoint:",
    process.env.API_NEXTJSBLOG_GRAPHQLAPIENDPOINTOUTPUT
  );
  const endpoint = new URL(process.env.API_NEXTJSBLOG_GRAPHQLAPIENDPOINTOUTPUT);

  const creds = defaultProvider();
  const signer = new SignatureV4({
    credentials: creds,
    region: AWS_REGION,
    service: "appsync",
    sha256: Sha256,
  });

  const variables = {
    id: postId,
  };

  const requestToBeSigned = new HttpRequest({
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      host: endpoint.host,
    },
    hostname: endpoint.host,
    body: JSON.stringify({ query, variables }),
    path: endpoint.pathname,
  });

  // Start timing for GraphQL query
  let operationStartTime = Date.now();
  console.log(
    "Starting GraphQL query to get post data at",
    new Date(operationStartTime).toISOString()
  );

  const signed = await signer.sign(requestToBeSigned);

  let statusCode = 200;
  let resBody;
  let response;

  try {
    response = await fetch(
      process.env.API_NEXTJSBLOG_GRAPHQLAPIENDPOINTOUTPUT,
      signed
    );

    resBody = await response.json();
    if (resBody.errors) statusCode = 400;
  } catch (error) {
    const operationEndTime = Date.now();
    const duration = operationEndTime - operationStartTime;
    console.log(
      "GraphQL query failed at",
      new Date(operationEndTime).toISOString(),
      "Duration:",
      duration,
      "ms"
    );
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        errors: [
          {
            message: error.message,
          },
        ],
      }),
    };
  }

  let operationEndTime = Date.now();
  let duration = operationEndTime - operationStartTime;
  console.log(
    "Finished GraphQL query at",
    new Date(operationEndTime).toISOString(),
    "Duration:",
    duration,
    "ms"
  );

  // Now proceed to the next operation

  const identityId = event.requestContext.identity.cognitoAuthenticationProvider
    .split(":")
    .pop();

  // const getParams = {
  //   TableName: publishedPostTable,
  //   IndexName: "PublishedPostByOriginalPostId",
  //   KeyConditionExpression: "#originalPostId = :originalPostId",
  //   ExpressionAttributeNames: {
  //     "#originalPostId": "originalPostId",
  //   },
  //   ExpressionAttributeValues: {
  //     ":originalPostId": postId,
  //   },
  // };

  // Start timing for DynamoDB query
  // operationStartTime = Date.now();
  // console.log(
  //   "Starting DynamoDB query to check for existing published post at",
  //   new Date(operationStartTime).toISOString()
  // );

  // let existingId = undefined;

  // try {
  //   const res = await docClient.query(getParams).promise();
  //   if (res && res.Items && res.Items.length > 0) {
  //     existingId = res.Items[0].id;
  //   }
  // } catch (e) {
  //   console.error("Error querying DynamoDB:", e);
  // }

  // operationEndTime = Date.now();
  // duration = operationEndTime - operationStartTime;
  // console.log(
  //   "Finished DynamoDB query at",
  //   new Date(operationEndTime).toISOString(),
  //   "Duration:",
  //   duration,
  //   "ms"
  // );

  // const publishedPostId = existingId ? existingId : postId;

  // Start timing for S3 getObject
  operationStartTime = Date.now();
  console.log(
    "Starting S3 getObject to download private time series file at",
    new Date(operationStartTime).toISOString()
  );

  let privateTimeSeriesFile;
  try {
    privateTimeSeriesFile = await S3.getObject({
      Bucket: process.env.STORAGE_ROUTEFILES_BUCKETNAME,
      Key: `private/${event.requestContext.identity.cognitoIdentityId}/${resBody.data.getPost.timeSeriesFile}`,
    }).promise();
  } catch (e) {
    console.error("Error getting object from S3:", e);
  }

  operationEndTime = Date.now();
  duration = operationEndTime - operationStartTime;
  console.log(
    "Finished S3 getObject at",
    new Date(operationEndTime).toISOString(),
    "Duration:",
    duration,
    "ms"
  );

  const {
    coordinates,
    elevation,
    powers,
    distances,
    elevationGrades,
    powerAnalysis,
    hearts,
  } = JSON.parse(privateTimeSeriesFile.Body.toString("utf-8"));

  const s3key = `timeseries/${uuid.v1()}.json`;
  const s3Putparams = {
    Body: JSON.stringify({
      coordinates,
      elevation,
      powers,
      distances,
      elevationGrades,
      powerAnalysis,
      hearts,
    }),
    Bucket: process.env.STORAGE_ROUTEFILES_BUCKETNAME,
    Key: `public/${s3key}`,
  };

  // Start timing for S3 putObject
  operationStartTime = Date.now();
  console.log(
    "Starting S3 putObject to upload time series data at",
    new Date(operationStartTime).toISOString()
  );

  try {
    const s3res = await S3.putObject(s3Putparams).promise();
  } catch (e) {
    console.error("Error putting object to S3:", e);
  }

  operationEndTime = Date.now();
  duration = operationEndTime - operationStartTime;
  console.log(
    "Finished S3 putObject at",
    new Date(operationEndTime).toISOString(),
    "Duration:",
    duration,
    "ms"
  );

  // Now prepare to update DynamoDB

  const docParams = {
    TableName: publishedPostTable,
    Key: { id: postId },
    UpdateExpression:
      "SET #typename = :typename, #ownername = :owner, originalPostId = :originalPostId, title = :title, gpxFile = :gpxFile, images = :images, postLocation = :postLocation, currentFtp = :currentFtp, components = :components, distance = :distance, author = :author, elevationTotal = :elevationTotal, normalizedPower = :normalizedPower, heartAnalysis = :heartAnalysis, powerAnalysis = :powerAnalysis, cadenceAnalysis = :cadenceAnalysis, tempAnalysis = :tempAnalysis, elapsedTime = :elapsedTime, stoppedTime = :stoppedTime, timeInRed = :timeInRed, powerZones = :powerZones, powerZoneBuckets = :powerZoneBuckets, heroImage = :heroImage, subhead = :subhead, raceResults = :raceResults, webscorerResults = :webscorerResults, crossResults = :crossResults, omniResults = :omniResults, runSignupResults = :runSignupResults, raceResultsProvider = :raceResultsProvider, createdAt = if_not_exists(createdAt, :createdAt), updatedAt = :updatedAt, #typelabel = :type, #datelabel = :date, stravaUrl = :stravaUrl, timeSeriesFile = :timeSeriesFile",
    ExpressionAttributeNames: {
      "#typename": "__typename",
      "#ownername": "owner",
      "#typelabel": "type",
      "#datelabel": "date",
    },
    ExpressionAttributeValues: {
      ":typename": "PublishedPost",
      ":owner": `${identityId}::${identityId}`,
      ":originalPostId":
        resBody.data && resBody.data.getPost && resBody.data.getPost.id,
      ":title":
        resBody.data && resBody.data.getPost && resBody.data.getPost.title,
      ":gpxFile":
        resBody.data && resBody.data.getPost && resBody.data.getPost.gpxFile
          ? resBody.data.getPost.gpxFile
          : "",
      ":images":
        resBody.data && resBody.data.getPost && resBody.data.getPost.images
          ? JSON.parse(resBody.data.getPost.images)
          : "[]",
      ":postLocation":
        resBody.data &&
        resBody.data.getPost &&
        resBody.data.getPost.postLocation
          ? resBody.data.getPost.postLocation
          : "",
      ":createdAt": date.toISOString(),
      ":updatedAt": date.toISOString(),
      ":currentFtp":
        resBody.data && resBody.data.getPost && resBody.data.getPost.currentFtp
          ? resBody.data.getPost.currentFtp
          : 0,
      ":components":
        resBody.data && resBody.data.getPost && resBody.data.getPost.components
          ? JSON.parse(resBody.data.getPost.components)
          : "[]",
      ":author":
        resBody.data && resBody.data.getPost && resBody.data.getPost.author
          ? resBody.data.getPost.author
          : "{}",
      ":elevationTotal":
        resBody.data &&
        resBody.data.getPost &&
        resBody.data.getPost.elevationTotal
          ? resBody.data.getPost.elevationTotal
          : 0,
      ":normalizedPower":
        resBody.data &&
        resBody.data.getPost &&
        resBody.data.getPost.normalizedPower
          ? resBody.data.getPost.normalizedPower
          : 0,
      ":heartAnalysis":
        resBody.data &&
        resBody.data.getPost &&
        resBody.data.getPost.heartAnalysis
          ? JSON.parse(resBody.data.getPost.heartAnalysis)
          : "{}",
      ":powerAnalysis":
        resBody.data &&
        resBody.data.getPost &&
        resBody.data.getPost.powerAnalysis
          ? JSON.parse(resBody.data.getPost.powerAnalysis)
          : "{}",
      ":cadenceAnalysis":
        resBody.data &&
        resBody.data.getPost &&
        resBody.data.getPost.cadenceAnalysis
          ? JSON.parse(resBody.data.getPost.cadenceAnalysis)
          : "{}",
      ":tempAnalysis":
        resBody.data &&
        resBody.data.getPost &&
        resBody.data.getPost.tempAnalysis
          ? JSON.parse(resBody.data.getPost.tempAnalysis)
          : "{}",
      ":elapsedTime":
        resBody.data && resBody.data.getPost && resBody.data.getPost.elapsedTime
          ? resBody.data.getPost.elapsedTime
          : 0,
      ":stoppedTime":
        resBody.data && resBody.data.getPost && resBody.data.getPost.stoppedTime
          ? resBody.data.getPost.stoppedTime
          : 0,
      ":timeInRed":
        resBody.data && resBody.data.getPost && resBody.data.getPost.timeInRed
          ? resBody.data.getPost.timeInRed
          : 0,
      ":powerZones":
        resBody.data && resBody.data.getPost && resBody.data.getPost.powerZones
          ? JSON.parse(resBody.data.getPost.powerZones)
          : "{}",
      ":powerZoneBuckets":
        resBody.data &&
        resBody.data.getPost &&
        resBody.data.getPost.powerZoneBuckets
          ? JSON.parse(resBody.data.getPost.powerZoneBuckets)
          : "{}",
      ":heroImage":
        resBody.data && resBody.data.getPost && resBody.data.getPost.heroImage
          ? JSON.parse(resBody.data.getPost.heroImage)
          : "{}",
      ":subhead":
        resBody.data && resBody.data.getPost && resBody.data.getPost.subhead
          ? resBody.data.getPost.subhead
          : "",
      ":raceResults":
        resBody.data && resBody.data.getPost && resBody.data.getPost.raceResults
          ? JSON.parse(resBody.data.getPost.raceResults)
          : "{}",
      ":webscorerResults":
        resBody.data &&
        resBody.data.getPost &&
        resBody.data.getPost.webscorerResults
          ? JSON.parse(resBody.data.getPost.webscorerResults)
          : "{}",
      ":crossResults":
        resBody.data &&
        resBody.data.getPost &&
        resBody.data.getPost.crossResults
          ? JSON.parse(resBody.data.getPost.crossResults)
          : "{}",
      ":omniResults":
        resBody.data && resBody.data.getPost && resBody.data.getPost.omniResults
          ? JSON.parse(resBody.data.getPost.omniResults)
          : "{}",
      ":runSignupResults":
        resBody.data &&
        resBody.data.getPost &&
        resBody.data.getPost.runSignupResults
          ? JSON.parse(resBody.data.getPost.runSignupResults)
          : "{}",
      ":raceResultsProvider":
        resBody.data &&
        resBody.data.getPost &&
        resBody.data.getPost.raceResultsProvider
          ? resBody.data.getPost.raceResultsProvider
          : "",
      ":type": "PublishedPost",
      ":date":
        resBody.data && resBody.data.getPost && resBody.data.getPost.date
          ? resBody.data.getPost.date
          : "",
      ":stravaUrl":
        resBody.data && resBody.data.getPost && resBody.data.getPost.stravaUrl
          ? resBody.data.getPost.stravaUrl
          : "",
      ":timeSeriesFile": s3key,
      ":distance":
        resBody.data && resBody.data.getPost && resBody.data.getPost.distance
          ? resBody.data.getPost.distance
          : "",
    },
    ReturnValues: "ALL_NEW",
  };

  // Start timing for DynamoDB update
  operationStartTime = Date.now();
  console.log(
    "Starting DynamoDB update to create/update published post at",
    new Date(operationStartTime).toISOString()
  );

  let res;

  try {
    res = await docClient.update(docParams).promise();
  } catch (err) {
    console.log("Error updating DynamoDB", err);
  }

  operationEndTime = Date.now();
  duration = operationEndTime - operationStartTime;
  console.log(
    "Finished DynamoDB update at",
    new Date(operationEndTime).toISOString(),
    "Duration:",
    duration,
    "ms"
  );

  // Now update the original post

  const postUpdateParams = {
    Key: { id: postId },
    UpdateExpression: "SET privacyStatus = :privacyStatus",
    TableName: postTable,
    ExpressionAttributeValues: {
      ":privacyStatus": "published",
    },
    ReturnValues: "ALL_NEW",
  };

  // Start timing for DynamoDB update of original post
  operationStartTime = Date.now();
  console.log(
    "Starting DynamoDB update to set privacyStatus of original post at",
    new Date(operationStartTime).toISOString()
  );

  try {
    await docClient.update(postUpdateParams).promise();
  } catch (e) {
    console.error("Error updating original post in DynamoDB:", e);
  }

  operationEndTime = Date.now();
  duration = operationEndTime - operationStartTime;
  console.log(
    "Finished DynamoDB update of original post at",
    new Date(operationEndTime).toISOString(),
    "Duration:",
    duration,
    "ms"
  );

  const endTime = Date.now();
  const totalDuration = endTime - startTime;
  console.log(
    "Lambda function completed at",
    new Date(endTime).toISOString(),
    "Total Duration:",
    totalDuration,
    "ms"
  );

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
    body: JSON.stringify(res),
  };
};
