/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 *
 */

const cheerio = require("cheerio");
const fetch = require("node-fetch");
const vm = require("node:vm");

exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const { url } = event.queryStringParameters;

  const endpoint = new URL(url);
  let statusCode = 200;
  let body;
  let response;
  const context = {};

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
    body = await response.text();
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
      checkpoints: context.OmniGo.event.checkpoints,
    }),
  };
};
