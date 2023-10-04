import { withSSRContext } from 'aws-amplify';
import React from 'react';
import Head from 'next/head';
import { getCldOgImageUrl } from 'next-cloudinary';

import { getPostInitial } from '../../src/graphql/customQueries';
import { getActivity } from '../../src/actions/PostGet';
import AuthCustom from '../../src/components/AuthCustom';
import PostView from '../../src/components/PostView';
import SlatePublish from '../../src/components/SlatePublish';
import Seo from '../../src/components/seo';

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

  const url = getCldOgImageUrl({
    src: JSON.parse(post.heroImage).public_id,
  });

  return (
    <AuthCustom>
      <Head>
        <title>View Post - {post.title}</title>
        <meta
          property='twitter:title'
          name='twitter:title'
          content={post.title}
        />
        <meta
          property='twitter:description'
          name='twitter:description'
          content={post.subhead}
        />
        <meta
          property='twitter:url'
          name='twitter:url'
          content={`http://mopd.us/${post.shortUrl}`}
        />
        <meta
          property='twitter:card'
          name='twitter:card'
          content='summary_large_image'
        />
        <meta
          property='og:url'
          name='og:url'
          content={`http://mopd.us/${post.shortUrl}`}
        />
        <meta
          property='og:description'
          name='og:description'
          content={post.subhead}
        />
        <meta
          name='author'
          content={post.author ? post.author.fullName : 'unknown'}
        />
        <meta property='og:type' name='og:type' content='article' />

        <link
          rel='icon'
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>M</text></svg>"
        />
        <meta property='image' name='image' content={`${url}`} />
        <meta property='og:image' name='og:image' content={`${url}`} />
      </Head>
      <PostView components={components} config={config} post={post} />
    </AuthCustom>
  );
};

export default Publish;
