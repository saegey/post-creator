import { API, Amplify, Auth } from "aws-amplify";
import { AWSIoTProvider } from "@aws-amplify/pubsub";
import AWS from "aws-sdk";

import awsExports from "../aws-exports";

const configurePubSub = async (iotEndpoint: string) => {
  console.log(
    `Configuring Amplify PubSub, region = ${awsExports.aws_project_region}, endpoint = ${iotEndpoint}`
  );
  Amplify.addPluggable(
    new AWSIoTProvider({
      aws_pubsub_region: awsExports.aws_project_region,
      aws_pubsub_endpoint: iotEndpoint,
    })
  );
};

const getEndpoint = async () => {
  console.log("Getting IoT Endpoint...");
  const credentials = await Auth.currentCredentials();
  const iot = new AWS.Iot({
    region: awsExports.aws_project_region,
    credentials: Auth.essentialCredentials(credentials),
  });
  const response = await iot
    .describeEndpoint({ endpointType: "iot:Data-ATS" })
    .promise();
  const endpoint = `wss://${response.endpointAddress}/mqtt`;
  // setIotEndpoint(endpoint);
  console.log(`Your IoT Endpoint is:\n ${endpoint}`);
  return endpoint;
};

const attachIoTPolicyToUser = async () => {
  // This should be the custom cognito attribute that tells us whether the user's
  // federated identity already has the necessary IoT policy attached:
  const IOT_ATTRIBUTE_FLAG = "custom:iotPolicyIsAttached";

  // var userInfo = await Auth.currentUserInfo({ bypassCache: true });
  const userInfo = await Auth.currentUserInfo();
  const iotPolicyIsAttached =
    userInfo.attributes[IOT_ATTRIBUTE_FLAG] === "true";

  if (!iotPolicyIsAttached) {
    const apiName = "api12660653";
    const path = "/attachIoTPolicyToFederatedUser";
    const myInit = {
      response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
    };

    console.log(
      `Calling API GET ${path} to attach IoT policy to federated user...`
    );
    var response = await API.get(apiName, path, myInit);
    console.log(
      `GET ${path} ${response.status} response:\n ${JSON.stringify(
        response.data,
        null,
        2
      )}`
    );
    console.log(`Attached IoT Policy to federated user.`);
  } else {
    console.log(`Federated user ID already attached to IoT Policy.`);
  }
};

export { configurePubSub, getEndpoint, attachIoTPolicyToUser };
