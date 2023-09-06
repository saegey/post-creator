import React from 'react';
// import React, { createContext, SetStateAction, useState, Dispatch } from 'react';
import { CloudinaryImage } from './components/AddImage';

export type PostContextType = {
  id: string;
  title: string | null;
  postLocation: string | null;
  activity: Array<{
    c: Array<number>;
    d: number;
    e: number;
    g: number;
    t: number;
  }> | null;
  gpxFile: string | null;
  stravaUrl: string | null;
  components: Array<object> | null;
  images: Array<CloudinaryImage> | null;
  currentFtp: string | null;
  resultsUrl: string | null;
  powerAnalysis: string | null;
  heartAnalysis: string | null;
  cadenceAnalysis: string | null;
  tempAnalysis: string | null;
  powerZones: string | null;
  powerZoneBuckets: string | null;
  elevationTotal: number | null;
  normalizedPower: number | null;
  distance: number | null;
  elapsedTime: number | null;
  stoppedTime: number | null;
  timeInRed: number | null;
  setActivity: React.Dispatch<React.SetStateAction<object>>;
  setTitle: React.Dispatch<React.SetStateAction<string | null>>;
  setGpxFile: React.Dispatch<React.SetStateAction<string>>;
  setPostLocation: React.Dispatch<React.SetStateAction<string | null>>;
  setId: React.Dispatch<React.SetStateAction<string>>;
  setStravaUrl: React.Dispatch<React.SetStateAction<string>>;
  setComponents: React.Dispatch<React.SetStateAction<Array<object>>>;
  setImages: React.Dispatch<
    React.SetStateAction<Array<CloudinaryImage> | null>
  >;
  setCurrentFtp: React.Dispatch<React.SetStateAction<string>>;
  setResultsUrl: React.Dispatch<React.SetStateAction<string>>;
  setPowerAnalysis: React.Dispatch<React.SetStateAction<string>>;
  setHeartAnalysis: React.Dispatch<React.SetStateAction<string>>;
  setCadenceAnalysis: React.Dispatch<React.SetStateAction<string>>;
  setTempAnalysis: React.Dispatch<React.SetStateAction<string>>;
  setElevationTotal: React.Dispatch<React.SetStateAction<number>>;
  setNormalizedPower: React.Dispatch<React.SetStateAction<number>>;
  setDistance: React.Dispatch<React.SetStateAction<number>>;
  setElapsedTime: React.Dispatch<React.SetStateAction<number>>;
  setStoppedTime: React.Dispatch<React.SetStateAction<number>>;
  setTimeInRed: React.Dispatch<React.SetStateAction<number>>;
  setPowerZones: React.Dispatch<React.SetStateAction<string>>;
  setPowerZoneBuckets: React.Dispatch<React.SetStateAction<string>>;
};

const PostContext = React.createContext<PostContextType>({
  id: '',
  title: '',
  postLocation: '',
  activity: [],
  gpxFile: '',
  stravaUrl: '',
  components: [],
  images: [],
  currentFtp: '',
  resultsUrl: '',
  powerAnalysis: '',
  heartAnalysis: '',
  cadenceAnalysis: '',
  tempAnalysis: '',
  elevationTotal: null,
  normalizedPower: null,
  distance: null,
  elapsedTime: null,
  stoppedTime: null,
  timeInRed: null,
  powerZones: '',
  powerZoneBuckets: '',
  setActivity: () => {},
  setTitle: () => {},
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
});

export { PostContext };
