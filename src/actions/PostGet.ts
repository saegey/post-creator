import { GraphQLResult } from "@aws-amplify/api";
import { Storage, API, PubSub, Auth } from "aws-amplify";

import {
  ActivityItem,
  PostContextType,
  TimeSeriesDataType,
} from "../types/common";
import { GetPostInitialQuery, UpdatePostMutation } from "../API";
import { getPostInitial } from "../graphql/customQueries";
import { getActivityData } from "../../lib/editorApi";
import { usePost } from "../components/PostContext";

function isDefined<T>(argument: T | undefined): argument is T {
  return argument !== undefined;
}

const getActivity = async (post: TimeSeriesDataType) => {
  console.log(post);
  const coordinates = post.coordinates ? post.coordinates : [];
  const times = post.times ? post.times : [];
  if (!coordinates) {
    return undefined;
  }

  const coords = coordinates
    .map((_: [number, number, number], i: number) => {
      if (i % 1 === 0) {
        return {
          t: times[i],
          c: [coordinates[i][0], coordinates[i][1]],
        };
      }
    })
    .filter(isDefined);
  // console.log(coords);
  return coords;
};

const getPost = async (id: string, postCtx: PostContextType) => {
  const res = (await API.graphql({
    query: getPostInitial,
    authMode: "AMAZON_COGNITO_USER_POOLS",
    variables: {
      id: id,
    },
  })) as GraphQLResult<GetPostInitialQuery>;

  const post = res?.data?.getPost;

  if (!post || !post.timeSeriesFile) {
    throw new Error("Post is undefined");
  }
  const {
    setGpxFile,
    setElevationTotal,
    setDistance,
    setElapsedTime,
    setStoppedTime,
    setTimeSeriesFile,
    setNormalizedPower,
    setTempAnalysis,
    setHeartAnalysis,
    setCadenceAnalysis,
    setPowerZones,
    setPowerZoneBuckets,
    setTimeInRed,
    setElevations,
    setActivity,
  } = postCtx;

  setGpxFile && setGpxFile(post.gpxFile || "");
  setElevationTotal && setElevationTotal(post.elevationTotal);
  setDistance && setDistance(post.distance);
  setElapsedTime && setElapsedTime(post.elapsedTime);
  setStoppedTime && setStoppedTime(post.stoppedTime);
  setTimeSeriesFile && setTimeSeriesFile(post.timeSeriesFile);
  setNormalizedPower && setNormalizedPower(post.normalizedPower);
  setTempAnalysis &&
    setTempAnalysis(post.tempAnalysis ? JSON.parse(post.tempAnalysis) : {});
  setHeartAnalysis &&
    setHeartAnalysis(post.heartAnalysis ? JSON.parse(post.heartAnalysis) : {});
  setCadenceAnalysis &&
    setCadenceAnalysis(
      post.cadenceAnalysis ? JSON.parse(post.cadenceAnalysis) : {}
    );
  setPowerZones &&
    setPowerZones(post.powerZones ? JSON.parse(post.powerZones) : {});
  setPowerZoneBuckets &&
    setPowerZoneBuckets(
      post.powerZoneBuckets ? JSON.parse(post.powerZoneBuckets) : {}
    );
  setTimeInRed && setTimeInRed(post.timeInRed);

  const payload = await getActivityData(post.timeSeriesFile);
  if (!payload) {
    console.log("no data found for post");
    return;
  }
  console.log("payload:", payload);

  setElevations && setElevations(payload.elevation);
  setActivity &&
    setActivity(payload.activity?.map((item) => ({ ...item })) ?? []);
};

export { getActivity, getPost };
