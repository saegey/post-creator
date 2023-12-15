const fetch = require("node-fetch");

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  let statusCode = 200;
  let body;
  let response;
  let categories;

  const { raceId } = event.queryStringParameters;
  // https://www.crossresults.com/downloadrace.php?raceID=12190&json=1
  const url = `https://www.crossresults.com/downloadrace.php?raceID=${raceId}&json=1`;

  console.log("URL:", url);

  const endpoint = new URL(url);

  const requestToBeSigned = {
    method: "GET",
    headers: {
      //   "Content-Type": "application/json",
      //   Accept: "application/json",
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
      //   host: endpoint.host,
    },
    hostname: endpoint.host,
    path: endpoint.pathname,
  };

  try {
    response = await fetch(endpoint, requestToBeSigned);
    // console.log(response);
    body = await response.json();
    console.log("BODY:", JSON.stringify(body));
    // categories = body["Results"].map((r) => r["Grouping"]["Category"]);
  } catch (error) {
    console.log("ERROR", JSON.stringify(error));
    statusCode = 500;
    body = {
      errors: [
        {
          message: error.message,
        },
      ],
    };
  }

  return {
    statusCode: 200,
    //  Uncomment below to enable CORS requests
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
    body: JSON.stringify(body),
  };
};
