import React from "react";

import { PostContextType } from "../types/common";

const PostContext = React.createContext<PostContextType>({
  id: "",
  title: "",
  subhead: undefined,
  postLocation: undefined,
  activity: undefined,
  gpxFile: undefined,
  stravaUrl: undefined,
  date: undefined,
  components: [],
  images: [],
  currentFtp: undefined,
  resultsUrl: "",
  powerAnalysis: undefined,
  heartAnalysis: undefined,
  cadenceAnalysis: undefined,
  tempAnalysis: undefined,
  elevationTotal: undefined,
  normalizedPower: undefined,
  author: undefined,
  distance: undefined,
  elapsedTime: undefined,
  stoppedTime: undefined,
  timeInRed: undefined,
  powerZones: [],
  powerZoneBuckets: [],
  heroImage: undefined,
  shortUrl: undefined,
  __typename: "Post",
  // race results
  raceResults: undefined,
  webscorerResults: undefined,
  crossResults: undefined,
  omniResults: undefined,
  runSignupResults: undefined,
  timeSeriesFile: undefined,
  privacyStatus: "private",
  createdAt: "",
  elevations: undefined,

  setPost: () => {},
});

const usePost = () => React.useContext(PostContext);

export { PostContext, usePost };
