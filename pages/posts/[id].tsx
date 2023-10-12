import { withSSRContext } from 'aws-amplify';
import React from 'react';
import Head from 'next/head';
import { constructCloudinaryUrl } from '@cloudinary-util/url-loader';
import { withAuthenticator } from '@aws-amplify/ui-react';
// import { Amplify } from 'aws-amplify';

import { getPostInitial } from '../../src/graphql/customQueries';
import { getActivity } from '../../src/actions/PostGet';
import AuthCustom from '../../src/components/AuthCustom';
import PostView from '../../src/components/PostView';
import SlatePublish from '../../src/components/SlatePublish';

// import awsconfig from '../../src/aws-exports';

type ServerSideProps = {
  req: object;
  params: {
    id: string;
  };
};

// Amplify.configure({ ...awsconfig, ssr: true });

const cloudUrl = process.env['NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME'];

export const getServerSideProps = async ({ req, params }: ServerSideProps) => {
  const { API } = withSSRContext({ req });

  const { data } = await API.graphql({
    query: getPostInitial,
    authMode: 'AMAZON_COGNITO_USER_POOLS',
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

  const url = constructCloudinaryUrl({
    options: {
      src: JSON.parse(post.heroImage).public_id,
      width: 800,
      height: 600,
    },
    config: {
      cloud: {
        cloudName: cloudUrl,
      },
    },
  });

  const metaTags = {
    description: post.subhead ? post.subhead.split(0, 150) : '',
    'twitter:domain': 'mopd.us',
    'twitter:title': post.title,
    'twitter:description': post.subhead ? post.subhead.split(0, 150) : '',
    'twitter:url': `http://mopd.us/${post.shortUrl}`,
    'twitter:card': 'summary_large_image',
    'twitter:image': `${post.heroImage ? url : ''}`,
    'og:title': `${post.title}`,
    'og:description': post.subhead ? post.subhead.split(0, 150) : '',
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

const Publish = ({ post, activity, user }): JSX.Element => {
  const config = SlatePublish({ post, activity });
  const components = JSON.parse(post.components);
  // post.author = JSON.parse(post.author);
  // console.log(post.author);

  return (
    <AuthCustom>
      <Head>
        <title>{post.title}</title>
        <link
          rel='icon'
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>M</text></svg>"
        />
      </Head>
      <PostView
        components={components}
        config={config}
        post={post}
        user={user}
      />
    </AuthCustom>
  );
};

export default withAuthenticator(Publish);
