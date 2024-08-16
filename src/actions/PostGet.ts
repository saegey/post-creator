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
  const { setPost } = postCtx;

  const payload = await getActivityData(post.timeSeriesFile);
  if (!payload) {
    console.log("no data found for post");
    return;
  }
  console.log("payload:", payload);

  setPost({
    gpxFile: post.gpxFile,
    elevationTotal: post.elevationTotal,
    distance: post.distance,
    elapsedTime: post.elapsedTime,
    timeSeriesFile: post.timeSeriesFile,
    normalizedPower: post.normalizedPower,
    tempAnalysis: post.tempAnalysis ? JSON.parse(post.tempAnalysis) : {},
    heartAnalysis: post.heartAnalysis ? JSON.parse(post.heartAnalysis) : {},
    cadenceAnalysis: post.cadenceAnalysis
      ? JSON.parse(post.cadenceAnalysis)
      : {},
    powerZones: post.powerZones ? JSON.parse(post.powerZones) : {},
    powerZoneBuckets: post.powerZoneBuckets
      ? JSON.parse(post.powerZoneBuckets)
      : {},
    timeInRed: post.timeInRed,
    elevations: payload.elevation,
    activity: payload.activity?.map((item) => ({ ...item })) ?? [],
  });
};

export { getActivity, getPost };
