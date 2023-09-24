import { withSSRContext } from 'aws-amplify';
import React from 'react';
import Head from 'next/head';
import {
  slateToReactConfig,
  type SlateToReactConfig,
} from '@slate-serializers/react';
import { CldImage } from 'next-cloudinary';
import PowerBreakdown from '../../src/components/TimePowerZones';

import dynamic from 'next/dynamic';
import { getPostInitial } from '../../src/graphql/customQueries';
import { getActivity } from '../../src/actions/PostGet';
import AuthCustom from '../../src/components/AuthCustom';
import PostView from '../../src/components/PostView';
import SlatePublish from '../../src/components/SlatePublish';

const VisualOverview = dynamic(import('../../src/components/VisualOverview'), {
  ssr: false,
}); // Async API cannot be server-side rendered

type ServerSideProps = {
  req: object;
  params: {
    id: string;
  };
};

export const getServerSideProps = async ({ req, params }: ServerSideProps) => {
  const SSR = withSSRContext({ req });

  const { data } = await SSR.API.graphql({
    query: getPostInitial,
    authMode: 'API_KEY',
    variables: {
      id: params.id,
    },
  });
  if (!data || !data.getPost) {
    console.error('faileed too get activity data');
    return;
  }
  const post = data.getPost;
  const activityString = await getActivity(post);

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

  return {
    props: {
      post: post,
      activity: activity,
    },
  };
};

const Publish = ({ post, activity }): JSX.Element => {
  const config = SlatePublish({ post, activity });
  const components = JSON.parse(post.components);
  return (
    <AuthCustom>
      <Head>
        <title>View Post</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <PostView components={components} config={config} post={post} />
    </AuthCustom>
  );
};

export default Publish;
