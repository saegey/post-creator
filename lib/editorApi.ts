import { Storage } from "aws-amplify";

import { getActivity } from "../src/actions/PostGet";
import { TimeSeriesDataType } from "../src/types/common";

type StorageGetResult = {
  Body: Blob | Buffer;
  ContentType?: string;
  ContentLength?: number;
  LastModified?: Date;
  Metadata?: { [key: string]: string };
};

const getActivityData = async (timeSeriesFile: string | null | undefined) => {
  if (!timeSeriesFile) {
    return;
  }
  const result = (await Storage.get(timeSeriesFile, {
    download: true,
    level: "private",
  })) as unknown as StorageGetResult;

  const timeSeriesData = (await new Response(
    result.Body
  ).json()) as TimeSeriesDataType;

  const activity = await getActivity(timeSeriesData);
  const { powerAnalysis, powers, hearts, times, elevation } = timeSeriesData;

  return {
    powerAnalysis,
    powers,
    hearts,
    activity,
    times,
    elevation,
  };
};

export { getActivityData };
