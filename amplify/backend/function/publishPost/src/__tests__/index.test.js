const { handler } = require("../index");
const event = require("../event.json");

const fetch = require("node-fetch");
const AWS = require("aws-sdk");
const { isJSDocImplementsTag } = require("typescript");

jest.mock("node-fetch", () => jest.fn());

jest.mock("aws-sdk", () => {
  return {
    DynamoDB: {
      // just an object, not a function
      DocumentClient: jest.fn(() => ({
        query: jest.fn().mockResolvedValue({
          data: {
            Items: [{ id: 1234, shortUrl: "abcde" }],
          },
        }),
        update: jest.fn().mockReturnValue({
          promise: jest.fn().mockResolvedValue({ Attributes: { id: "1234" } }),
        }),
      })),
    },
    S3: jest.fn(() => ({
      // Simulate the S3 methods you want to mock
      getObject: jest
        .fn()
        .mockReturnValue({
          promise: jest
            .fn()
            .mockResolvedValue({
              Body: Buffer.from(JSON.stringify({ hello: "world" }), "utf8"),
            }),
        }),
      putObject: jest.fn().mockReturnThis(),
      // Add more mocked S3 methods as needed for your tests
    })),
  };
});

describe("functions executes", () => {
  beforeEach(() => {
    jest.resetModules(); // Most important - it clears the cache
    process.env.API_NEXTJSBLOG_GRAPHQLAPIENDPOINTOUTPUT =
      "https://g5yw5icipfghrph26atksqrwyi.appsync-api.us-east-1.amazonaws.com/graphql";
    // console.log(process.env);
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
    expect(await handler(event)).toBe({});
  });
});
