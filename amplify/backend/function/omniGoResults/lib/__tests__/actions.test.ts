import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import fs from "fs";
import path from "path";

import resultStub from "../stubs/results.json";
import categories from "../stubs/categories.json";
import finishTimes from "../stubs/finishTimes.json";
import checkpoints from "../stubs/checkpoints.json";
import {
  getEventMetadata,
  getResults,
  getFinishTimes,
  getCheckPoints,
} from "../actions";

const body = fs.readFileSync(
  path.resolve(__dirname, "stubs/body.html"),
  "utf8"
);

const server = setupServer(
  // Describe network behavior with request handlers.
  // Tip: move the handlers into their own module and
  // import it across your browser and Node.js setups!
  http.get(
    `https://api.omnigoevents.com/events/bwr-bc-2023/eventathletes`,
    ({ request, params, cookies }) => {
      return HttpResponse.json(resultStub);
    }
  ),

  http.get(
    `https://api.omnigoevents.com/events/bwr-bc-20231/eventathletes`,
    ({ request, params, cookies }) => {
      return HttpResponse.json({ message: "Event not found" });
    }
  ),

  http.get(
    `https://api.omnigoevents.com/events/bwr-bc-2023/times`,
    ({ request, params, cookies }) => {
      return HttpResponse.json(finishTimes);
    }
  ),

  http.get(
    `https://www.omnigoevents.com/events/bwr-bc-2023/results/`,
    ({ request, params, cookies }) => {
      return HttpResponse.text(body);
    }
  ),

  http.get(
    `https://api.omnigoevents.com/events/bwr-bc-2023/checkpointtimes`,
    ({ request, params, cookies }) => {
      return HttpResponse.json(checkpoints);
    }
  )
);

// Enable request interception.
beforeAll(() => server.listen());

// Reset handlers so that each test could alter them
// without affecting other, unrelated tests.
afterEach(() => server.resetHandlers());

// Don't forget to clean up afterwards.
afterAll(() => server.close());

describe("omnigo actions", () => {
  test("getEventMetadata", async () => {
    const res = await getEventMetadata({
      url: "https://www.omnigoevents.com/events/bwr-bc-2023/results/",
    });
    expect(res).toEqual(categories);
  });

  test("getResults when event is missing", async () => {
    const res = await getResults({
      distance: "136.20",
      gender: "m",
      url: "https://www.omnigoevents.com/events/bwr-bc-20231/results/",
    });
    expect(res).toEqual({ message: "Event not found" });
  });

  test("getResults is succesfull", async () => {
    const res = await getFinishTimes({
      distance: "136.20",
      gender: "m",
      url: "https://www.omnigoevents.com/events/bwr-bc-2023/results/",
    });

    expect(res).toEqual(finishTimes);
  });

  test("getCheckPoints", async () => {
    const res = await getCheckPoints({
      distance: "136.20",
      gender: "m",
      url: "https://www.omnigoevents.com/events/bwr-bc-2023/results/",
    });
    expect(res).toEqual(checkpoints);
  });

  expect;
});
