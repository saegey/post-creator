const fetch = require('node-fetch');

exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  const raceId = event.queryStringParameters.raceId;
  const url = `https://my.raceresult.com/${raceId}/RRPublish/data/config?page=results&noVisitor=1`;
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

  let statusCode = 200;
  let body;
  let response;
  let key, server;
  let resultsBody;
  let filterValues;

  try {
    response = await fetch(endpoint, requestToBeSigned);
    body = await response.json();
    console.log('BODY:', JSON.stringify(body));

    key = body.key;
    server = body.server;

    results = await fetch(
      `https://${server}/${raceId}/RRPublish/data/list?key=${key}&listname=Online%7CCategory&page=results&contest=0&r=leaders&l=3`
    );
    resultsBody = await results.json();
    console.log('BODY1:', JSON.stringify(resultsBody));

    if (body.errors) statusCode = 400;
  } catch (error) {
    console.log('ERROR', JSON.stringify(error));
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
    statusCode,
    //  Uncomment below to enable CORS requests
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
    body: JSON.stringify({
      key,
      server,
      filterValues: resultsBody.filterValues,
    }),
  };
};
