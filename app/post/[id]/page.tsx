'use client'; // This is a client component 👈🏽

import { withSSRContext, Amplify, API } from 'aws-amplify';
import Head from 'next/head';
// import { useRouter } from 'next/router';
import { withAuthenticator } from '@aws-amplify/ui-react';
import React from 'react';
// import { headers } from 'next/headers';

import { getPost } from '../../../src/graphql/queries';
import { uncompress } from '../../../src/utils/compress';
import { PostContextProvider } from '../../../src/PostContext';
import PostEditor from '../../../src/components/PostEditor';
import awsExports from '../../../src/aws-exports';
import Header from '../../../src/components/Header';

Amplify.configure({ ...awsExports, ssr: true });

const getData = async (id) => {
  const SSR = withSSRContext();
  const data = await SSR.API.graphql({
    query: getPost,
    authMode: 'API_KEY',
    variables: {
      id: id,
    },
  });
  // console.log(data.data.getPost.coordinates);

  const coordinatesRaw = await uncompress(data.data.getPost.coordinates);
  const coordinates = JSON.parse(coordinatesRaw);

  const elevationRaw = await uncompress(data.data.getPost.elevation);

  const elevation = JSON.parse(elevationRaw);

  const distancesRaw = await uncompress(data.data.getPost.distances);
  const distances = JSON.parse(distancesRaw);

  const gradesRaw = await uncompress(data.data.getPost.elevationGrades);
  const grades = JSON.parse(gradesRaw);

  const activity =
    coordinates && coordinates.length > 0
      ? coordinates
          .map((_, i) => {
            if (i % 10 === 0) {
              return {
                t: i,
                e: elevation[i] ? Number(elevation[i]) : null,
                g: grades[i] ? Number(grades[i]) : null,
                d: distances[i] ? distances[i] : distances[i - 1],
                c: [coordinates[i][0], coordinates[i][1]],
              };
            }
          })
          .filter((notUndefined) => notUndefined !== undefined)
      : [];

  return {
    // id: post.id,
    components: JSON.parse(data.data.getPost.components),
    title: data.data.getPost.title,
    images: JSON.parse(data.data.getPost.images),
    postLocation: data.data.getPost.location,
    gpxFile: data.data.getPost.gpxFile,
    powerAnalysis: data.data.getPost.powerAnalysis
      ? JSON.parse(data.data.getPost.powerAnalysis)
      : {},
    activity,
  };
};

const Page = ({ user, signOut, params }: { params: { id: string } }) => {
  const [pageData, setPageData] = React.useState();

  React.useEffect(() => {
    getData(params.id).then((d) => {
      setPageData(d);
    });
  }, []);

  if (!pageData) {
    return (
      <>
        <h1>this is a poost{JSON.stringify(user.username)}</h1>
        <p>this is sme texst</p>
      </>
    );
  }

  // return <h1>fuck</h1>

  return (
    <PostContextProvider
      value={{
        powerAnalysis: pageData.powerAnalysis,
        title: pageData.title,
        postLocation: pageData.postLocation,
        id: pageData.id,
        gpxFile: pageData.gpxFile,
        activity: pageData.activity,
        images: pageData.images,
      }}
    >
      <Header user={user} signOut={signOut} />
      <div
        style={{
          marginTop: '60px',
          maxWidth: '900px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <PostEditor initialState={pageData.components} />
      </div>
    </PostContextProvider>
  );
};

// export default Page;

export default withAuthenticator(Page);
