/*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["SENDGRID_API_KEY"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/
/* Amplify Params - DO NOT EDIT
	AUTH_NEXTJSBLOGA585E058_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const AWS = require("aws-sdk");
const sgClient = require("@sendgrid/client");

// Set SendGrid API Key

const cognito = new AWS.CognitoIdentityServiceProvider();

exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  const { Parameters } = await new AWS.SSM()
    .getParameters({
      Names: ["SENDGRID_API_KEY"].map((secretName) => process.env[secretName]),
      WithDecryption: true,
    })
    .promise();

  SENDGRID_API_KEY = Parameters[0].Value;

  try {
    sgClient.setApiKey(SENDGRID_API_KEY);
    const params = {
      UserPoolId: process.env["AUTH_NEXTJSBLOGA585E058_USERPOOLID"],
    };
    const users = await cognito.listUsers(params).promise();

    // Extract emails from Cognito users
    const emailList = users.Users.map((user) => {
      const emailAttr = user.Attributes.find((attr) => attr.Name === "email");
      return emailAttr ? emailAttr.Value : null;
    }).filter((email) => email); // Filter out null emails

    // Prepare users for SendGrid's contact list
    const contacts = emailList.map((email) => ({
      email: email,
      custom_fields: {
        e1_T: process.env["ENV"],
      },
    }));

    console.log(JSON.stringify(contacts));

    const request = {
      method: "PUT",
      url: "/v3/marketing/contacts",
      body: {
        list_ids: [process.env["SENDGRID_LIST_ID"]],
        contacts: contacts,
      },
    };

    await sgClient.request(request);

    console.log("Successfully synced Cognito users with SendGrid.");
  } catch (error) {
    console.error(
      "Error syncing Cognito users to SendGrid:",
      error.response.body.errors
    );
  }
};
