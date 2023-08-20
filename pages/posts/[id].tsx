import { withSSRContext } from 'aws-amplify';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { withAuthenticator } from '@aws-amplify/ui-react';
import React from 'react';

import { getPost } from '../../src/graphql/queries';
import { uncompress } from '../../src/utils/compress';
import Header from '../../src/components/Header';
import { PostContextProvider } from '../../src/PostContext';
import PostEditor from '../../src/components/PostEditor';

export async function getServerSideProps({ req, params }) {
  const SSR = withSSRContext({ req });

  const { data } = await SSR.API.graphql({
    query: getPost,
    authMode: 'API_KEY',
    variables: {
      id: params.id,
    },
  });

  const post = data.getPost;
  // const powersRaw = post.power
  //   ? ((await uncompress(post.powers)) as string)
  //   : '{}';
  const coordinatesRaw = post.coordinates
    ? ((await uncompress(post.coordinates)) as string)
    : '{}';
  const elevationRaw = post.elevation
    ? ((await uncompress(post.elevation)) as string)
    : '{}';

  // const powers = JSON.parse(powersRaw);
  const coordinates = JSON.parse(coordinatesRaw);
  const elevation = JSON.parse(elevationRaw);

  return {
    props: {
      post,
      powerAnalysis: post.powerAnalysis ? JSON.parse(post.powerAnalysis) : {},
      elevation: elevation ? elevation : [],
      coordinates: coordinates,
    },
  };
}

const Post = ({
  signOut,
  user,
  renderedAt,
  post,
  powerAnalysis,
  elevation,
  coordinates,
}) => {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div>
        <h1>Loading&hellip;</h1>
      </div>
    );
  }

  // const updateElevation = async (rawElevation) => {
  //   // setElevation(JSON.parse(await uncompress(d.data.getPost.elevation)));
  //   const elevation = await uncompress(rawElevation);

  //   const data = JSON.parse(elevation);
  //   // console.log('elevation', data);
  //   postContext.setElevation(data);
  // };

  // const updateCoordinates = async (rawCoordinates) => {
  //   const coordinatees = await uncompress(rawCoordinates);

  //   const data = JSON.parse(coordinatees);
  //   // console.log('coordinatees', data);
  //   postContext.setCoordinates(data);
  // };

  return (
    <PostContextProvider
      value={{
        powerAnalysis,
        elevation,
        coordinates,
        post,
      }}
    >
      <div>
        <Head>
          <title>{post.title}</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>

        <main>
          <Header user={user} signOut={signOut} />
          <div
            style={{
              marginTop: '60px',
              maxWidth: '900px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <PostEditor initialState={JSON.parse(post.components)} />
          </div>
        </main>
      </div>
    </PostContextProvider>
  );
};

export default withAuthenticator(Post);
