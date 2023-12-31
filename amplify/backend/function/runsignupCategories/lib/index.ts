import { APIGatewayProxyEvent } from "aws-lambda";
import * as cheerio from "cheerio";
import fetch from "node-fetch";

export const handler = async (event: APIGatewayProxyEvent) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  const { url } = event.queryStringParameters;
  const endpoint = new URL(url);
  // const context: { categories?: Array<{ id: number; name: string }> } = {};

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
    const response = await fetch(endpoint, requestToBeSigned);
    const body = await response.text();
    const $ = cheerio.load(body);

    const res: Array<{
      id: number;
      name: string;
      year: number;
      category: string;
    }> = [];

    // const scripts = $("#resultsSelect > .options > a").text();
    $("#resultsSelect > .options > a").each((i, element) => {
      const $element = $(element);
      const textContent = $element.text();
      const cat = $element.find("span").text().replace(/(\s+)/g, " ").trim();
      if ($element.data("value") === undefined) {
        return;
      }
      // Get the text content of the current elementr
      res.push({
        name: textContent.replace(/(\s+)/g, " ").replace(cat, "").trim(),
        id: Number($element.data("value")),
        year: $element.data("year") ? Number($element.data("year")) : undefined,
        category: cat,
      });
    });

    const eventName = $(".websiteFullScreenHeader__name > h1")
      .text()
      .replace("Results For", "")
      .trim();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      body: JSON.stringify({
        categories: res,
        eventName,
      }),
    };
  } catch (e) {
    console.log(e);
  }
};
