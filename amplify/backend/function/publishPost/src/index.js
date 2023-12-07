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
const zlib = require("zlib");
const crypto = require("@aws-crypto/sha256-js");
const { defaultProvider } = require("@aws-sdk/credential-provider-node");
const { SignatureV4 } = require("@aws-sdk/signature-v4");
const { HttpRequest } = require("@aws-sdk/protocol-http");
const { Sha256 } = crypto;
const fetch = require("node-fetch");

const docClient = new AWS.DynamoDB.DocumentClient();
const S3 = new AWS.S3();

const AWS_REGION = process.env.AWS_REGION || "us-east-1";
const GRAPHQL_ENDPOINT = process.env.API_NEXTJSBLOG_GRAPHQLAPIENDPOINTOUTPUT;
const publishedPostTable = `PublishedPost-${process.env.API_NEXTJSBLOG_GRAPHQLAPIIDOUTPUT}-${process.env.ENV}`;
const postTable = `Post-${process.env.API_NEXTJSBLOG_GRAPHQLAPIIDOUTPUT}-${process.env.ENV}`;

const generateUID = () => {
  // I generate the UID from two parts here
  // to ensure the random number provide enough bits.
  var firstPart = (Math.random() * 46656) | 0;
  var secondPart = (Math.random() * 46656) | 0;
  firstPart = ("000" + firstPart.toString(36)).slice(-3);
  secondPart = ("000" + secondPart.toString(36)).slice(-3);
  return firstPart + secondPart;
};

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
      # powerAnalysis
      # coordinates
      # powers
      # elevation
      # elevationGrades
      # distances
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
      timeSeriesFile
      owner
      __typename
    }
  }
`;

exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  const { body } = event;
  const { postId, origin } = JSON.parse(body);

  console.log(
    `postId: ${postId}, identityId: ${JSON.stringify(
      event.requestContext.identity.cognitoIdentityId
    )}`
  );

  let date = new Date();
  console.log(process.env.API_NEXTJSBLOG_GRAPHQLAPIENDPOINTOUTPUT);
  const endpoint = new URL(process.env.API_NEXTJSBLOG_GRAPHQLAPIENDPOINTOUTPUT);

  const signer = new SignatureV4({
    credentials: defaultProvider(),
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

  const signed = await signer.sign(requestToBeSigned);
  const request = new Request(
    process.env.API_NEXTJSBLOG_GRAPHQLAPIENDPOINTOUTPUT,
    signed
  );

  let statusCode = 200;
  let resBody;
  let response;

  try {
    response = await fetch(request);
    // console.log("response", response);
    resBody = await response.json();
    // console.log("resBody", resBody);
    if (resBody.errors) statusCode = 400;
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        errors: [
          {
            message: error.message,
          },
        ],
      })
    }
  }

  // const identityId =
  // 	event.requestContext.identity.cognitoIdentityId.split(':')[1];

  const identityId = event.requestContext.identity.cognitoAuthenticationProvider
    .split(":")
    .pop();

  // console.log(JSON.stringify(event.requestContext.identity));
  const getParams = {
    TableName: publishedPostTable,
    IndexName: "PublishedPostByOriginalPostId",
    KeyConditionExpression: "#originalPostId = :originalPostId",
    ExpressionAttributeNames: {
      "#originalPostId": "originalPostId",
    },
    ExpressionAttributeValues: {
      ":originalPostId": postId,
    },
    // ProjectionExpression: 'ATTRIBUTE_NAME',
  };

  // Call DynamoDB to read the item from the table

  let existingId = undefined;
  let shortUrl = undefined;

  try {
    await docClient
      .query(getParams, function (err, data) {
        if (err) {
          console.log("Error", err);
        } else {
          if (data.Items && data.Items.length > 0) {
            existingId = data.Items[0].id;
            shortUrl = data.Items[0].shortUrl;
          }
          console.log("Success", data, existingId);
        }
      })
      .promise();
  } catch (e) {
    console.error(JSON.stringify(e));
  }

  const publishedPostId = existingId ? existingId : uuid.v1();

  if (!existingId) {
    let resShort;
    try {
      const shortUrlParams = {
        TableName: "url-short-LinkTable-1GWGF5F1ZD65K",
        Key: {
          id: generateUID(),
        },
        UpdateExpression: "SET #url = :u, #owner = :o",
        ExpressionAttributeValues: {
          ":u": `${origin}j/${publishedPostId}`,
          ":o": `${identityId}::${identityId}`,
        },
        ExpressionAttributeNames: {
          "#url": "url",
          "#owner": "owner",
        },
        ReturnValues: "ALL_NEW",
      };

      resShort = await docClient.update(shortUrlParams).promise();
    } catch (e) {
      console.error(e);
    }

    console.log("shorturlres", resShort);
    shortUrl = resShort.Attributes.id;
    // shortUrl = 't';
  }

  console.log(resBody);
  const privateTimeSeriesFile = await S3.getObject({
    Bucket: process.env.STORAGE_ROUTEFILES_BUCKETNAME,
    Key: `private/${event.requestContext.identity.cognitoIdentityId}/${resBody.data.getPost.timeSeriesFile}`,
  }).promise();

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
    // ACL: 'public-read',
  };

  try {
    const s3res = await S3.putObject(s3Putparams).promise();
    console.log(s3res);
  } catch (e) {
    console.error(JSON.stringify(e));
  }

  const docParams = {
    TableName: publishedPostTable,
    Key: { id: publishedPostId },
    UpdateExpression:
      "SET #typename = :typename, #ownername = :owner, originalPostId = :originalPostId, title = :title, gpxFile = :gpxFile, images = :images, postLocation = :postLocation, currentFtp = :currentFtp, components = :components, distance = :distance, author = :author, elevationTotal = :elevationTotal, normalizedPower = :normalizedPower, heartAnalysis = :heartAnalysis, cadenceAnalysis = :cadenceAnalysis, tempAnalysis = :tempAnalysis, elapsedTime = :elapsedTime, stoppedTime = :stoppedTime, timeInRed = :timeInRed, powerZones = :powerZones, powerZoneBuckets = :powerZoneBuckets, heroImage = :heroImage, subhead = :subhead, raceResults = :raceResults, raceResultsProvider = :raceResultsProvider, shortUrl = if_not_exists(shortUrl, :shortUrl), createdAt = if_not_exists(createdAt, :createdAt), updatedAt = :updatedAt, #typelabel = :type, #datelabel = :date, stravaUrl = :stravaUrl, timeSeriesFile = :timeSeriesFile",
    ExpressionAttributeNames: {
      // '#id': 'id',
      "#typename": "__typename",
      "#ownername": "owner",
      "#typelabel": "type",
      "#datelabel": "date",
    },
    ExpressionAttributeValues: {
      ":typename": "PublishedPost",
      ":owner": `${identityId}::${identityId}`,
      ":originalPostId": resBody.data.getPost.id,
      ":title": resBody.data.getPost.title,
      ":gpxFile": resBody.data.getPost.gpxFile
        ? resBody.data.getPost.gpxFile
        : "",
      ":images": resBody.data.getPost.images
        ? JSON.parse(resBody.data.getPost.images)
        : "[]",
      ":postLocation": resBody.data.getPost.postLocation
        ? resBody.data.getPost.postLocation
        : "",
      ":createdAt": date.toISOString(),
      ":updatedAt": date.toISOString(),
      ":currentFtp": resBody.data.getPost.currentFtp
        ? resBody.data.getPost.currentFtp
        : 0,
      ":components": resBody.data.getPost.components
        ? JSON.parse(resBody.data.getPost.components)
        : "[]",
      ":author": resBody.data.getPost.author
        ? resBody.data.getPost.author
        : "{}",
      ":elevationTotal": resBody.data.getPost.elevationTotal
        ? resBody.data.getPost.elevationTotal
        : 0,
      ":normalizedPower": resBody.data.getPost.normalizedPower
        ? resBody.data.getPost.normalizedPower
        : 0,
      ":heartAnalysis": resBody.data.getPost.heartAnalysis
        ? JSON.parse(resBody.data.getPost.heartAnalysis)
        : "{}",
      ":cadenceAnalysis": resBody.data.getPost.cadenceAnalysis
        ? JSON.parse(resBody.data.getPost.cadenceAnalysis)
        : "{}",
      ":tempAnalysis": resBody.data.getPost.tempAnalysis
        ? JSON.parse(resBody.data.getPost.tempAnalysis)
        : "{}",
      ":elapsedTime": resBody.data.getPost.elapsedTime
        ? resBody.data.getPost.elapsedTime
        : 0,
      ":stoppedTime": resBody.data.getPost.stoppedTime
        ? resBody.data.getPost.stoppedTime
        : 0,
      ":timeInRed": resBody.data.getPost.timeInRed
        ? resBody.data.getPost.timeInRed
        : 0,
      ":powerZones": resBody.data.getPost.powerZones
        ? JSON.parse(resBody.data.getPost.powerZones)
        : "{}",
      ":powerZoneBuckets": resBody.data.getPost.powerZoneBuckets
        ? JSON.parse(resBody.data.getPost.powerZoneBuckets)
        : "{}",
      ":heroImage": resBody.data.getPost.heroImage
        ? JSON.parse(resBody.data.getPost.heroImage)
        : "{}",
      ":subhead": resBody.data.getPost.subhead
        ? resBody.data.getPost.subhead
        : "",
      ":raceResults": resBody.data.getPost.raceResults
        ? JSON.parse(resBody.data.getPost.raceResults)
        : "{}",
      ":raceResultsProvider": resBody.data.getPost.raceResults
        ? resBody.data.getPost.raceResultsProvider
        : "",
      ":shortUrl": shortUrl ? shortUrl : "",
      ":type": "PublishedPost",
      ":date": resBody.data.getPost.date ? resBody.data.getPost.date : "",
      ":stravaUrl": resBody.data.getPost.stravaUrl
        ? resBody.data.getPost.stravaUrl
        : "",
      ":timeSeriesFile": s3key,
      ":distance": resBody.data.getPost.distance
        ? resBody.data.getPost.distance
        : "",
    },
    ReturnValues: "ALL_NEW",
  };
  console.log(docParams);

  let res;

  try {
    res = await docClient.update(docParams).promise();
    console.log(res);
  } catch (err) {
    console.log("Error", err);
    // console.log(JSON.stringify(err.__type));
  }

  const postUpdateParams = {
    Key: { id: postId },
    UpdateExpression: "SET privacyStatus = :privacyStatus",
    TableName: postTable,
    // IndexName: 'PublishedPostByOriginalPostId',
    // KeyConditionExpression: '#originalPostId = :originalPostId',
    ExpressionAttributeValues: {
      ":privacyStatus": "published",
    },
    ReturnValues: "ALL_NEW",
  };
  console.log(postUpdateParams);

  try {
    await docClient
      .update(postUpdateParams, function (err, data) {
        if (err) {
          console.log("Error", err);
        } else {
          console.log("Success", data);
        }
      })
      .promise();
  } catch (e) {
    console.error(e);
  }

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
    body: JSON.stringify(res),
  };
};
