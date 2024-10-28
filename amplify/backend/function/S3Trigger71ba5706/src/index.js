/* Amplify Params - DO NOT EDIT
	ENV
	FUNCTION_PROCESSFITFILE_NAME
	FUNCTION_PROCESSGPXFILE_NAME
	REGION
Amplify Params - DO NOT EDIT */"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const lambda = new aws_sdk_1.default.Lambda();
const invokeLambda = async (functionName, event) => {
    const params = {
        FunctionName: functionName,
        InvocationType: "Event",
        Payload: JSON.stringify(event),
    };
    await lambda.invoke(params).promise();
};
exports.handler = async function (event) {
    console.log("Event => " + JSON.stringify(event));
    if (event.Records[0].s3.object.key.includes("timeseries")) {
        return;
    }
    const env = process.env.ENV; // Amplify automatically sets this to the current environment
    const key = event.Records[0].s3.object.key;
    console.log(`processGpxFile-${env}`);
    if (key.endsWith(".gpx")) {
        await invokeLambda(`processGpxFile-${env}`, event);
    }
    else if (key.endsWith(".fit")) {
        await invokeLambda(`processFitFile-${env}`, event);
    }
    else {
        console.log("Unsupported file type");
    }
};
