import { withSSRContext } from 'aws-amplify';
import React from 'react';
import Head from 'next/head';
import { getCldOgImageUrl } from 'next-cloudinary';

import { getPostInitial } from '../../src/graphql/customQueries';
import { getActivity } from '../../src/actions/PostGet';
import AuthCustom from '../../src/components/AuthCustom';
import PostView from '../../src/components/PostView';
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

  const url = getCldOgImageUrl({
    src: JSON.parse(post.heroImage).public_id,
  });

  const metaTags = {
    description: post.subhead.split(0, 150),
    'twitter:domain': 'mopd.us',
    'twitter:title': post.title,
    'twitter:description': post.subhead.split(0, 150),
    'twitter:url': `http://mopd.us/${post.shortUrl}`,
    'twitter:card': 'summary_large_image',
    'twitter:image': `${url}`,
    'og:title': `${post.title}`,
    'og:description': post.subhead.split(0, 150),
    'og:image': url,
    'og:type': 'article',
    'og:url': `http://mopd.us/${post.shortUrl}`,
    author: post.author ? post.author.fullName : 'unknown',
  };

  return {
    props: {
      post: post,
      activity: activity,
      metaTags,
    },
  };
};

const Publish = ({ post, activity }): JSX.Element => {
  const config = SlatePublish({ post, activity });
  const components = JSON.parse(post.components)

  return (
    <AuthCustom>
      <Head>
        <title>{post.title}</title>
        <link
          rel='icon'
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>M</text></svg>"
        />
      </Head>
      <PostView components={components} config={config} post={post} />
    </AuthCustom>
  );
};

export default Publish;
