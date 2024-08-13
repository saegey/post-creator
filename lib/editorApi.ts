import { Storage } from "aws-amplify";

import { getActivity } from "../src/actions/PostGet";
import { TimeSeriesDataType } from "../src/types/common";

const getActivityData = async (timeSeriesFile: string | null | undefined) => {
  if (!timeSeriesFile) {
    return;
  }
  const result = await Storage.get(timeSeriesFile, {
    download: true,
    level: "private",
  });
  const timeSeriesData = (await new Response(
    result.Body
  ).json()) as TimeSeriesDataType;

  const activity = await getActivity(timeSeriesData);
  console.log(timeSeriesData);
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
