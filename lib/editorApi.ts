import React from "react";
import { Storage } from "aws-amplify";

import { PostContext } from "../src/components/PostContext";
import { getActivity } from "../src/actions/PostGet";
import { TimeSeriesDataType } from "../src/types/common";

const getActivityData = async () => {
  const {
    timeSeriesFile,
    setPowerAnalysis,
    setPowers,
    setHearts,
    setActivity,
  } = React.useContext(PostContext);

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

  setPowerAnalysis && setPowerAnalysis(timeSeriesData.powerAnalysis);
  setPowers && setPowers(timeSeriesData.powers);
  setHearts && setHearts(timeSeriesData.hearts);
  setActivity && setActivity(activity);

  // return activity;
};

export { getActivityData };
