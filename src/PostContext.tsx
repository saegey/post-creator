'use client'; // This is a client component 👈🏽

import React from 'react';

export const PostContext = React.createContext({
  id: '',
  title: '',
  powerAnalysis: '',
  elevation: '',
  coordinates: '',
  gpxFile: '',
  images: [],
  postLocation: '',
  images: [],
  activity: null,
  stravaUrl: '',
  resultsUrl: '',
  setImages: (images: any) => {},
  setTitle: (arg: string) => {},
  setActivity: (arg: object) => {},
  setPostLocation: (arg: string) => {},
  setActivityAndGpx: (arg: string, arg1: string) => {},
  setStravaUrlAndResultsUrl: (arg: string, arg1: string) => {},
});

export const PostContextProvider = (props) => {
  // console.log(props);
  const setImages = (images) => {
    setState({ ...state, images: images });
  };

  const setTitle = (title) => {
    setState({ ...state, title: title });
    // console.log('state', state, title);
  };

  const setPostLocation = (postLocation) => {
    setState({ ...state, postLocation: postLocation });
    // console.log('postLocation', postLocation);
  };

  const setActivity = (gpxFile) => {
    setState({ ...state, gpxFile: gpxFile });
  };

  const setActivityAndGpx = (activity, gpxFile) => {
    setState({ ...state, activity: activity, gpxFile: gpxFile });
    // console.log('state', state);
  };

  const setStravaUrl = (stravaUrl) => {
    // console.log(stravaUrl);
    setState({ ...state, stravaUrl: stravaUrl });
  };

  const setStravaUrlAndResultsUrl = (stravaUrl, resultsUrl) => {
    setState({ ...state, stravaUrl: stravaUrl, resultsUrl: resultsUrl });
    console.log(stravaUrl, resultsUrl);
  };

  const setResultsUrl = (resultsUrl) => {
    // console.log(stravaUrl);
    setState({ ...state, resultsUrl: resultsUrl });
  };

  const initState = {
    id: props.value.id,
    powerAnalysis: props.value.powerAnalysis,
    activity: props.value.activity,
    title: props.value.title,
    gpxFile: props.value.gpxFile,
    images: props.value.images,
    postLocation: props.value.postLocation,
    stravaUrl: props.value.stravaUrl,
    resultsUrl: props.value.resultsUrl,
    setImages: setImages,
    setTitle: setTitle,
    setActivityAndGpx: setActivityAndGpx,
    setActivity: setActivity,
    setPostLocation: setPostLocation,
    setStravaUrl: setStravaUrl,
    setResultsUrl: setResultsUrl,
    setStravaUrlAndResultsUrl: setStravaUrlAndResultsUrl,
  };

  const [state, setState] = React.useState(initState);

  return (
    <PostContext.Provider value={state}>{props.children}</PostContext.Provider>
  );
};
