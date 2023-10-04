import { withSSRContext } from 'aws-amplify';
import React from 'react';
import { Box, Container } from 'theme-ui';
import Head from 'next/head';
import { SlateToReact } from '@slate-serializers/react';
import { getCldOgImageUrl } from 'next-cloudinary';

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
  const url = getCldOgImageUrl({
    src: JSON.parse(post.heroImage).public_id,
  });

  const components = JSON.parse(post.components);
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name='description' content={post.subhead} />
        <meta property='twitter:domain' content={`mopd.us`} />
        <meta name='twitter:title' content={post.title} />
        <meta name='twitter:description' content={post.subhead} />
        <meta
          property='twitter:url'
          content={`http://mopd.us/${post.shortUrl}`}
        />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:image' content={`${url}`} />

        <meta property='og:url' content={`http://mopd.us/${post.shortUrl}`} />
        <meta property='og:type' content='article' />
        <meta property='og:description' content={post.subhead} />
        <meta property='og:image' content={`${url}`} />
        <meta
          name='author'
          content={post.author ? post.author.fullName : 'unknown'}
        />

        <link
          rel='icon'
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>M</text></svg>"
        />

        {/* <meta property='og:image' name='og:image' content={`${url}`} /> */}
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
