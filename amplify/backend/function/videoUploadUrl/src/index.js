/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	MUX_TOKEN_ID
	MUX_TOKEN_SECRET
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

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
        Buffer.from(
          process.env.MUX_TOKEN_ID + ":" + process.env.MUX_TOKEN_SECRET
        ).toString("base64"),
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
