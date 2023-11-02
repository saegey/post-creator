"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcBestPowers = exports.calcElevation = exports.calcElevationGrades = exports.calcDistances = void 0;
const togeojson_1 = require("@tmcw/togeojson");
const xmldom_1 = require("@xmldom/xmldom");
const length_1 = __importDefault(require("@turf/length"));
const helpers_1 = require("@turf/helpers");
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const aws_xray_sdk_1 = __importDefault(require("aws-xray-sdk"));
const zlib_1 = __importDefault(require("zlib"));
const uuid_1 = require("uuid");
const gpxHelper_1 = require("./gpxHelper");
const iotdata = new aws_sdk_1.default.IotData({
    endpoint: 'a29ieb9zd32ips-ats.iot.us-east-1.amazonaws.com',
});
// https://vdelacou.medium.com/how-to-use-typescript-with-aws-amplify-function-d3e271b11d01/
// https://medium.com/develop-and-deploy-a-complex-serverless-web-app/use-s3-trigger-to-create-a-dynamodb-entry-when-uploading-images-to-s3-part-9-4d7489a4584b
const S3 = new aws_sdk_1.default.S3();
const docClient = new aws_sdk_1.default.DynamoDB.DocumentClient();
// import { Callback, Context, Handler } from 'aws-lambda';
const timeIntervals = (end) => [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 20, 25, 30, 35, 40, 45, 50,
    55, 60, 70, 80, 90, 100, 110, 120, 180, 240, 300, 360, 420, 480, 540, 600,
    660, 720, 780, 840, 900, 960, 1020, 1080, 1140, 1200, 1500, 1800, 2100, 2400,
    2700, 3000, 3300, 3600, 4200, 4800, 5400, 6000, 6600, 7200, 7800, 8400, 9000,
    9600, 10200, 10800, 12000, 13200, 14400, 15600, 16800, 18000, 19200, 20400,
    21600,
];
const calcDistances = (coordinates) => {
    let totalDistance = 0;
    let distances = [];
    coordinates.forEach((_, index) => {
        if (index !== coordinates.length - 1) {
            totalDistance += (0, length_1.default)((0, helpers_1.lineString)([
                [coordinates[index][0], coordinates[index][1]],
                [coordinates[index + 1][0], coordinates[index + 1][1]],
            ]), { units: 'meters' });
            distances.push(Number(totalDistance.toFixed(5)));
        }
    });
    return distances;
};
exports.calcDistances = calcDistances;
const calcElevationGrades = (coordinates, distances) => {
    const grades = coordinates.map((item, index) => {
        let grade = 0;
        if (index > 30) {
            grade =
                (item[2] - coordinates[index - 30][2]) /
                    (distances[index] - distances[index - 30]);
        }
        return !Number.isNaN(grade) && isFinite(grade)
            ? Number(grade.toFixed(3))
            : 0;
    });
    return grades;
};
exports.calcElevationGrades = calcElevationGrades;
const calcElevation = (coordinates) => {
    return coordinates.map((c) => c[2]);
};
exports.calcElevation = calcElevation;
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
    return new Promise((resolve, reject) => {
        zlib_1.default.gzip(JSON.stringify(input), (err, buffer) => {
            if (!err) {
                resolve(buffer);
            }
            else {
                reject(err);
            }
        });
    });
};
const message = ({ payload, topic }) => {
    return {
        topic,
        payload: JSON.stringify(payload),
        qos: 0,
    };
};
const publishMessage = async ({ payload, topic, }) => {
    const response = await iotdata.publish(message({ payload, topic })).promise();
    console.log(response, JSON.stringify(payload));
};
exports.handler = async function (event) {
    console.log('Event => ' + JSON.stringify(event));
    if (event.Records[0].s3.object.key.includes('timeseries')) {
        return;
    }
    // await publishMessage({ phase: 'start' });
    const segment = aws_xray_sdk_1.default.getSegment();
    const postTable = `Post-${process.env.API_NEXTJSBLOG_GRAPHQLAPIIDOUTPUT}-${process.env.ENV}`;
    console.log('Dynamo Table: ', postTable);
    const bucket = event.Records[0].s3.bucket.name; //eslint-disable-line
    let key = event.Records[0].s3.object.key.replace('%3A', ':'); //eslint-disable-line
    const fileParams = { Bucket: bucket, Key: key };
    const s3getTimer = segment === null || segment === void 0 ? void 0 : segment.addNewSubsegment('s3get');
    const file = await S3.getObject({
        Bucket: bucket,
        Key: key,
    }).promise();
    s3getTimer.close();
    const s3metaTimer = segment.addNewSubsegment('s3meta');
    const metaData = await S3.headObject(fileParams).promise();
    console.log('metadata', JSON.stringify(metaData));
    s3metaTimer.close();
    const postId = metaData.Metadata.postid;
    const publishTopic = `post-${postId}`;
    // await publishMessage({
    //   payload: { phase: 'meta-downloaded' },
    //   topic: publishTopic,
    // });
    await publishMessage({
        payload: { phase: 'file-downloaded' },
        topic: publishTopic,
    });
    const xmlParseTimer = segment === null || segment === void 0 ? void 0 : segment.addNewSubsegment('xmlParse');
    const xmlDoc = new xmldom_1.DOMParser().parseFromString(file.Body.toString('utf-8'));
    xmlParseTimer.close();
    await publishMessage({
        payload: { phase: 'xml-parse' },
        topic: publishTopic,
    });
    const gpxParseTimer = segment === null || segment === void 0 ? void 0 : segment.addNewSubsegment('gpxParse');
    const gpxData = (0, togeojson_1.gpx)(xmlDoc);
    gpxParseTimer.close();
    await publishMessage({
        payload: { phase: 'gpx-parse' },
        topic: publishTopic,
    });
    const currentFtp = metaData.Metadata.currentftp;
    let coordinates = [];
    let powers, powerAnalysis, elevation, distances, elevationGrades;
    let elevationGain, stoppedTime, elapsedTime;
    let heartAnalysis, normalizedPower, cadenceAnalysis, tempAnalysis;
    let zones, powerZoneBuckets, timeInRedSecs;
    const distance = (0, length_1.default)(gpxData);
    gpxData.features.map((feature) => {
        const { heart, times, atemps, cads } = feature.properties.coordinateProperties;
        coordinates = feature.geometry.coordinates;
        powers = feature.properties.coordinateProperties.powers;
        const powerAnalysisTimer = segment === null || segment === void 0 ? void 0 : segment.addNewSubsegment('powerAnalysis');
        powerAnalysis = (0, exports.calcBestPowers)(timeIntervals(powers.length), powers);
        heartAnalysis = (0, exports.calcBestPowers)(timeIntervals(heart.length), heart);
        cadenceAnalysis = (0, exports.calcBestPowers)(timeIntervals(cads.length), cads, true);
        tempAnalysis = (0, exports.calcBestPowers)(timeIntervals(atemps.length), atemps, true);
        powerAnalysisTimer.close();
        normalizedPower = (0, gpxHelper_1.calcNormalizedPower)(powers);
        elevationGain = (0, gpxHelper_1.calcElevationGain)(coordinates);
        stoppedTime = (0, gpxHelper_1.calcStoppage)(coordinates, times);
        elapsedTime = (0, gpxHelper_1.dateDiff)(new Date(times[0]), new Date(times.at(-1))).seconds;
        const downsampleElevationTimer = segment === null || segment === void 0 ? void 0 : segment.addNewSubsegment('elevationAnalysis');
        elevation = (0, exports.calcElevation)(coordinates);
        distances = (0, exports.calcDistances)(coordinates);
        elevationGrades = (0, exports.calcElevationGrades)(coordinates, distances);
        if (Number(currentFtp) > 0) {
            zones = (0, gpxHelper_1.calcPowerZones)(Number(currentFtp));
            powerZoneBuckets = (0, gpxHelper_1.calcPowerZoneBuckets)({
                zones,
                powers: powers.map((p) => (p !== null ? Number(p) : 0)),
            });
            timeInRedSecs = (0, gpxHelper_1.timeInRed)({
                powers: powers.map((p) => (p !== null ? Number(p) : 0)),
                ftp: Number(currentFtp),
            });
        }
        downsampleElevationTimer.close();
    });
    await publishMessage({
        payload: { phase: 'process-data' },
        topic: publishTopic,
    });
    const s3key = `timeseries/${(0, uuid_1.v4)()}.json`;
    const s3Putparams = {
        Body: JSON.stringify({
            coordinates,
            elevation,
            powers,
            distances,
            elevationGrades,
            powerAnalysis,
        }),
        Bucket: bucket,
        Key: `private/${metaData.Metadata.identityid}/${s3key}`,
    };
    try {
        const s3res = await S3.putObject(s3Putparams).promise();
        console.log(s3res);
    }
    catch (e) {
        console.error(JSON.stringify(e));
    }
    const updateDynamoTimer = segment === null || segment === void 0 ? void 0 : segment.addNewSubsegment('updateDynamo');
    try {
        const res = await docClient
            .update({
            TableName: postTable,
            Key: {
                id: postId,
            },
            UpdateExpression: 'SET distance = :dis, heartAnalysis = :hr, elevationTotal = :el, stoppedTime = :st, elapsedTime = :et, normalizedPower = :np, cadenceAnalysis = :ca, tempAnalysis = :ta, powerZones = :pz, powerZoneBuckets = :pzb, timeInRed = :red, timeSeriesFile = :tsf',
            ExpressionAttributeValues: {
                ':ta': tempAnalysis,
                ':ca': cadenceAnalysis,
                ':dis': distance,
                ':hr': heartAnalysis,
                ':el': elevationGain,
                ':st': stoppedTime,
                ':et': elapsedTime,
                ':np': normalizedPower,
                ':pz': zones ? zones : [],
                ':pzb': powerZoneBuckets ? powerZoneBuckets : [],
                ':red': timeInRedSecs ? timeInRedSecs : 0,
                ':tsf': s3key,
            },
        })
            .promise();
    }
    catch (e) {
        console.error(JSON.stringify(e));
    }
    updateDynamoTimer.close();
    await publishMessage({
        payload: { phase: 'update-data' },
        topic: publishTopic,
    });
};
