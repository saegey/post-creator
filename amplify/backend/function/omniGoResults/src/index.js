/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const cheerio = require("cheerio");
const fetch = require("node-fetch");
const vm = require("node:vm");

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

const getEventMetadata = async ({ url }) => {
  const endpoint = new URL(url);
  let statusCode = 200;

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
    let body;
    let response;
    response = await fetch(endpoint, requestToBeSigned);
    body = await response.text();
    const $ = cheerio.load(body);
    const scripts = $('script:contains("EventClasses")').text();
    vm.createContext(context);
    vm.runInContext(scripts, context);
    return {
      eventClasses: context.OmniGo.event.EventClasses,
      checkpoints: context.OmniGo.event.checkpoints,
    };
  } catch (e) {
    console.log(e);
    return { error: true };
  }
};

const getResults = async ({ distance, gender }) => {
  // https://api.omnigoevents.com/events/bwr-bc-2023/times?distance=136.2&gender=f
  try {
    const res = await fetch(
      `https://api.omnigoevents.com/events/bwr-bc-2023/eventathletes?distance=${distance}&gender=${gender}&fields=id%2CclassId%2Cbib%2CfirstName%2ClastName%2Cteam%2Cadjustment%2CstartTs%2Cstart%2Cstatus`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        },
        body: null,
        method: "GET",
      }
    );
    const body = await res.json();
    return body;
  } catch (error) {
    console.log(error);
    return {
      error: true,
    };
  }
};

const getFinishTimes = async ({ gender, distance }) => {
  try {
    const res = await fetch(
      `https://api.omnigoevents.com/events/bwr-bc-2023/times?distance=${distance}&gender=${gender}`,
      {
        headers: {
          accept: "*/*",
          "accept-language": "en-US,en;q=0.9,it;q=0.8,fr;q=0.7",
          "if-none-match": 'W/"af1-9KvcJvlGSL5lH99yc9CyQnAOeCQ"',
          "sec-ch-ua":
            '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"macOS"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
          Referer: "https://www.omnigoevents.com/",
          "Referrer-Policy": "strict-origin-when-cross-origin",
        },
        body: null,
        method: "GET",
      }
    );
    // console.log(res);
    const body = await res.json();
    return body;
  } catch (error) {
    console.log(error);
    return { error: true };
  }
};

const getCheckPoints = async ({ gender, distance }) => {
  try {
    const res = await fetch(
      `https://api.omnigoevents.com/events/bwr-bc-2023/checkpointtimes?distance=${distance}gender=${gender}&asLap=true`,
      {
        headers: {
          accept: "*/*",
          "accept-language": "en-US,en;q=0.9,it;q=0.8,fr;q=0.7",
          "if-none-match": 'W/"1e62c-1kUruNMuMWNygFQRMQ9h23G2MKc"',
          "sec-ch-ua":
            '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"macOS"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
          Referer: "https://www.omnigoevents.com/",
          "Referrer-Policy": "strict-origin-when-cross-origin",
        },
        body: null,
        method: "GET",
      }
    );
    const body = await res.json();
    return body;
  } catch (error) {
    console.log(error);
    return { error: true };
  }
};

exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const { url, category } = event.queryStringParameters;

  const { eventClasses, checkpoints } = await getEventMetadata({ url });
  const eventClass = eventClasses.find(
    (element) => element.classWithPrefix === category
  );
  // console.log(eventClass);
  // const genderCode = eventClass.gender == 1 ? "m" : "f";
  const racers = await getResults({
    gender: eventClass.gender == 1 ? "m" : "f",
    distance: eventClass.distance,
  });

  const finishTimes = await getFinishTimes({
    gender: eventClass.gender == 1 ? "m" : "f",
    distance: eventClass.distance,
  });

  const checkpointTimes = await getCheckPoints({
    gender: eventClass.gender == 1 ? "m" : "f",
    distance: eventClass.distance,
  });
  // console.log(checkpointTimes);

  const finishTimeLookup = Object.fromEntries(
    finishTimes.map((e) => [e.eventClassRacerId, e.ts])
  );

  racers.map((racer, i) => {
    racers[i].finishTime = finishTimeLookup[racer.id]
      ? finishTimeLookup[racer.id]
      : null;
    racers[i].totalTime = racers[i].finishTime
      ? racers[i].finishTime - racers[i].start
      : null;
    racers[i].timeFormattted = formatMillisecondsToHHMM(racers[i].totalTime);
    racers[i].checkpointTimes = checkpointTimes.filter(
      (t) => t.bib === racer.bib
    );
  });
  // console.log(racers[0].finishTime);
  racers.sort((a, b) => {
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
  //

  const requiredCheckPoints = checkpoints.filter((c) => c.required === true);

  const filterRacers = racers.filter(
    (r) => r.checkpointTimes.length === requiredCheckPoints.length
  );

  const dnfRacers = racers.filter(
    (r) => r.checkpointTimes.length < requiredCheckPoints.length
  );
  filterRacers.concat(dnfRacers);
  // console.log(
  //   requiredCheckPoints.length,
  //   JSON.stringify(filterRacers.slice(0, 3))
  // );

  return {
    statusCode: 200,

    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
    body: JSON.stringify(filterRacers),
  };
};
