import cheerio from "cheerio";
import vm from "node:vm";

type OmniContext = {
  OmniGo?: {
    event?: {
      EventClasses?: Array<{
        classWithPrefix: string;
        id: string;
        className: string;
        prefix: null;
        laps: number;
        distance: string; //"136.20",
        units: string; //"M",
        wave: number; // 2;
        listOrder: number; //10;
        startTS: string; // "2023-05-28T14:00:08.365Z";
        finalTS: null;
        gender: number; //0;
        Event: { id: string };
      }>;
      checkpoints?: Array<{
        id: string;
        name: string;
        distance: string; //"79.90",
        units: string; // M
        required: boolean;
        enabled: boolean;
        Event: { id: string };
      }>;
    };
  };
};

export const getEventMetadata = async ({ url }: { url: string }) => {
  const endpoint = new URL(url);
  const context: OmniContext = {};

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
      },
      // hostname: endpoint.host,
    });
    const body = await response.text();
    const $ = cheerio.load(body);
    const scripts = $('script:contains("EventClasses")').text();
    vm.createContext(context);
    vm.runInContext(scripts, context);

    return {
      eventClasses: context.OmniGo?.event?.EventClasses,
      checkpoints: context.OmniGo?.event?.checkpoints,
    };
  } catch (e) {
    console.log(e);
    return { error: true };
  }
};

export const getResults = async ({
  distance,
  gender,
  url,
}: {
  distance: string;
  gender: string;
  url: string;
}) => {
  // https://api.omnigoevents.com/events/bwr-bc-2023/times?distance=136.2&gender=f
  try {
    const eventSlug = new URL(url).pathname.split("/")[2];

    const res = await fetch(
      `https://api.omnigoevents.com/events/${eventSlug}/eventathletes?distance=${distance}&gender=${gender}&fields=id%2CclassId%2Cbib%2CfirstName%2ClastName%2Cteam%2Cadjustment%2CstartTs%2Cstart%2Cstatus`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        },
        body: null,
        method: "GET",
      }
    );
    const body = (await res.json()) as Array<{
      id: string;
      classId: number;
      firstName: string;
      lastName: string;
      bib: number;
      team: string;
      start: number;
      adjustment: null;
      status: "DNS" | "DNF" | null;
    }>;
    return body;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getFinishTimes = async ({
  gender,
  distance,
  url,
}: {
  gender: string;
  distance: string;
  url: string;
}) => {
  try {
    const eventSlug = new URL(url).pathname.split("/")[2];

    const res = await fetch(
      `https://api.omnigoevents.com/events/${eventSlug}/times?distance=${distance}&gender=${gender}`,
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

    const body = (await res.json()) as Array<{
      eventClassRacerId: string;
      ts: number;
    }>;
    return body;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getCheckPoints = async ({
  gender,
  distance,
  url,
}: {
  gender: string;
  distance: string;
  url: string;
}) => {
  try {
    const eventSlug = new URL(url).pathname.split("/")[2];

    const res = await fetch(
      `https://api.omnigoevents.com/events/${eventSlug}/checkpointtimes?distance=${distance}gender=${gender}&asLap=true`,
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
    const body = (await res.json()) as Array<{
      bib: number;
      eventCheckpointId: string;
      ts: number;
    }>;
    return body;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
