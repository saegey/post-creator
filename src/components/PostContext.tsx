import React from "react";

import { PostContextType } from "../types/common";

const PostContext = React.createContext<PostContextType>({
  id: "",
  title: "",
  subhead: null,
  postLocation: null,
  activity: null,
  gpxFile: null,
  stravaUrl: null,
  date: null,
  components: [],
  images: [],
  currentFtp: null,
  resultsUrl: "",
  powerAnalysis: null,
  heartAnalysis: null,
  cadenceAnalysis: null,
  tempAnalysis: null,
  elevationTotal: null,
  normalizedPower: null,
  author: null,
  distance: null,
  elapsedTime: null,
  stoppedTime: null,
  timeInRed: null,
  powerZones: [],
  powerZoneBuckets: [],
  heroImage: null,
  shortUrl: null,
  __typename: "Post",
  // race results
  raceResults: null,
  webscorerResults: null,
  crossResults: null,
  omniResults: null,
  runSignupResults: null,
  timeSeriesFile: null,
  privacyStatus: "private",
  createdAt: "",
  elevations: null,

  setPost: () => {},
});

const usePost = () => React.useContext(PostContext);

export { PostContext, usePost };
