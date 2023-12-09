const AWS = require("aws-sdk-mock");
const { defaultProvider } = require("@aws-sdk/credential-provider-node");
const { SignatureV4 } = require("@aws-sdk/signature-v4");
const fetch = require("node-fetch");

const { handler } = require("../index");
const event = require("../event.json");

jest.mock("node-fetch", () => jest.fn());
jest.mock("@aws-sdk/credential-provider-node", () => {
  return {
    defaultProvider: jest.fn().mockReturnValue("blah blah"),
  };
});
jest.mock("@aws-sdk/signature-v4");


AWS.mock("S3", "getObject", {
  Body: Buffer.from(JSON.stringify({ hello: "world" }), "utf8"),
});

describe("publishPost function", () => {
  beforeEach(() => {
    jest.resetModules(); // Most important - it clears the cache
    jest.resetAllMocks();
    process.env.API_NEXTJSBLOG_GRAPHQLAPIENDPOINTOUTPUT =
      "https://g5yw5icipfghrph26atksqrwyi.appsync-api.us-east-1.amazonaws.com/graphql";
    process.env.STORAGE_ROUTEFILES_BUCKETNAME =
      "nextjsblog619f9308251149be95e1a59d89c85e5e233823-dev";

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
  });

  test("returns an error if no results", async () => {
    const response = Promise.reject({ message: "blahblahblah" });

    fetch.mockImplementation(() => {
      return {
        json: () => {
          return response;
        },
      };
    });

    expect(await handler(event)).toEqual({
      body: JSON.stringify({ errors: [{ message: "blahblahblah" }] }),
      headers: {
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
      },
      statusCode: 500,
    });
  });

  test("it creates a short url if one doesn't exist", async () => {
    AWS.mock("DynamoDB.DocumentClient", "query", function (params, callback) {
      callback({ error: "no data" });
    });
    AWS.mock("DynamoDB.DocumentClient", "update", function (params, callback) {
      callback(null, { Attributes: { id: "5678" } });
    });

    expect(await handler(event)).toEqual({
      body: '{"Attributes":{"id":"5678"}}',
      headers: {
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
      },
      statusCode: 200,
    });

    AWS.restore("DynamoDB.DocumentClient");
  });

  test("returns a successful response", async () => {
    AWS.mock("DynamoDB.DocumentClient", "update", function (params, callback) {
      callback(null, { Attributes: { id: "1234" } });
    });

    AWS.mock("DynamoDB.DocumentClient", "query", function (params, callback) {
      callback(null, {
        data: {
          Items: [{ id: 1234, shortUrl: "abcde" }],
        },
      });
    });

    expect(await handler(event)).toEqual({
      body: '{"Attributes":{"id":"1234"}}',
      headers: {
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
      },
      statusCode: 200,
    });

    AWS.restore("DynamoDB.DocumentClient");
  });
});
