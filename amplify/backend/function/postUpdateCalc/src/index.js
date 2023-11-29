/* Amplify Params - DO NOT EDIT
	API_API12660653_APIID
	API_API12660653_APINAME
	API_NEXTJSBLOG_GRAPHQLAPIENDPOINTOUTPUT
	API_NEXTJSBLOG_GRAPHQLAPIIDOUTPUT
	API_NEXTJSBLOG_GRAPHQLAPIKEYOUTPUT
	ENV
	FUNCTION_NEXTJSBLOG24B60079_NAME
	FUNCTION_S3TRIGGER71BA5706_NAME
	REGION
Amplify Params - DO NOT EDIT */ /**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 *
 *
 */

const zlib = require('zlib');
const crypto = require('@aws-crypto/sha256-js');
const { defaultProvider } = require('@aws-sdk/credential-provider-node');
const { SignatureV4 } = require('@aws-sdk/signature-v4');
const { HttpRequest } = require('@aws-sdk/protocol-http');

const { Sha256 } = crypto;
const AWS_REGION = process.env.AWS_REGION || 'us-east-1';

const GRAPHQL_ENDPOINT = process.env.API_NEXTJSBLOG_GRAPHQLAPIENDPOINTOUTPUT;

const query = /* GraphQL */ `
  mutation UpdatePost($input: UpdatePostInput!) {
    updatePost(input: $input) {
      id
      title
      createdAt
      updatedAt
      timeInRed
      owner
      powerZones
      powerZoneBuckets
    }
  }
`;

// const docClient = new AWS.DynamoDB.DocumentClient();

const timeInRed = ({ powers, ftp }) => {
  let secsInRed = 0;
  powers.map((p) => {
    // console.log(p, ftp);
    if (p > ftp) {
      secsInRed += 1;
      // console.log('secsInRed', secsInRed);
    }
  });
  return secsInRed;
};

const calcPowerZones = (ftp) => {
  const zonesPercent = [
    { zone: 0, title: 'Not pedaling', powerLow: '0', powerHigh: '0' },
    { zone: 1, title: 'Active Recovery', powerLow: '1', powerHigh: '56' },
    { zone: 2, title: 'Endurance', powerLow: '56', powerHigh: '76' },
    { zone: 3, title: 'Tempo', powerLow: '76', powerHigh: '91' },
    { zone: 4, title: 'Threshold', powerLow: '91', powerHigh: '106' },
    { zone: 5, title: 'VO2max', powerLow: '106', powerHigh: '121' },
    {
      zone: 6,
      title: 'Anaerobic Capacity',
      powerLow: '121',
      powerHigh: null,
    },
  ];
  return zonesPercent.map((z) => {
    return {
      ...z,
      powerLow: Math.round((Number(z.powerLow) / 100) * ftp),
      powerHigh: Math.round((Number(z.powerHigh) / 100) * ftp),
    };
  });
};

const calcPowerZoneBuckets = ({ zones, powers }) => {
  const breakdownBuckets = new Array(zones.length).fill(0);
  powers.forEach((d) => {
    for (var i = zones.length - 1; i >= 0; i--) {
      if (d >= zones[i].powerLow && d !== null) {
        breakdownBuckets[i] += 1;
        break;
      }
    }
  });
  return breakdownBuckets;
};

const uncompress = async (input) => {
  return new Promise((resolve, reject) => {
    return zlib.gunzip(Buffer.from(input, 'base64'), (err, buffer) => {
      if (!err) {
        const widgetString = buffer.toString('utf-8');
        resolve(widgetString);
      } else {
        reject(err);
      }
    });
  });
};

exports.handler = async (event) => {
  // const postTable = `Post-${process.env.API_NEXTJSBLOG_GRAPHQLAPIIDOUTPUT}-${process.env.ENV}`;
  // console.log('postTable', postTable);
  // console.log(`EVENT: ${JSON.stringify(event)}`);
  for (const record of event.Records) {
    if (!record.dynamodb['NewImage'].currentFtp) {
      console.log('No ftp set for user');
      return;
    }
    console.log(record.eventID);
    console.log(record.eventName);
    console.log(
      'old image ftp',
      record.dynamodb['OldImage'].currentFtp
        ? record.dynamodb['OldImage'].currentFtp['S']
        : 'no old image'
    );
    console.log('new image ftp', record.dynamodb['NewImage'].currentFtp['S']);

    const oldFtp =
      record.dynamodb['OldImage'] && record.dynamodb['OldImage'].currentFtp
        ? record.dynamodb['OldImage'].currentFtp['S']
        : 0;
    const newFtp = record.dynamodb['NewImage'].currentFtp['S'];
    const postId = record.dynamodb['Keys']['id']['S'];
    console.log('postId', postId);

    if (oldFtp !== newFtp && record.dynamodb['NewImage']['powers']) {
      const powComp = record.dynamodb['NewImage']['powers']['B'];
      const powers = JSON.parse(await uncompress(powComp));
      const powersClean = powers.map((p) => (p !== null ? Number(p) : 0));
      console.log(powersClean);

      const timeInRedSecs = timeInRed({
        powers: powersClean,
        ftp: Number(newFtp),
      });

      const zones = calcPowerZones(Number(newFtp));
      const powerZoneBuckets = calcPowerZoneBuckets({
        zones,
        powers: powersClean,
      });

      console.log(timeInRedSecs, GRAPHQL_ENDPOINT);
      console.log(zones, powerZoneBuckets);

      const endpoint = new URL(GRAPHQL_ENDPOINT);

      const signer = new SignatureV4({
        credentials: defaultProvider(),
        region: AWS_REGION,
        service: 'appsync',
        sha256: Sha256,
      });

      const variables = {
        input: {
          id: postId,
          timeInRed: timeInRedSecs,
          powerZones: JSON.stringify(zones),
          powerZoneBuckets: JSON.stringify(powerZoneBuckets),
        },
      };

      const requestToBeSigned = new HttpRequest({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          host: endpoint.host,
        },
        hostname: endpoint.host,
        body: JSON.stringify({ query, variables }),
        path: endpoint.pathname,
      });

      const signed = await signer.sign(requestToBeSigned);
      const request = new Request(GRAPHQL_ENDPOINT, signed);

      let statusCode = 200;
      let body;
      let response;

      try {
        response = await fetch(request);
        body = await response.json();
        console.log('body', body);
        if (body.errors) statusCode = 400;
      } catch (error) {
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
        body: JSON.stringify(body),
      };
    }
  }
  return Promise.resolve('Successfully processed DynamoDB record');
};
