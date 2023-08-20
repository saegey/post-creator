import React from 'react';

export const PostContext = React.createContext({
  post: {
    id: null,
  },
  title: '',
  powerAnalysis: '',
  elevation: '',
  coordinates: '',
  gpxFile: '',
  images: [],
  setImages: () => {},
  setCoordinates: () => {},
  setElevation: () => {},
  setTitle: () => {},
  setElevationAndCoordinates: () => {},
});

export const PostContextProvider = (props) => {
  // console.log(props);
  const setImages = (images) => {
    setState({ ...state, images: images });
  };

  const setCoordinates = (coordinates) => {
    // console.log('new coords', coordinates);
    setState({ ...state, coordinates: coordinates });
  };

  const setElevation = (elevation) => {
    console.log(state.elevation, elevation);
    setState({ ...state, elevation: elevation });
  };

  const setElevationAndCoordinates = (elevation, coordinates) => {
    setState({ ...state, elevation: elevation, coordinates: coordinates });
  };

  const setTitle = (title) => {
    setState({ ...state, title: title });
    // console.log('state', state, title);
  };

  const setGpxFile = (gpxFile) => {
    setState({ ...state, gpxFile: gpxFile });
  };

  const initState = {
    powerAnalysis: props.value.powerAnalysis,
    elevation: props.value.elevation,
    coordinates: props.value.coordinates,
    post: props.value.post,
    title: props.value.post.title,
    gpxFile: props.value.post.gpxFile,
    images: JSON.parse(props.value.post.images),
    setElevation: setElevation,
    setImages: setImages,
    setCoordinates: setCoordinates,
    setTitle: setTitle,
    setGpxFile: setGpxFile,
    setElevationAndCoordinates: setElevationAndCoordinates,
  };

  const [state, setState] = React.useState(initState);

  return (
    <PostContext.Provider value={state}>{props.children}</PostContext.Provider>
  );
};
