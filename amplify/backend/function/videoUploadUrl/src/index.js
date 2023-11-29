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
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const aws = require("aws-sdk");

exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  let result;
  try {
    result = await new aws.SSM()
      .getParameters({
        Names: ["MUX_TOKEN_ID", "MUX_TOKEN_SECRET"].map(
          (secretName) => process.env[secretName]
        ),
        WithDecryption: true,
      })
      .promise();
  } catch (e) {
    console.log("error", JSON.stringify(e));
  }

  console.log(JSON.stringify(process.env), result);

  TOKEN_ID = result.Parameters[0].Value;
  TOKEN_SECRET = result.Parameters[1].Value;

  const baseUrl = "https://api.mux.com";
  const url = `${baseUrl}/video/v1/uploads`;
  const endpoint = new URL(url);
  // headers.set(
  //   "Authorization",
  //   "Basic " + Buffer.from(username + ":" + password).toString("base64")
  // );
  let response, body;
  const requestToBeSigned = {
    method: "POST",
    headers: {
      "User-Agent": `Mux Direct Upload Button`,
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization:
        "Basic " +
        Buffer.from(TOKEN_ID + ":" + TOKEN_SECRET).toString("base64"),
    },
    hostname: endpoint.host,
    path: endpoint.pathname,
    body: JSON.stringify({
      cors_origin: "*",
      new_asset_settings: {
        playback_policy: ["public"],
      },
    }),
  };

  try {
    response = await fetch(endpoint, requestToBeSigned);
    body = await response.json();
  } catch (errorRes) {
    console.error(errorRes);
  }

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
    body: JSON.stringify(body.data),
  };
};
