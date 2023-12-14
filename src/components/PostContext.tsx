import React from "react";

import { ActivityItem, CustomElement, CloudinaryImage } from "../types/common";
import { WebscorerResultsRow } from "./posts/RaceResults/RaceResultsImport";

export type RaceResultRow = {
  selected:
    | {
        CatPlace: string;
        Name: string;
        Age: string;
        Time: string;
        Speed: string;
        GenderPlace: string;
        OverallPlace: string;
        Bib: string;
      }
    | undefined;
  results:
    | Array<{
        CatPlace: string;
        Name: string;
        Age: string;
        Time: string;
        Speed: string;
        GenderPlace: string;
        OverallPlace: string;
        Bib: string;
      }>
    | undefined;
};

export type WebscorerResultPreview = {
  selected: WebscorerResultsRow | undefined;
  results: Array<WebscorerResultsRow> | undefined;
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
}

export type CrossResultsPreviewType = {
  selected: CrossResultsPreviewRowType | undefined;
  results: Array<CrossResultsPreviewRowType> | undefined;
}

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
  resultsUrl?: string | null;
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
  raceResults?: RaceResultRow | undefined;
  webscorerResultPreview?: WebscorerResultPreview | undefined;
  crossResults?: CrossResultsPreviewType | undefined;
  timeSeriesFile?: string | undefined;
  privacyStatus?: string | undefined;
  createdAt?: string | undefined;
  // selection: [number, number] | undefined;
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
  setResultsUrl?: React.Dispatch<React.SetStateAction<string | undefined>>;
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
  setRaceResults?: React.Dispatch<
    React.SetStateAction<RaceResultRow | undefined>
  >;
  setWebscorerResultPreview?: React.Dispatch<
    React.SetStateAction<WebscorerResultPreview | undefined>
  >;
  setCrossResults?:  React.Dispatch<
    React.SetStateAction<CrossResultsPreviewType | undefined>
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
  resultsUrl: undefined,
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
  raceResults: undefined,
  webscorerResultPreview: undefined,
  crossResults: undefined,
  timeSeriesFile: undefined,
  privacyStatus: undefined,
  createdAt: undefined,
  // selection: undefined,
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
  setRaceResults: () => {},
  setWebscorerResultPreview: () => {},
  setCrossResults: () => {},
  setAuthor: () => {},
  setTimeSeriesFile: () => {},
  setPrivacyStatus: () => {},
  setCreatedAt: () => {},
  // setSelection: () => {},
  setPowers: () => {},
  setHearts: () => {},
});

export { PostContext };
