import React from "react";

import {
  ActivityItem,
  CustomElement,
  CloudinaryImage,
  WebscorerResultsRow,
} from "../types/common";

// {"missing":"2","CatPlace":"1","Name":"Stephen Mull","AgeSex":"40 M","Time":"4:04:57.1","Speed":"21.4 mph","SexPlace":"1","OverallPlace":"1","Bib":"2","Team":"Canyon"}
// 21.4 mph
// 4:04:57.1

export type RaceResultRowType = {
  CatPlace: string;
  AgeSex: string;
  Name: string;
  Age: string;
  Time: string;
  Speed: string;
  SexPlace: string;
  GenderPlace: string;
  OverallPlace: string;
  Bib: string;
  Team: string;
};

export type RaceResultRow = {
  selected: RaceResultRowType | undefined;
  results: Array<RaceResultRowType> | undefined;
  category: string;
  division: string;
  eventName: string;
};

export type WebscorerResultPreview = {
  selected: WebscorerResultsRow | undefined;
  results: Array<WebscorerResultsRow> | undefined;
  category: string;
  eventName: string;
};

export type CrossResultsPreviewRowType = {
  RaceName: string;
  RaceCategoryName: string;
  Place: number;
  FirstName: string;
  LastName: string;
  TeamName: string;
  RaceTime: string;
  IsDnf: number;
};

export type CrossResultsPreviewType = {
  selected: CrossResultsPreviewRowType | undefined;
  results: Array<CrossResultsPreviewRowType> | undefined;
  category?: string;
  eventName: string;
};

export type OmniResultRowType = {
  id: string;
  classId: number;
  firstName: string;
  lastName: string;
  bib: number;
  team: string;
  start: number;
  adjustment: string | null;
  status: string | null;
  finishTime: number;
  totalTime: number;
  timeFormattted: string;
  checkpointTimes: Array<{
    eventCheckpointId: string;
    bib: number;
    ts: number;
  }>;
};

export type OmniResultType = {
  selected: OmniResultRowType | undefined;
  results: Array<OmniResultRowType> | undefined;
  category: string;
  eventName: string;
};

export type Author = { fullName: string; image: string };

export type PostContextType = {
  id?: string | undefined;
  title?: string | undefined;
  subhead?: string | null;
  postLocation?: string | undefined;
  activity?: ActivityItem[] | undefined;
  gpxFile?: string | null;
  stravaUrl?: string | undefined;
  components?: Array<CustomElement> | null;
  author?: { fullName: string; image: string } | undefined;
  images?: Array<CloudinaryImage> | null;
  heroImage?: CloudinaryImage | undefined;
  currentFtp?: number | null;
  resultsUrl?: string;
  powerAnalysis?: Array<Record<number | string, number>> | undefined;
  heartAnalysis?: Array<Record<number | string, number>> | undefined;
  cadenceAnalysis?: Array<Record<number | string, number>> | undefined;
  tempAnalysis?: Array<Record<number | string, number>> | undefined;
  powerZones?: Array<{
    powerLow: number;
    powerHigh: number;
    zone: number;
    title: string;
  }>;
  powerZoneBuckets?: Array<number>;
  elevationTotal?: number | undefined;
  normalizedPower?: number | undefined;
  distance?: number | undefined;
  elapsedTime?: number | undefined;
  stoppedTime?: number | undefined;
  timeInRed?: number | undefined;
  date?: string | undefined;
  shortUrl?: string | undefined;

  // Race results
  raceResults?: RaceResultRow | undefined;
  webscorerResultPreview?: WebscorerResultPreview | undefined;
  crossResults?: CrossResultsPreviewType | undefined;
  omniResults?: OmniResultType | undefined;

  timeSeriesFile?: string | undefined;
  privacyStatus?: string | undefined;
  createdAt?: string | undefined;

  powers: Array<number> | undefined;
  hearts: Array<number> | undefined;
  setActivity?: React.Dispatch<
    React.SetStateAction<ActivityItem[] | undefined>
  >;
  setTitle?: React.Dispatch<React.SetStateAction<string | undefined>>;
  setSubhead?: React.Dispatch<React.SetStateAction<string | undefined>>;
  setGpxFile?: React.Dispatch<React.SetStateAction<string>>;
  setPostLocation?: React.Dispatch<React.SetStateAction<string | undefined>>;
  setId?: React.Dispatch<React.SetStateAction<string>>;
  setStravaUrl?: React.Dispatch<React.SetStateAction<string | undefined>>;
  setComponents?: React.Dispatch<
    React.SetStateAction<Array<CustomElement> | undefined>
  >;
  setImages?: React.Dispatch<
    React.SetStateAction<Array<CloudinaryImage> | undefined>
  >;
  setHeroImage?: React.Dispatch<CloudinaryImage | undefined>;
  setCurrentFtp?: React.Dispatch<React.SetStateAction<number | undefined>>;
  setResultsUrl?: React.Dispatch<React.SetStateAction<string>>;
  setPowerAnalysis?: React.Dispatch<
    React.SetStateAction<Array<Record<number | string, number>> | undefined>
  >;
  setHeartAnalysis?: React.Dispatch<
    React.SetStateAction<Array<Record<number | string, number>> | undefined>
  >;
  setCadenceAnalysis?: React.Dispatch<
    React.SetStateAction<Array<Record<number | string, number>> | undefined>
  >;
  setTempAnalysis?: React.Dispatch<
    React.SetStateAction<Array<Record<number | string, number>> | undefined>
  >;
  setElevationTotal?: React.Dispatch<React.SetStateAction<number | undefined>>;
  setNormalizedPower?: React.Dispatch<React.SetStateAction<number | undefined>>;
  setDistance?: React.Dispatch<React.SetStateAction<number | undefined>>;
  setElapsedTime?: React.Dispatch<React.SetStateAction<number | undefined>>;
  setStoppedTime?: React.Dispatch<React.SetStateAction<number | undefined>>;
  setTimeInRed?: React.Dispatch<React.SetStateAction<number | undefined>>;
  setPowerZones?: React.Dispatch<
    React.SetStateAction<
      Array<{
        powerLow: number;
        powerHigh: number;
        zone: number;
        title: string;
      }>
    >
  >;
  setDate?: React.Dispatch<React.SetStateAction<string | undefined>>;
  setPowerZoneBuckets?: React.Dispatch<React.SetStateAction<Array<number>>>;
  setShortUrl?: React.Dispatch<React.SetStateAction<string | undefined>>;

  // race results
  setRaceResults?: React.Dispatch<
    React.SetStateAction<RaceResultRow | undefined>
  >;
  setWebscorerResultPreview?: React.Dispatch<
    React.SetStateAction<WebscorerResultPreview | undefined>
  >;
  setCrossResults?: React.Dispatch<
    React.SetStateAction<CrossResultsPreviewType | undefined>
  >;
  setOmniResults?: React.Dispatch<
    React.SetStateAction<OmniResultType | undefined>
  >;

  setAuthor?: React.Dispatch<React.SetStateAction<Author | undefined>>;
  setTimeSeriesFile?: React.Dispatch<React.SetStateAction<string | undefined>>;
  setPrivacyStatus?: React.Dispatch<React.SetStateAction<string | undefined>>;
  setCreatedAt?: React.Dispatch<React.SetStateAction<string | undefined>>;
  // setSelection: React.Dispatch<
  //   React.SetStateAction<[number, number] | undefined>
  // >;
  setPowers: React.Dispatch<React.SetStateAction<Array<number> | undefined>>;
  setHearts: React.Dispatch<React.SetStateAction<Array<number> | undefined>>;
};

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

  // race results
  raceResults: undefined,
  webscorerResultPreview: undefined,
  crossResults: undefined,
  omniResults: undefined,

  timeSeriesFile: undefined,
  privacyStatus: undefined,
  createdAt: undefined,
  powers: undefined,
  hearts: undefined,

  setActivity: () => {},
  setTitle: () => {},
  setSubhead: () => {},
  setGpxFile: () => {},
  setPostLocation: () => {},
  setId: () => {},
  setStravaUrl: () => {},
  setComponents: () => {},
  setImages: () => {},
  setCurrentFtp: () => {},
  setResultsUrl: () => {},
  setPowerAnalysis: () => {},
  setHeartAnalysis: () => {},
  setElevationTotal: () => {},
  setNormalizedPower: () => {},
  setDistance: () => {},
  setElapsedTime: () => {},
  setStoppedTime: () => {},
  setTimeInRed: () => {},
  setCadenceAnalysis: () => {},
  setTempAnalysis: () => {},
  setPowerZones: () => {},
  setPowerZoneBuckets: () => {},
  setHeroImage: () => {},
  setDate: () => {},
  setShortUrl: () => {},
  // race results
  setRaceResults: () => {},
  setWebscorerResultPreview: () => {},
  setCrossResults: () => {},
  setOmniResults: () => {},

  setAuthor: () => {},
  setTimeSeriesFile: () => {},
  setPrivacyStatus: () => {},
  setCreatedAt: () => {},
  // setSelection: () => {},
  setPowers: () => {},
  setHearts: () => {},
});

export { PostContext };
