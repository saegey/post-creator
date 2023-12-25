"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const actions_1 = require("./actions");
const formatMillisecondsToHHMM = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    // Add leading zeros if needed
    const formattedHours = hours < 10 ? `${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};
const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    const { url, category } = event.queryStringParameters;
    const { eventClasses, checkpoints } = yield (0, actions_1.getEventMetadata)({ url });
    if (!eventClasses || !checkpoints) {
        return { statusCode: 500 };
    }
    const eventClass = eventClasses.find((element) => element.classWithPrefix === category);
    if (!eventClass) {
        return { statusCode: 500 };
    }
    const racers = yield (0, actions_1.getResults)({
        gender: eventClass.gender == 1 ? "m" : "f",
        distance: eventClass.distance,
        url: url,
    });
    const finishTimes = yield (0, actions_1.getFinishTimes)({
        gender: eventClass.gender == 1 ? "m" : "f",
        distance: eventClass.distance,
        url: url,
    });
    const checkpointTimes = yield (0, actions_1.getCheckPoints)({
        gender: eventClass.gender == 1 ? "m" : "f",
        distance: eventClass.distance,
        url: url,
    });
    const finishTimeLookup = Object.fromEntries(finishTimes.map((e) => [e.eventClassRacerId, e.ts]));
    const calcRacers = racers.map((racer, i) => {
        const finishTime = finishTimeLookup[racer.id]
            ? finishTimeLookup[racer.id]
            : null;
        const totalTime = finishTime ? finishTime - racers[i].start : 0;
        return Object.assign(Object.assign({}, racer), { finishTime: finishTime, totalTime: finishTime ? finishTime - racers[i].start : null, timeFormattted: formatMillisecondsToHHMM(totalTime), checkpointTimes: checkpointTimes.filter((t) => t.bib === racer.bib) });
    });
    calcRacers.sort((a, b) => {
        if (a.finishTime === null && b.finishTime === null) {
            return 0;
        }
        else if (a.finishTime === null) {
            return 1; // Place null values at the end
        }
        else if (b.finishTime === null) {
            return -1; // Place null values at the end
        }
        else {
            return a.finishTime - b.finishTime;
        }
    });
    const requiredCheckPoints = checkpoints.filter((c) => c.required === true);
    const filterRacers = calcRacers.filter((r) => r.checkpointTimes.length === requiredCheckPoints.length);
    const dnfRacers = calcRacers
        .filter((r) => r.checkpointTimes.length < requiredCheckPoints.length &&
        r.status !== "DNS")
        .map((r) => Object.assign(r, { status: "DNF" }));
    const allRacers = filterRacers.concat(dnfRacers);
    const catRacers = allRacers.filter((r) => r.classId === Number(eventClass.id));
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
        },
        body: JSON.stringify(catRacers),
    };
});
exports.handler = handler;
