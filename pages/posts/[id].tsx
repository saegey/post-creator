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

// [
//   {
//     "time": 4850,
//     "elevation": 2126,
//     "distance": 39130.042,
//     "coordinates": [
//       -114.327928,
//       43.721769
//     ],
//     "grade": 0.0743
//   }
// ]
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
  const coordinates = JSON.parse(
    post.coordinates ? ((await uncompress(post.coordinates)) as string) : '{}'
  ) as Array<Array<number>>;

  const elevation = JSON.parse(
    post.elevation ? ((await uncompress(post.elevation)) as string) : '{}'
  ) as Array<number>;

  const distances = JSON.parse(
    post.distances ? ((await uncompress(post.distances)) as string) : '{}'
  ) as Array<number>;

  const grades = JSON.parse(
    post.elevationGrades
      ? ((await uncompress(post.elevationGrades)) as string)
      : '{}'
  );

  // console.log(grades);

  const activity =
    coordinates && coordinates.length > 0
      ? coordinates
          .map((_, i) => {
            if (i % 10 === 0) {
              return {
                t: i,
                e: elevation[i] ? Number(elevation[i]) : null,
                g: grades[i] ? Number(grades[i]) : null,
                d: distances[i] ? distances[i] : null,
                c: [coordinates[i][0], coordinates[i][1]],
              };
            }
          })
          .filter((notUndefined) => notUndefined !== undefined)
      : [];

  return {
    props: {
      id: post.id,
      components: JSON.parse(post.components),
      title: post.title,
      images: JSON.parse(post.images),
      postLocation: post.location,
      gpxFile: post.gpxFile,
      powerAnalysis: post.powerAnalysis ? JSON.parse(post.powerAnalysis) : {},
      activity,
    },
  };
}

const Post = ({
  signOut,
  user,
  renderedAt,
  powerAnalysis,
  components,
  activity,
  title,
  postLocation,
  gpxFile,
  id,
  images,
}) => {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div>
        <h1>Loading&hellip;</h1>
      </div>
    );
  }

  console.log(activity);

  return (
    <PostContextProvider
      value={{
        powerAnalysis,
        title,
        postLocation,
        id,
        gpxFile,
        activity,
        images,
      }}
    >
      <div>
        <Head>
          <title>{title}</title>
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
            <PostEditor initialState={components} />
          </div>
        </main>
      </div>
    </PostContextProvider>
  );
};

export default withAuthenticator(Post);
