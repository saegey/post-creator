import { withSSRContext, Storage } from 'aws-amplify';
import React from 'react';
import Head from 'next/head';

import { getPublishedPost } from '../../src/graphql/customQueries';
import { getActivity } from '../../src/actions/PostGet';
import SlatePublish from '../../src/components/SlatePublish';
import dynamic from 'next/dynamic';
import { PostContext } from '../../src/components/PostContext';
import { generate as generateMetaTags } from '../../src/utils/metaTags';

const PostView = dynamic(import('../../src/components/PostView'), {
  ssr: false,
});

type ServerSideProps = {
  req: object;
  params: {
    id: string;
  };
};

export const getServerSideProps = async ({ req, params }: ServerSideProps) => {
  const SSR = withSSRContext({ req });

  const { data } = await SSR.API.graphql({
    query: getPublishedPost,
    authMode: 'API_KEY',
    variables: {
      id: params.id,
    },
  });

  if (!data || !data.getPublishedPost) {
    console.error('faileed too get activity data');
    return;
  }
  const post = data.getPublishedPost;

  post.author =
    typeof post.author === 'string' ? JSON.parse(post.author) : post.author;

  return {
    props: {
      post,
      metaTags: generateMetaTags({ post }),
    },
  };
};

const Publish = ({ post }): JSX.Element => {
  const config = SlatePublish({ post });
  const components = JSON.parse(post.components);

  const [activity, setActivity] = React.useState([]);
  const [powerAnalysis, setPowerAnalysis] = React.useState();

  const getTimeSeriesFile = async (post) => {
    const result = await Storage.get(post.timeSeriesFile, {
      download: true,
      // customPrefix: {
      //   public: 'private/us-east-1:29b6299d-6fd7-44d5-a53e-2a94fdf5401d/',
      // },
      level: 'public',
    });
    const timeSeriesData = await new Response(result.Body).json();
    setPowerAnalysis(timeSeriesData.powerAnalysis);

    const activityString = await getActivity(timeSeriesData);

    const activity = activityString.map((a, i) => {
      return {
        ...a,
        g: a?.g !== null ? a?.g : 0,
        d:
          a?.d === 0
            ? activityString[i - 1]
              ? activityString[i - 1]?.d
              : 0
            : a?.d,
      };
    });

    return activity;
  };

  React.useEffect(() => {
    getTimeSeriesFile(post).then((e) => {
      setActivity(e);
    });
  }, []);

  return (
    <>
      <PostContext.Provider
        value={{
          activity,
          setActivity,
          powerAnalysis,
          setPowerAnalysis,
        }}
      >
        <Head>
          <title>{post.title}</title>
          <link
            rel='icon'
            href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>M</text></svg>"
          />
        </Head>
        <PostView components={components} config={config} post={post} />
      </PostContext.Provider>
    </>
  );
};

export default Publish;
