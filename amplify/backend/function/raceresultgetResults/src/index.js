const fetch = require('node-fetch');

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  // "queryStringParameters": {
  //     "category": "50 MILES",
  //     "division": "Open Men",
  //     "key": "88bb9404bef32b13ace1fecfb6ee25a2",
  //     "raceId": "262579",
  //     "server": "my4.raceresult.com"
  // },
  const { category, division, key, raceId, server } =
    event.queryStringParameters;

  const url = `https://${server}/${raceId}/RRPublish/data/list?key=${key}&listname=${encodeURIComponent(
    'Online|Category'
  )}&page=results&contest=0&r=group&name=${encodeURIComponent(
    `#1_${category}#1_${division}`
  )}`;
  console.log('URL:', url);
  const endpoint = new URL(url);
  const requestToBeSigned = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      host: endpoint.host,
    },
    hostname: endpoint.host,
    path: endpoint.pathname,
  };
  response = await fetch(endpoint, requestToBeSigned);
  body = await response.json();

  // #1_50 MILES#1_Open Men

  return {
    statusCode: 200,
    //  Uncomment below to enable CORS requests
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
    body: JSON.stringify(body),
  };
};
