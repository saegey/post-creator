import { handler } from "./index";
import {
  getEventMetadata,
  getResults,
  getFinishTimes,
  getCheckPoints,
} from "./actions";

jest.mock("./actions.ts", () => ({
  ...jest.requireActual("./actions.ts"),
  getResults: jest.fn().mockResolvedValue([
    {
      id: "05ee70a9-fae3-4dbe-b4e6-29068cd82257",
      classId: 5342,
      firstName: "James",
      lastName: "Agate",
      bib: 180,
      team: "54Blue cycling club",
      startTs: 0,
      start: 1685282408365,
      adjustment: null,
      status: null,
    },
    {
      id: "3d665884-302d-473f-81d6-5dcffe0afb83",
      classId: 5342,
      firstName: "Giovanni",
      lastName: "Alfano",
      bib: 181,
      team: "jubilee Racing",
      startTs: 0,
      start: 1685282408365,
      adjustment: null,
      status: null,
    },
  ]),
  getEventMetadata: jest.fn().mockResolvedValue({
    eventClasses: [
      {
        classWithPrefix: "Waffle: Pro Women",
        id: "5342",
        className: "Waffle: Pro Women",
        prefix: null,
        laps: 6,
        distance: "136.20",
        units: "M",
        wave: 2,
        listOrder: 10,
        startTS: "2023-05-28T14:00:08.365Z",
        finalTS: null,
        gender: 0,
        Event: { id: "3fcae798-3dfd-4a78-afed-a28bea41f686" },
      },
    ],
    checkpoints: [
      {
        id: "0429019d-6634-4e02-8281-1a406a5e4106",
        name: "Southern Loop",
        distance: "79.90",
        units: "M",
        options: {
          lap: 3,
          asLap: true,
        },
        required: true,
        enabled: true,
        Event: { id: "3fcae798-3dfd-4a78-afed-a28bea41f686" },
      },
      {
        id: "01adb4f1-fc6b-48f4-8bb4-d02cd0ad0520",
        name: "Double D",
        distance: "17.90",
        units: "M",
        options: {
          lap: 1,
          asLap: true,
        },
        required: true,
        enabled: true,
        Event: { id: "3fcae798-3dfd-4a78-afed-a28bea41f686" },
      },
    ],
  }),
  getFinishTimes: jest.fn().mockResolvedValue([
    {
      eventClassRacerId: "05ee70a9-fae3-4dbe-b4e6-29068cd82257",
      ts: 1685308039542,
    },
    {
      eventClassRacerId: "3d665884-302d-473f-81d6-5dcffe0afb83",
      ts: 1685309848108,
    },
  ]),
  getCheckPoints: jest.fn().mockResolvedValueOnce([
    {
      bib: 180,
      eventCheckpointId: "0429019d-6634-4e02-8281-1a406a5e4106",
      ts: 1685332705411,
    },
    {
      bib: 180,
      eventCheckpointId: "01adb4f1-fc6b-48f4-8bb4-d02cd0ad0520",
      ts: 1685331679518,
    },
    {
      bib: 181,
      eventCheckpointId: "01adb4f1-fc6b-48f4-8bb4-d02cd0ad0520",
      ts: 1685331679518,
    },
  ]),
}));

describe("index", () => {
  test("handler returns results", async () => {
    // Mock the APIGatewayProxyEvent
    const mockEvent: any = {
      body: "", // Mimic the event body
      queryStringParameters: {
        url: "https://www.omnigoevents.com/events/bwr-bc-2023/results/",
        category: "Waffle: Pro Women",
      }, // Mimic any other properties needed
      // Add other properties as needed based on your function's requirements
    };
    const res = await handler(mockEvent);
    expect(res.statusCode).toEqual(200);
    expect(res.headers).toEqual({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    });
    expect(JSON.parse(res && res.body ? res.body : "")).toEqual([
      {
        adjustment: null,
        bib: 180,
        checkpointTimes: [
          {
            bib: 180,
            eventCheckpointId: "0429019d-6634-4e02-8281-1a406a5e4106",
            ts: 1685332705411,
          },
          {
            bib: 180,
            eventCheckpointId: "01adb4f1-fc6b-48f4-8bb4-d02cd0ad0520",
            ts: 1685331679518,
          },
        ],
        classId: 5342,
        finishTime: 1685308039542,
        firstName: "James",
        id: "05ee70a9-fae3-4dbe-b4e6-29068cd82257",
        lastName: "Agate",
        start: 1685282408365,
        startTs: 0,
        status: null,
        team: "54Blue cycling club",
        timeFormattted: "7:07:11",
        totalTime: 25631177,
      },
      {
        adjustment: null,
        bib: 181,
        checkpointTimes: [
          {
            bib: 181,
            eventCheckpointId: "01adb4f1-fc6b-48f4-8bb4-d02cd0ad0520",
            ts: 1685331679518,
          },
        ],
        classId: 5342,
        finishTime: 1685309848108,
        firstName: "Giovanni",
        id: "3d665884-302d-473f-81d6-5dcffe0afb83",
        lastName: "Alfano",
        start: 1685282408365,
        startTs: 0,
        status: "DNF",
        team: "jubilee Racing",
        timeFormattted: "7:37:19",
        totalTime: 27439743,
      },
    ]);

    expect(getEventMetadata).toHaveBeenLastCalledWith({
      url: "https://www.omnigoevents.com/events/bwr-bc-2023/results/",
    });
    expect(getResults).toHaveBeenCalledWith({
      distance: "136.20",
      gender: "f",
      url: "https://www.omnigoevents.com/events/bwr-bc-2023/results/",
    });
    expect(getCheckPoints).toHaveBeenCalledWith({
      distance: "136.20",
      gender: "f",
      url: "https://www.omnigoevents.com/events/bwr-bc-2023/results/",
    });
    expect(getFinishTimes).toHaveBeenCalledWith({
      distance: "136.20",
      gender: "f",
      url: "https://www.omnigoevents.com/events/bwr-bc-2023/results/",
    });
  });
});
