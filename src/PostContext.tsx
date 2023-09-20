import React from 'react';
// import React, { createContext, SetStateAction, useState, Dispatch } from 'react';
import { CloudinaryImage } from './components/AddImage';

export type PostContextType = {
  id: string;
  title: string | null;
  subhead: string | null;
  postLocation: string | null;
  activity: Array<{
    c: Array<number>;
    d: number;
    e: number;
    g: number;
    t: number;
  }> | null;
  gpxFile: string | null;
  stravaUrl: string | undefined;
  components: Array<{ type: string; children: Array<{ text: string }> }> | null;
  images: Array<CloudinaryImage> | null;
  heroImage: CloudinaryImage | undefined;
  currentFtp: string | null;
  resultsUrl: string | null;
  powerAnalysis: { entire: number } | null;
  heartAnalysis: { entire: number } | null;
  cadenceAnalysis: { entire: number } | null;
  tempAnalysis: { entire: number } | null;
  powerZones: Array<{
    powerLow: number;
    powerHigh: number;
    zone: number;
    title: string;
  }>;
  powerZoneBuckets: Array<number>;
  elevationTotal: number | null;
  normalizedPower: number | null;
  distance: number | null;
  elapsedTime: number | null;
  stoppedTime: number | null;
  timeInRed: number | null;
  date: string | null;
  shortUrl: string | null;
  setActivity: React.Dispatch<React.SetStateAction<object>>;
  setTitle: React.Dispatch<React.SetStateAction<string | null>>;
  setSubhead: React.Dispatch<React.SetStateAction<string | null>>;
  setGpxFile: React.Dispatch<React.SetStateAction<string>>;
  setPostLocation: React.Dispatch<React.SetStateAction<string | null>>;
  setId: React.Dispatch<React.SetStateAction<string>>;
  setStravaUrl: React.Dispatch<React.SetStateAction<string>>;
  setComponents: React.Dispatch<React.SetStateAction<Array<object>>>;
  setImages: React.Dispatch<
    React.SetStateAction<Array<CloudinaryImage> | null>
  >;
  setHeroImage: React.Dispatch<CloudinaryImage | undefined>;
  setCurrentFtp: React.Dispatch<React.SetStateAction<string>>;
  setResultsUrl: React.Dispatch<React.SetStateAction<string>>;
  setPowerAnalysis: React.Dispatch<
    React.SetStateAction<{
      entire: number;
    } | null>
  >;
  setHeartAnalysis: React.Dispatch<React.SetStateAction<string>>;
  setCadenceAnalysis: React.Dispatch<React.SetStateAction<string>>;
  setTempAnalysis: React.Dispatch<React.SetStateAction<string>>;
  setElevationTotal: React.Dispatch<React.SetStateAction<number>>;
  setNormalizedPower: React.Dispatch<React.SetStateAction<number>>;
  setDistance: React.Dispatch<React.SetStateAction<number>>;
  setElapsedTime: React.Dispatch<React.SetStateAction<number>>;
  setStoppedTime: React.Dispatch<React.SetStateAction<number>>;
  setTimeInRed: React.Dispatch<React.SetStateAction<number>>;
  setPowerZones: React.Dispatch<
    React.SetStateAction<
      Array<{
        powerLow: number;
        powerHigh: number;
        zone: number;
        title: string;
      }>
    >
  >;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  setPowerZoneBuckets: React.Dispatch<React.SetStateAction<Array<number>>>;
  setShortUrl: React.Dispatch<React.SetStateAction<string>>;
};

const PostContext = React.createContext<PostContextType>({
  id: '',
  title: '',
  subhead: '',
  postLocation: '',
  activity: [],
  gpxFile: '',
  stravaUrl: '',
  date: '',
  components: [],
  images: [],
  currentFtp: '',
  resultsUrl: '',
  powerAnalysis: null,
  heartAnalysis: null,
  cadenceAnalysis: null,
  tempAnalysis: null,
  elevationTotal: null,
  normalizedPower: null,
  distance: null,
  elapsedTime: null,
  stoppedTime: null,
  timeInRed: null,
  powerZones: [],
  powerZoneBuckets: [],
  heroImage: undefined,
  shortUrl: null,
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
});

export { PostContext };
