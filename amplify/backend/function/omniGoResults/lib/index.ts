import { APIGatewayProxyEvent } from "aws-lambda";
import {
  getCheckPoints,
  getEventMetadata,
  getFinishTimes,
  getResults,
} from "./actions";

const formatMillisecondsToHHMM = (milliseconds: number) => {
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

export const handler = async (event: APIGatewayProxyEvent) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const { url, category } = event.queryStringParameters as {
    url: string;
    category: string;
  };

  const { eventClasses, checkpoints } = await getEventMetadata({ url });
  if (!eventClasses || !checkpoints) {
    return { statusCode: 500 };
  }
  const eventClass = eventClasses.find(
    (element) => element.classWithPrefix === category
  );

  if (!eventClass) {
    return { statusCode: 500 };
  }

  const racers = await getResults({
    gender: eventClass.gender == 1 ? "m" : "f",
    distance: eventClass.distance,
    url: url,
  });

  const finishTimes = await getFinishTimes({
    gender: eventClass.gender == 1 ? "m" : "f",
    distance: eventClass.distance,
    url: url,
  });

  const checkpointTimes = await getCheckPoints({
    gender: eventClass.gender == 1 ? "m" : "f",
    distance: eventClass.distance,
    url: url,
  });

  const finishTimeLookup = Object.fromEntries(
    finishTimes.map((e) => [e.eventClassRacerId, e.ts])
  );

  const calcRacers = racers.map((racer, i) => {
    const finishTime = finishTimeLookup[racer.id]
      ? finishTimeLookup[racer.id]
      : null;
    const totalTime = finishTime ? finishTime - racers[i].start : 0;

    return {
      ...racer,
      finishTime: finishTime,
      totalTime: finishTime ? finishTime - racers[i].start : null,
      timeFormattted: formatMillisecondsToHHMM(totalTime),
      checkpointTimes: checkpointTimes.filter((t) => t.bib === racer.bib),
    };
  });

  calcRacers.sort((a, b) => {
    if (a.finishTime === null && b.finishTime === null) {
      return 0;
    } else if (a.finishTime === null) {
      return 1; // Place null values at the end
    } else if (b.finishTime === null) {
      return -1; // Place null values at the end
    } else {
      return a.finishTime - b.finishTime;
    }
  });

  const requiredCheckPoints = checkpoints.filter((c) => c.required === true);

  const filterRacers = calcRacers.filter(
    (r) => r.checkpointTimes.length === requiredCheckPoints.length
  );

  const dnfRacers = calcRacers
    .filter(
      (r) =>
        r.checkpointTimes.length < requiredCheckPoints.length &&
        r.status !== "DNS"
    )
    .map((r) => Object.assign(r, { status: "DNF" }));

  const allRacers = filterRacers.concat(dnfRacers);

  const catRacers = allRacers.filter(
    (r) => r.classId === Number(eventClass.id)
  );

  return {
    statusCode: 200,

    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
    body: JSON.stringify(catRacers),
  };
};
