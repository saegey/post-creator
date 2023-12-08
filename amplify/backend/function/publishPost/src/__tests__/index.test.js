const AWS = require("aws-sdk-mock");
const { defaultProvider } = require("@aws-sdk/credential-provider-node");
const { SignatureV4 } = require("@aws-sdk/signature-v4");

const { handler } = require("../index");
const event = require("../event.json");

const fetch = require("node-fetch");
// const AWS = require("aws-sdk");

jest.mock("node-fetch", () => jest.fn());

jest.mock("@aws-sdk/credential-provider-node", () => {
  return {
    defaultProvider: jest.fn().mockReturnValue("blah blah"),
  };
});

jest.mock("@aws-sdk/signature-v4");

AWS.mock("DynamoDB.DocumentClient", "query", function (params, callback) {
  callback(null, {
    data: {
      Items: [{ id: 1234, shortUrl: "abcde" }],
    },
  });
});
// AWS.mock("credential-provider-node")

AWS.mock("DynamoDB.DocumentClient", "update", function (params, callback) {
  callback(null, { Attributes: { id: "1234" } });
});

// S3 getObject mock - return a Buffer object with file data
AWS.mock("S3", "getObject", {
  Body: Buffer.from(JSON.stringify({ hello: "world" }), "utf8"),
});

describe("functions executes", () => {
  beforeEach(() => {
    jest.resetModules(); // Most important - it clears the cache
    process.env.API_NEXTJSBLOG_GRAPHQLAPIENDPOINTOUTPUT =
      "https://g5yw5icipfghrph26atksqrwyi.appsync-api.us-east-1.amazonaws.com/graphql";
    // console.log(process.env);
    process.env.STORAGE_ROUTEFILES_BUCKETNAME =
      "nextjsblog619f9308251149be95e1a59d89c85e5e233823-dev";
  });

  test("sample", async () => {
    const response = Promise.resolve({
      ok: true,
      status: "200",
      json: () => {
        return {
          data: { getPost: { timeSeriesFiles: "sampletimeseries" } },
        };
      },
    });
    fetch.mockImplementation(() => response);

    expect(await handler(event)).toEqual({
      body: '{"Attributes":{"id":"1234"}}',
      headers: {
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
      },
      statusCode: 200,
    });
  });
});
