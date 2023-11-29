/*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["MUX_TOKEN_ID","MUX_TOKEN_SECRET"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/
/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	MUX_TOKEN_ID
	MUX_TOKEN_SECRET
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const aws = require("aws-sdk");

exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  const { Parameters } = await new aws.SSM()
    .getParameters({
      Names: ["MUX_TOKEN_ID", "MUX_TOKEN_SECRET"].map(
        (secretName) => process.env[secretName]
      ),
      WithDecryption: true,
    })
    .promise();
  console.log(JSON.stringify(process.env), Parameters);

  MUX_TOKEN_ID = Parameters[0].Value;
  MUX_TOKEN_SECRET = Parameters[1].Value;

  const { uploadId } = event.queryStringParameters;

  const baseUrl = "https://api.mux.com";
  const url = `${baseUrl}/video/v1/uploads/${uploadId}`;
  const endpoint = new URL(url);
  // headers.set(
  //   "Authorization",
  //   "Basic " + Buffer.from(username + ":" + password).toString("base64")
  // );

  let response, body;
  const requestToBeSigned = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Basic " +
        Buffer.from(MUX_TOKEN_ID + ":" + MUX_TOKEN_SECRET).toString("base64"),
    },
    hostname: endpoint.host,
    path: endpoint.pathname,
  };

  try {
    response = await fetch(endpoint, requestToBeSigned);
    body = await response.json();
  } catch (errorRes) {
    console.error(errorRes);
  }
  console.log(body);

  // curl https://api.mux.com/video/v1/assets/${ASSET_ID}/playback-ids \
  // -X POST \
  // -d '{ "policy": "public" }' \
  // -H "Content-Type: application/json" \
  // -u ${MUX_TOKEN_ID}:${MUX_TOKEN_SECRET}

  const playbackUrl = new URL(
    `${baseUrl}/video/v1/assets/${body.data.asset_id}/playback-ids/`
  );
  console.log(playbackUrl);

  const playbackRequestToBeSigned = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Basic " +
        Buffer.from(MUX_TOKEN_ID + ":" + MUX_TOKEN_SECRET).toString("base64"),
    },
    body: JSON.stringify({
      policy: "public",
    }),
    hostname: playbackUrl.host,
    path: playbackUrl.pathname,
  };

  let playbackRes, playbackBody;

  try {
    playbackRes = await fetch(playbackUrl, playbackRequestToBeSigned);
    playbackBody = await playbackRes.json();
    console.log(playbackBody);
  } catch (errorRes) {
    console.error(errorRes);
  }

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
    body: JSON.stringify({
      assetId: body.data.asset_id,
      playbackId: playbackBody.data.id,
    }),
  };
};
