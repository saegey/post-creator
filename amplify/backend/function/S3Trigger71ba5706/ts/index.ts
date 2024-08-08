import AWS from "aws-sdk";
const lambda = new AWS.Lambda();

interface TriggerEvent {
  Records: Array<{
    eventVersion: string;
    eventName: string;
    s3: {
      bucket: {
        name: string;
      };
      object: { key: string; size: number; etag: string };
    };
  }>;
}

const invokeLambda = async (functionName: string, event: TriggerEvent) => {
  const params = {
    FunctionName: functionName,
    InvocationType: "Event", // Async invocation
    Payload: JSON.stringify(event),
  };
  await lambda.invoke(params).promise();
};

exports.handler = async function (event: TriggerEvent) {
  console.log("Event => " + JSON.stringify(event));
  if (event.Records[0].s3.object.key.includes("timeseries")) {
    return;
  }
  const env = process.env.ENV; // Amplify automatically sets this to the current environment

  const key = event.Records[0].s3.object.key;
  console.log(`processGpxFile-${env}`);

  if (key.endsWith(".gpx")) {
    await invokeLambda(`processGpxFile-${env}`, event);
  } else if (key.endsWith(".fit")) {
    await invokeLambda("processFitFile", event);
  } else {
    console.log("Unsupported file type");
  }
};
