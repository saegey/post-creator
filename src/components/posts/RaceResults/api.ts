import { API } from "aws-amplify";

import {
  ApiRes,
  WebscorerRes,
  WebscorerResultPreview,
  CrossResultsPreviewRowType,
  CrossResultsPreviewType,
  OmniResultRowType,
  RaceResultRowType,
  RunSignupResultsType,
  RunSignupType,
} from "../../../types/common";

import { updatePost } from "../../../graphql/mutations";
import { RunSignupResultType } from "./RunSignup/RunSignupResultsPreview";

export const getWebScorerCategories = async ({ url }: { url: string }) => {
  const paramsRaw = `?${url.split("?")[1]}`;
  const searchParams = new URLSearchParams(paramsRaw);
  const apiName = "api12660653";
  const path = `/results/webscorer?raceId=${searchParams.get("raceid")}`;

  const response = (await API.get(apiName, path, { response: true })) as {
    data: {
      categories: Array<string>;
      name: string;
      date: string;
      city: string;
      stateOrProvince: string;
      sport: string;
    };
  };
  console.log(response);
  return response;
};

export const getWebscorerResults = async ({
  url,
  category,
}: {
  url: string;
  category: string;
}) => {
  const paramsRaw = `?${url.split("?")[1]}`;
  const searchParams = new URLSearchParams(paramsRaw);
  const path = `/results/webscorer/cat-results?raceId=${searchParams.get(
    "raceid"
  )}&category=${encodeURIComponent(category)}`;

  const res = (await API.get("api12660653", path, {
    response: true,
  })) as WebscorerRes;

  return res;
};

export const saveWebscorerResults = async ({
  webscorerResults,
  id,
  category,
  resultsUrl,
  eventName,
}: {
  webscorerResults?: WebscorerResultPreview;
  id?: string;
  category: string;
  resultsUrl: string;
  eventName: string;
}) => {
  try {
    const response = (await API.graphql({
      authMode: "AMAZON_COGNITO_USER_POOLS",
      query: updatePost,
      variables: {
        input: {
          webscorerResults: JSON.stringify({
            ...webscorerResults,
            category: category,
            eventName: eventName,
          }),
          resultsUrl: resultsUrl,
          raceResultsProvider: "webscorer",
          id: id,
        },
      },
    })) as { data: WebscorerResultPreview };
    return response;
  } catch (errors) {
    console.error(errors);
  }
};

export const getOmniResults = async ({
  url,
  category,
}: {
  url: string;
  category: string;
}) => {
  if (url === undefined || url === null) {
    throw Error("no race id provided");
  }

  const path = `/results/omnigo/cat-results?url=${encodeURIComponent(
    url
  )}&category=${encodeURIComponent(category)}`;

  const res = (await API.get("api12660653", path, {
    response: true,
  })) as {
    data: OmniResultRowType[];
  };

  return {
    ...res,
    data: res.data.filter((r) => r.status !== "DNS"),
  };
};

export const saveOmniResults = async ({
  omniResults,
  resultsUrl,
  category,
  id,
  eventName,
}: {
  omniResults: any;
  resultsUrl: string;
  category: string;
  id: string;
  eventName: string;
}) => {
  try {
    const response = await API.graphql({
      authMode: "AMAZON_COGNITO_USER_POOLS",
      query: updatePost,
      variables: {
        input: {
          omniResults: JSON.stringify({
            ...omniResults,
            category: category,
            eventName: eventName,
          }),
          raceResultsProvider: "omnigo",
          resultsUrl: resultsUrl,
          id: id,
        },
      },
    });
    return response;
  } catch (errors) {
    console.error(errors);
  }
};

export const getCategories = async ({ url }: { url: string }) => {
  const resultsUrl = new URL(url);

  const apiName = "api12660653";
  const path = `/raceresult?raceId=${resultsUrl.pathname.split("/")[1]}`;
  const myInit = {
    response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
  };
  // console.log(apiName, path);
  const response = (await API.get(apiName, path, myInit)) as {
    data: {
      filterValues: Array<{
        Type: number;
        Value: string;
        Values: Array<string>;
      }>;
      server: string;
      key: string;
      eventName: string;
    };
  };

  console.log(response);

  return response;
};

export const getResults = async ({
  category,
  division,
  server,
  url,
  key,
}: {
  category: string;
  division: string;
  server: string;
  url: string;
  key: string;
}) => {
  if (!category || !division || !server || !url || !key) {
    throw new Error("No category or division for results");
  }

  const raceId = new URL(url).pathname.split("/")[1];
  const path = `/raceresult/results?category=${encodeURIComponent(
    category
  )}&division=${encodeURIComponent(
    division
  )}&raceId=${raceId}&key=${key}&server=${server}`;

  const res = (await API.get("api12660653", path, {
    response: true,
  })) as ApiRes;

  const fields = res.data.list.Fields.map((f: { Label: string }) => f.Label);

  return res.data.data.map((d) => {
    const temp: Record<string, string> = {};

    d.map((column, i) => {
      const key = (
        fields[i - 1] ? fields[i - 1].replace(/\s+/g, "") : "missing"
      ) as string;
      temp[key] = column;
    });
    // console.log(temp);
    return temp;
  }) as Array<RaceResultRowType>;
};

export const saveMyRaceResults = async ({
  raceResults,
  id,
  resultsUrl,
  category,
  division,
}: {
  raceResults: any;
  id: string | undefined;
  resultsUrl: string;
  category: string;
  division: string;
}) => {
  try {
    const response = await API.graphql({
      authMode: "AMAZON_COGNITO_USER_POOLS",
      query: updatePost,
      variables: {
        input: {
          raceResults: JSON.stringify({
            ...raceResults,
            category: category,
            division: division,
          }),
          raceResultsProvider: "myraceresults",
          id: id,
          resultsUrl: resultsUrl,
        },
      },
    });
    return response;
  } catch (errors) {
    console.error(errors);
    throw Error("an error occured");
  }
};

export const getCrossResultsCategories = async ({ url }: { url: string }) => {
  // https://www.crossresults.com/race/12190#cat175293
  const raceId = new URL(url).pathname.split("/")[2];
  const path = `/results/crossresults?raceId=${raceId}`;
  const response = (await API.get("api12660653", path, {
    response: true,
  })) as { data: Array<CrossResultsPreviewRowType> };

  return response;
};

export const getCrossResults = async ({ url }: { url: string }) => {
  const raceId = new URL(url).pathname.split("/")[2];
  const path = `/results/crossresults?raceId=${raceId}`;

  const res = (await API.get("api12660653", path, {
    response: true,
  })) as { data: Array<CrossResultsPreviewRowType> };

  return res;
};

export const saveCrossResults = async ({
  crossResults,
  id,
  resultsUrl,
  category,
  eventName,
}: {
  crossResults?: CrossResultsPreviewType;
  id?: string;
  resultsUrl?: string;
  category: string;
  eventName?: string;
}) => {
  try {
    const response = await API.graphql({
      authMode: "AMAZON_COGNITO_USER_POOLS",
      query: updatePost,
      variables: {
        input: {
          crossResults: JSON.stringify({
            ...crossResults,
            category: category,
            eventName: eventName,
          }),
          raceResultsProvider: "crossresults",
          id: id,
          resultsUrl: resultsUrl,
        },
      },
    });
    return response;
  } catch (errors) {
    console.error(errors);
    throw new Error("an error occured");
  }
};

export const getOmniResultsCategories = async ({ url }: { url: string }) => {
  const apiUrl = `/results/omnigo?url=${url}`;

  const res = (await API.get("api12660653", apiUrl, {
    response: true,
  })) as {
    data: {
      eventClasses: Array<{ classWithPrefix: string }>;
      name: string;
      city: string;
      state: string;
    };
  };

  return res;
};

export const getRunSignupCategories = async ({ url }: { url: string }) => {
  if (url === undefined || url === null) {
    throw Error("no race id provided");
  }

  const res = (await API.get(
    "api12660653",
    `/results/runsignuCategories?url=${url}`,
    {
      response: true,
    }
  )) as {
    data: {
      categories: Array<{
        id: number;
        name: string;
        category: string;
        year: number;
      }>;
      eventName: string;
    };
  };

  return {
    ...res,
    data: res.data,
  };
};

export const getRunSignupResults = async ({
  url,
  category,
}: {
  url: string;
  category: number | undefined;
}) => {
  // const raceId = new URL(url).pathname.split("/")[2];
  const path = `/results/runsignup?url=${encodeURIComponent(
    url.split("#")[0]
  )}&category=${category}`;
  console.log(path);

  const res = (await API.get("api12660653", path, {
    response: true,
  })) as {
    data: RunSignupResultsType;
  };

  return res;
};

export const saveRequestProvider = async ({
  title,
  body,
}: {
  title: string;
  body: string;
}) => {
  // const raceId = new URL(url).pathname.split("/")[2];
  const path = `/request/results-provider/`;
  console.log(path);

  const res = (await API.post("api12660653", path, {
    body: {
      title: title,
      body: body,
    },
    response: true,
  })) as {
    data: any;
  };

  return res;
};

export const saveRunSignupResults = async ({
  results,
  id,
  category,
  resultsUrl,
  eventName,
  selected,
  categoryName,
}: {
  results?: RunSignupResultsType;
  id?: string;
  category?: number;
  resultsUrl: string;
  eventName: string;
  selected: RunSignupResultType | undefined;
  categoryName?: string;
}) => {
  try {
    const response = (await API.graphql({
      authMode: "AMAZON_COGNITO_USER_POOLS",
      query: updatePost,
      variables: {
        input: {
          runSignupResults: JSON.stringify({
            results: results,
            selected: selected,
            category: category,
            eventName: eventName,
            categoryName: categoryName,
          }),
          resultsUrl: resultsUrl,
          raceResultsProvider: "runSignup",
          id: id,
        },
      },
    })) as { data: RunSignupType };
    return response;
  } catch (errors) {
    console.error(errors);
  }
};
