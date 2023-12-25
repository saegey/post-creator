import { APIGatewayProxyEvent } from "aws-lambda";
import cheerio from "cheerio";
import fetch from "node-fetch";
import vm from "node:vm";

export const handler = async (event: APIGatewayProxyEvent) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  const { url } = event.queryStringParameters;
  const endpoint = new URL(url);
  const context: {
    OmniGo?: {
      event: {
        city: string;
        date: string;
        img: string;
        name: string;
        state: string;
        checkpoints: any;
        EventRoutes: any;
        EventClasses: any;
      };
    };
  } = {};

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
    const scripts = $('script:contains("EventClasses")').text();
    vm.createContext(context);
    vm.runInContext(scripts, context);
  } catch (e) {
    console.log(e);
  }

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
    body: JSON.stringify({
      eventClasses: context.OmniGo.event.EventClasses,
      eventRoutes: context.OmniGo.event.EventRoutes,
      checkpoints: context.OmniGo.event.checkpoints,
      city: context.OmniGo.event.city,
      date: context.OmniGo.event.date,
      image: context.OmniGo.event.img,
      name: context.OmniGo.event.name,
      state: context.OmniGo.event.state,
    }),
  };
};
