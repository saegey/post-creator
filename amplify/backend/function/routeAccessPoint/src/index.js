/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_ROUTEFILES_BUCKETNAME
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const { S3 } = require("aws-sdk");
const fetch = require("node-fetch");
const s3 = new S3({ region: process.env.AWS_REGION });

exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  // let response;
  // try {
  //   response = await fetch(event.getObjectContext.inputS3Url);
  // } catch (e) {
  //   console.log("failed to get s3 object: ", JSON.stringify(e));
  // }
  // console.log("response", response);

  // let fileContentInJson = await response.json();

  // // const filteredContent = { hello: "world" };

  // const filteredContent = { hello: "world", ...fileContentInJson };
  // console.log(filteredContent);

  // try {
  //   await s3
  //     .writeGetObjectResponse({
  //       RequestRoute: event.getObjectContext.outputRoute,
  //       RequestToken: event.getObjectContext.outputToken,
  //       Body: JSON.stringify(filteredContent),
  //     })
  //     .promise();
  // } catch (e) {
  //   console.log("failled to write object: ", JSON.stringify(e));
  // }

  return {
    statusCode: 200,
  };
};
