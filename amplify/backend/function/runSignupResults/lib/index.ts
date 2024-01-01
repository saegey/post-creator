import { APIGatewayProxyEvent } from "aws-lambda";
import fetch from "node-fetch";

export const handler = async (event: APIGatewayProxyEvent) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  const { url, category } = event.queryStringParameters;
  const endpoint = new URL(url);
  const raceId = endpoint.pathname.split("/")[3];
  // const context: { categories?: Array<{ id: number; name: string }> } = {};

  try {
    const res = await fetch(
      `https://runsignup.com/Race/Results/${raceId}?resultSetId=${category}&page=1&num=100&search=`,
      {
        headers: {
          accept: "application/json, */*; q=0.01",
          "accept-language": "en-US,en;q=0.9,it;q=0.8,fr;q=0.7",
          "sec-ch-ua":
            '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"macOS"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-requested-with": "XMLHttpRequest",
          Referer: "https://runsignup.com/Race/Results/86159",
          "Referrer-Policy": "strict-origin-when-cross-origin",
        },
        body: null,
        method: "GET",
      }
    );
    const body = await res.json();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      body: JSON.stringify(body),
    };
  } catch (e) {
    console.log(e);
  }
};
