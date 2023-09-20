"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcStoppage = exports.calcElevationGain = exports.calcBestPowers = exports.calcMatchesBurned = exports.calcPowerSlices = exports.totalWattsOverFtp = exports.timeInRed = exports.calcPedalBreakdown = exports.calcNormalizedPower = exports.calcPowerZones = exports.calcPowerZoneBuckets = exports.downsampleElevation = exports.dateDiff = void 0;
const length_1 = __importDefault(require("@turf/length"));
const helpers_1 = require("@turf/helpers");
const dateDiff = (dateFrom, dateTo) => {
    let seconds = -1;
    if (dateFrom !== undefined && dateTo !== undefined) {
        var dif = dateFrom.getTime() - dateTo.getTime();
        seconds = Math.abs(dif / 1000);
    }
    return {
        seconds: seconds,
        minutes: seconds / 60,
        hours: seconds / 3600,
        days: seconds / (3600 * 24),
    };
};
exports.dateDiff = dateDiff;
const downsampleElevation = (coordinates
// rate: number
) => {
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
        downsampled.push({
            x: index,
            y: Number(item[2]).toFixed(0),
            distance: totalDistance,
            grade: !Number.isNaN(grade) && isFinite(grade) ? grade : 0,
        });
    });
    return downsampled;
};
exports.downsampleElevation = downsampleElevation;
const calcPowerZoneBuckets = ({ zones, powers, }) => {
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
exports.calcPowerZoneBuckets = calcPowerZoneBuckets;
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
        return Object.assign(Object.assign({}, z), { powerLow: Math.round((Number(z.powerLow) / 100) * ftp), powerHigh: Math.round((Number(z.powerHigh) / 100) * ftp) });
    });
};
exports.calcPowerZones = calcPowerZones;
const calcNormalizedPower = (powers) => {
    const segmentSums = [];
    const cleanPowers = powers.map((p) => (p === null ? 0 : p));
    let index = 0;
    do {
        segmentSums.push(cleanPowers.slice(index, index + 30).reduce((pv, cv) => pv + cv, 0));
        index += 1;
    } while (index <= powers.length - 30);
    const segmentTotal = segmentSums
        .map((s) => s / 30)
        .map((s) => Math.pow(s, 4))
        .reduce((pv, cv) => pv + cv, 0);
    const average = segmentTotal / segmentSums.length;
    return Math.pow(average, 1 / 4);
};
exports.calcNormalizedPower = calcNormalizedPower;
const calcPedalBreakdown = (powers) => {
    const notPedaling = powers.filter((p) => p === 0 || p === undefined);
    return {
        notPedaling: (notPedaling.length / powers.length).toFixed(2),
        pedaling: ((powers.length - notPedaling.length) / powers.length).toFixed(2),
    };
};
exports.calcPedalBreakdown = calcPedalBreakdown;
const timeInRed = ({ powers, ftp }) => {
    let secsInRed = 0;
    powers.map((p) => (p > ftp ? (secsInRed += 1) : ''));
    return secsInRed;
};
exports.timeInRed = timeInRed;
const totalWattsOverFtp = ({ powers, ftp }) => {
    let total = 0;
    powers.map((p) => (p > ftp ? (total += p - ftp) : ''));
    return total;
};
exports.totalWattsOverFtp = totalWattsOverFtp;
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
exports.calcPowerSlices = calcPowerSlices;
const calcMatchesBurned = (powers, times) => {
    let index = 0;
    const matches = [];
    do {
        let tempPowerIndex = -1;
        const startIndex = index;
        const tempPowers = powers.slice(index, powers.length);
        do {
            tempPowerIndex += 1;
            index += 1;
        } while (tempPowers[tempPowerIndex] > 280);
        if (tempPowerIndex > 2) {
            matches.push({
                startTime: times[startIndex],
                index: startIndex,
                vals: tempPowers.slice(0, tempPowerIndex),
            });
        }
    } while (index < powers.length);
    const formatted = matches.map((m) => {
        const totalJoules = m.vals.reduce((partialSum, a) => partialSum + a, 0);
        return {
            totalJoules: totalJoules,
            vals: m.vals,
            averagePower: Number((totalJoules / m.vals.length).toFixed(0)),
            totalTime: m.vals.length,
            index: m.index,
            startTime: m.startTime,
        };
    });
    return formatted.sort((a, b) => b.totalJoules - a.totalJoules).slice(0, 20);
};
exports.calcMatchesBurned = calcMatchesBurned;
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
        response[time] = Math.round((0, exports.calcPowerSlices)(filteredVals, time).slice(-1)[0] / time);
    });
    return response;
};
exports.calcBestPowers = calcBestPowers;
const calcElevationGain = (coordinates) => {
    let elevation = 0;
    coordinates.forEach((coord, index) => {
        if (index === coordinates.length - 1)
            return; // stop 1 point early since comparison requires 2 points
        const elevationDifference = coordinates[index + 1][2] - coord[2];
        if (elevationDifference > 0)
            elevation += elevationDifference;
    });
    return elevation;
};
exports.calcElevationGain = calcElevationGain;
const calcStoppage = (coordinates, times) => {
    let seconds = 0;
    times.forEach((time, index) => {
        if (index === coordinates.length - 1 || index === 0)
            return;
        const output = (0, exports.dateDiff)(new Date(time), new Date(times[index + 1]));
        if (output.seconds > 1) {
            seconds += output.seconds;
        }
    });
    return seconds;
};
exports.calcStoppage = calcStoppage;
