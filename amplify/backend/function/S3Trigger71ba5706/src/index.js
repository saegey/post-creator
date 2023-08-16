"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcBestPowers = exports.downsampleElevation = void 0;
const { gpx } = require('@tmcw/togeojson');
const { DOMParser } = require('@xmldom/xmldom');
const length_1 = __importDefault(require("@turf/length"));
const helpers_1 = require("@turf/helpers");
const AWS = require('aws-sdk');
const S3 = new AWS.S3();
const docClient = new AWS.DynamoDB.DocumentClient();
const zlib = require('zlib');
const timeIntervals = (end) => [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 20, 25, 30, 35, 40, 45, 50,
    55, 60, 70, 80, 90, 100, 110, 120, 180, 240, 300, 360, 420, 480, 540, 600,
    660, 720, 780, 840, 900, 960, 1020, 1080, 1140, 1200, 1500, 1800, 2100, 2400,
    2700, 3000, 3300, 3600, 4200, 4800, 5400, 6000, 6600, 7200, 7800, 8400, 9000,
    9600, 10200, 10800, 12000, 13200, 14400, 15600, 16800, 18000, 19200, 20400,
    21600,
];
const downsampleElevation = (coordinates, rate) => {
    const downsampled = [];
    let totalDistance = 0;
    let distances = [];
    let grade = 0;
    coordinates.forEach((item, index) => {
        if (index !== coordinates.length - 1) {
            totalDistance += (0, length_1.default)((0, helpers_1.lineString)([
                [coordinates[index][0], coordinates[index][1]],
                [coordinates[index + 1][0], coordinates[index + 1][1]],
            ]), { units: 'meters' });
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
exports.downsampleElevation = downsampleElevation;
const calcPowerSlices = (powers, length) => {
    const powerSums = [];
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
const calcBestPowers = (times, powers, removeZeros = false) => {
    const filteredVals = removeZeros ? powers.filter((val) => val !== 0) : powers;
    const sum = filteredVals
        .map((p) => (p ? p : 0))
        .reduce((accumulator, value) => {
        return accumulator + value;
    }, 0);
    const averagePower = Math.round(sum / filteredVals.length);
    const response = {};
    response['entire'] = averagePower;
    times.forEach((time) => {
        if (time > filteredVals.length)
            return;
        response[time] = Math.round(calcPowerSlices(filteredVals, time).slice(-1)[0] / time);
    });
    return response;
};
exports.calcBestPowers = calcBestPowers;
const compress = async (input) => {
    // const segment = AWSXRay.getSegment();
    // const subsegment = segment.addNewSubsegment("subseg");
    return new Promise((resolve, reject) => {
        zlib.gzip(JSON.stringify(input), (err, buffer) => {
            // subsegment.close();
            if (!err) {
                resolve(buffer);
            }
            else {
                reject(err);
            }
        });
    });
};
const shrinkify = async ({ field, name }) => {
    // console.log(`${name}: ${field.length} length.`);
    // compress the content
    const fieldString = JSON.stringify(field);
    const fieldCompressed = await compress(field);
    // more stats about the content
    console.log(`${name}: total size (uncompressed): ~${Math.round(fieldString.length / 1024)} KB`);
    console.log(`${name}: total size (compressed): ~${Math.round(fieldCompressed.length / 1024)} KB`);
    return fieldCompressed;
};
exports.handler = async function (event) {
    let postTable = 'Post-xcbzvot3xjf2tiwawkbuc7dwoy-dev';
    if (process.env.ENV === 'master') {
        // console.log('Prod env');
        postTable = 'Post-xcbzvot3xjf2tiwawkbuc7dwoy-prod';
    }
    // console.log('Received S3 event:', JSON.stringify(event, null, 2));
    const eventName = event.Records[0].eventName;
    const bucket = event.Records[0].s3.bucket.name; //eslint-disable-line
    let key = event.Records[0].s3.object.key.replace('%3A', ':'); //eslint-disable-line
    // const imgSize = event.Records[0].s3.object.size;
    // const maxSize = 5000000; // More that 5Mb images would be rejected
    // const filename = key.split('.').slice(0, -1).join('.');
    const fileParams = { Bucket: bucket, Key: key };
    const file = await S3.getObject(fileParams).promise();
    const metaData = await S3.headObject(fileParams).promise();
    console.log('metadata', JSON.stringify(metaData));
    const xmlDoc = new DOMParser().parseFromString(file.Body.toString('utf-8'));
    console.log('gpx parsing');
    const gpxData = gpx(xmlDoc);
    let coordinates = [];
    let powers, powerAnalysis, elevation;
    gpxData.features.map((feature) => {
        // const { powers, heart, times, atemps, cads } =
        //   feature.properties.coordinateProperties;
        coordinates = feature.geometry.coordinates;
        powers = feature.properties.coordinateProperties.powers;
        powerAnalysis = (0, exports.calcBestPowers)(timeIntervals(powers.length), powers);
        elevation = (0, exports.downsampleElevation)(coordinates, 10);
    });
    // console.log(`Coordinates: ${coordinates.length} length.`);
    // // compress the content
    // const coordinatesString = JSON.stringify(coordinates);
    // const coordinatesCompressed: any = await compress(coordinatesString);
    // // more stats about the content
    // console.log(
    //   `total size (uncompressed): ~${Math.round(
    //     coordinatesString.length / 1024
    //   )} KB`
    // );
    // console.log(
    //   `total size (compressed): ~${Math.round(
    //     coordinatesCompressed.length / 1024
    //   )} KB`
    // );
    const res = await docClient
        .update({
        TableName: postTable,
        Key: {
            id: metaData.Metadata.postid,
        },
        UpdateExpression: 'SET powerAnalysis = :s, coordinates = :c, elevation = :e, powers = :p',
        ExpressionAttributeValues: {
            ':s': powerAnalysis,
            ':c': await shrinkify({ field: coordinates, name: 'coordinates' }),
            ':e': await shrinkify({ field: elevation, name: 'elevation' }),
            ':p': await shrinkify({ field: powers, name: 'powers' }),
        },
    })
        .promise();
    // console.log(params, JSON.stringify(powerAnalysis));
    // const res = await DynamoDB.putItem(params).promise();
    console.log(JSON.stringify(res));
};
