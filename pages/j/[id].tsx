import { withSSRContext } from 'aws-amplify';
import React from 'react';
import { Box, Container } from 'theme-ui';
import Head from 'next/head';
import { SlateToReact } from '@slate-serializers/react';

import HeaderPublic from '../../src/components/HeaderPublic';
import { getPostInitial } from '../../src/graphql/customQueries';
import { getActivity } from '../../src/actions/PostGet';
import SlatePublish from '../../src/components/SlatePublish';

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
    <>
      <Head>
        <title>Home</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Box
        as='main'
        sx={{
          marginBottom: 'auto',
        }}
      >
        <HeaderPublic />
        <Container
          as='article'
          className='article'
          sx={{
            '&.article>p+p': {
              paddingTop: '30px',
            },
            '&.article>h2+ul': {
              paddingTop: '30px',
            },
            '&.article>ul+h2': {
              paddingTop: '30px',
            },
            '&.article>ol+h2': {
              paddingTop: '30px',
            },
            '&.article>h2+ol': {
              paddingTop: '0px',
            },
            '&.article>p+h2': {
              paddingTop: '30px',
            },
          }}
        >
          <SlateToReact node={components} config={config} />
        </Container>
      </Box>
    </>
  );
};

export default Publish;
