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
import { getActivity } from '../../src/actions/PostGet';

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

  return {
    props: {
      id: post.id,
      components: JSON.parse(post.components),
      title: post.title,
      images: JSON.parse(post.images),
      postLocation: post.postLocation,
      gpxFile: post.gpxFile,
      powerAnalysis: post.powerAnalysis ? JSON.parse(post.powerAnalysis) : {},
      activity: await getActivity(post),
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
