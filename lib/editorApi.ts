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
  const { powerAnalysis, powers, hearts } = timeSeriesData;

  return {
    powerAnalysis,
    powers,
    hearts,
    activity,
  };
};

export { getActivityData };
