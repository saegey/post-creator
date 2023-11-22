const fetch = require("node-fetch");

exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  // https://www.webscorer.com/racedetails?raceid=298514&did=357229&cid=1775753
  let statusCode = 200;
  let body;
  let response;
  let results;

  const { category, raceId } = event.queryStringParameters;
  const url = `https://www.webscorer.com/json/race?raceid=${raceId}&apiid=164367`;

  console.log("URL:", url);
  const endpoint = new URL(url);

  const requestToBeSigned = {
    method: "GET",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
    },
    hostname: endpoint.host,
    path: endpoint.pathname,
  };

  try {
    response = await fetch(endpoint, requestToBeSigned);
    console.log(category);
    body = await response.json();
    // console.log("BODY:", JSON.stringify(body));
    // categories = body["Results"].map((r) => r["Grouping"]["Category"]);
    results = body["Results"].filter(
      (r) => r["Grouping"]["Category"] === category
    );
    // console.log(body["Results"].map((r) => r["Grouping"]["Category"]));
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
    body: JSON.stringify(results[0]['Racers']),
  };
};
