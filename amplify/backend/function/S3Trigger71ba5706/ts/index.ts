import { gpx } from '@tmcw/togeojson';
import { DOMParser } from '@xmldom/xmldom';
import length from '@turf/length';
import { lineString } from '@turf/helpers';
import AWS from 'aws-sdk';
import AWSXRay from 'aws-xray-sdk';
import zlib from 'zlib';

// https://vdelacou.medium.com/how-to-use-typescript-with-aws-amplify-function-d3e271b11d01/
// https://medium.com/develop-and-deploy-a-complex-serverless-web-app/use-s3-trigger-to-create-a-dynamodb-entry-when-uploading-images-to-s3-part-9-4d7489a4584b

const S3 = new AWS.S3();
const docClient = new AWS.DynamoDB.DocumentClient();
// import { Callback, Context, Handler } from 'aws-lambda';

const timeIntervals = (end: number) => [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 20, 25, 30, 35, 40, 45, 50,
  55, 60, 70, 80, 90, 100, 110, 120, 180, 240, 300, 360, 420, 480, 540, 600,
  660, 720, 780, 840, 900, 960, 1020, 1080, 1140, 1200, 1500, 1800, 2100, 2400,
  2700, 3000, 3300, 3600, 4200, 4800, 5400, 6000, 6600, 7200, 7800, 8400, 9000,
  9600, 10200, 10800, 12000, 13200, 14400, 15600, 16800, 18000, 19200, 20400,
  21600,
];
type Coordinate = [number, number, number];
type ProcessedCoordinate = {
  x: number;
  y: string;
  distance: number;
  grade: number;
};

export const downsampleElevation = (
  coordinates: Coordinate[],
  rate: number
) => {
  const downsampled: ProcessedCoordinate[] = [];
  let totalDistance = 0;
  let distances: Array<number> = [];
  let grade = 0;

  coordinates.forEach((item, index) => {
    if (index !== coordinates.length - 1) {
      totalDistance += length(
        lineString([
          [coordinates[index][0], coordinates[index][1]],
          [coordinates[index + 1][0], coordinates[index + 1][1]],
        ]),
        { units: 'meters' }
      );
      distances.push(totalDistance);
    }

    if (index > 30) {
      grade =
        (item[2] - coordinates[index - 30][2]) /
        (totalDistance - distances[index - 30]);
    }

    if (index % rate === 0 || index === 0) {
      downsampled.push({
        x: index,
        y: Number(item[2]).toFixed(0),
        distance: totalDistance,
        grade: !Number.isNaN(grade) && isFinite(grade) ? grade : 0,
      });
    }
  });

  return downsampled;
};

const calcPowerSlices = (powers: number[], length: number) => {
  const powerSums: number[] = [];
  for (var i = 0; i < powers.length; i++) {
    const nums = powers.slice(i, i + length);
    if (nums.length === length) {
      powerSums.push(nums.reduce((pv, cv) => pv + cv, 0));
    }
  }
  powerSums.sort(function (a, b) {
    return a - b;
  });
  return powerSums;
};

export const calcBestPowers = (
  times: number[],
  powers: number[],
  removeZeros = false
): Record<number | string, number> => {
  const filteredVals = removeZeros ? powers.filter((val) => val !== 0) : powers;

  const sum = filteredVals
    .map((p) => (p ? p : 0))
    .reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
  const averagePower = Math.round(sum / filteredVals.length);

  const response: Record<number | string, number> = {};
  response['entire'] = averagePower;

  times.forEach((time) => {
    if (time > filteredVals.length) return;
    response[time] = Math.round(
      calcPowerSlices(filteredVals, time).slice(-1)[0] / time
    );
  });
  return response;
};

const compress = async (input: any) => {
  return new Promise((resolve, reject) => {
    zlib.gzip(JSON.stringify(input), (err: any, buffer: any) => {
      if (!err) {
        resolve(buffer);
      } else {
        reject(err);
      }
    });
  });
};

interface TriggerEvent {
  Records: Array<{
    eventVersion: string;
    eventName: string;
    s3: {
      bucket: {
        name: string;
      };
      object: { key: string; size: number; etag: string };
    };
  }>;
}

const shrinkify = async ({ field, name }: { field: any; name: string }) => {
  // compress the content
  const fieldString = JSON.stringify(field);
  const fieldCompressed: any = await compress(field);

  // more stats about the content
  console.log(
    `${name}: total size (uncompressed): ~${Math.round(
      fieldString.length / 1024
    )} KB`
  );
  console.log(
    `${name}: total size (compressed): ~${Math.round(
      fieldCompressed.length / 1024
    )} KB`
  );

  return fieldCompressed;
};

exports.handler = async function (event: TriggerEvent) {
  const segment = AWSXRay.getSegment();
  let postTable = 'Post-xcbzvot3xjf2tiwawkbuc7dwoy-dev';
  if (process.env.ENV === 'master') {
    postTable = 'Post-xcbzvot3xjf2tiwawkbuc7dwoy-prod';
  }
  // console.log('Received S3 event:', JSON.stringify(event, null, 2));
  // const eventName = event.Records[0].eventName;
  const bucket = event.Records[0].s3.bucket.name; //eslint-disable-line
  let key = event.Records[0].s3.object.key.replace('%3A', ':'); //eslint-disable-line
  // const imgSize = event.Records[0].s3.object.size;
  // const maxSize = 5000000; // More that 5Mb images would be rejected
  // const filename = key.split('.').slice(0, -1).join('.');
  const fileParams = { Bucket: bucket, Key: key };

  const s3getTimer = segment.addNewSubsegment('s3get');
  const file = await S3.getObject({
    Bucket: bucket as string,
    Key: key,
  }).promise();
  s3getTimer.close();

  const s3metaTimer = segment.addNewSubsegment('s3meta');
  const metaData = await S3.headObject(fileParams).promise();
  console.log('metadata', JSON.stringify(metaData));
  s3metaTimer.close();

  const xmlParseTimer = segment.addNewSubsegment('xmlParse');
  const xmlDoc = new DOMParser().parseFromString(file.Body.toString('utf-8'));
  xmlParseTimer.close();

  const gpxParseTimer = segment.addNewSubsegment('gpxParse');
  const gpxData = gpx(xmlDoc);
  gpxParseTimer.close();

  let coordinates: Array<any> = [];
  let powers, powerAnalysis, elevation;

  gpxData.features.map((feature: any) => {
    // const { powers, heart, times, atemps, cads } =
    //   feature.properties.coordinateProperties;
    coordinates = feature.geometry.coordinates;
    powers = feature.properties.coordinateProperties.powers;

    const powerAnalysisTimer = segment.addNewSubsegment('powerAnalysis');
    powerAnalysis = calcBestPowers(timeIntervals(powers.length), powers);
    powerAnalysisTimer.close();

    const downsampleElevationTimer = segment.addNewSubsegment('powerAnalysis');
    elevation = downsampleElevation(coordinates, 10);
    downsampleElevationTimer.close();
  });

  const updateDynamoTimer = segment.addNewSubsegment('updateDynamo');
  const res = await docClient
    .update({
      TableName: postTable,
      Key: {
        id: metaData.Metadata.postid,
      },
      UpdateExpression:
        'SET powerAnalysis = :s, coordinates = :c, elevation = :e, powers = :p',
      ExpressionAttributeValues: {
        ':s': powerAnalysis,
        ':c': await shrinkify({ field: coordinates, name: 'coordinates' }),
        ':e': await shrinkify({ field: elevation, name: 'elevation' }),
        ':p': await shrinkify({ field: powers, name: 'powers' }),
      },
    })
    .promise();
  updateDynamoTimer.close();
  console.log(JSON.stringify(res));
};
