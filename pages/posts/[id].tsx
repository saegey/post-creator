import { withSSRContext, Storage } from 'aws-amplify';
import React from 'react';
import Head from 'next/head';
import { constructCloudinaryUrl } from '@cloudinary-util/url-loader';
import { withAuthenticator } from '@aws-amplify/ui-react';

import { getPublishedPost } from '../../src/graphql/customQueries';
import { getActivity, getPostQuery } from '../../src/actions/PostGet';
import AuthCustom from '../../src/components/AuthCustom';
import PostView from '../../src/components/PostView';
import SlatePublish from '../../src/components/SlatePublish';
import { getPost } from '../../src/graphql/queries';
import { PostContext } from '../../src/components/PostContext';

type ServerSideProps = {
  req: object;
  params: {
    id: string;
  };
};

const cloudUrl = process.env['NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME'];

export const getServerSideProps = async ({ req, params }: ServerSideProps) => {
  const { API } = withSSRContext({ req });

  let post;

  const { data } = await API.graphql({
    query: getPublishedPost,
    authMode: 'API_KEY',
    variables: {
      id: params.id,
    },
  });
  // let data = undefined;
  if (!data || !data.getPublishedPost) {
    // console.error('faileed too get activity data');
    const { data } = await API.graphql({
      query: getPost,
      authMode: 'AMAZON_COGNITO_USER_POOLS',
      variables: {
        id: params.id,
      },
    });
    console.log(data);
    post = data.getPost;
  } else {
    post = data.getPublishedPost;
  }
  console.log(post);

  post.author =
    post.__typename === 'PublishedPost' ? JSON.parse(post.author) : post.author;

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
    // author: post.author ? post.author.fullName : 'unknown',
  };

  return {
    props: {
      post: post,
      // activity: activity,
      metaTags,
    },
  };
};

const Publish = ({ post, user }): JSX.Element => {
  const config = SlatePublish({ post });
  const components = JSON.parse(post.components);
  // const { setActivity, activity } = React.useContext(PostContext);
  const [activity, setActivity] = React.useState([]);
  const [powerAnalysis, setPowerAnalysis] = React.useState();

  const getTimeSeriesFile = async (post) => {
    const result = await Storage.get(post.timeSeriesFile, {
      download: true,
      // customPrefix: {
      //   public: 'private/us-east-1:29b6299d-6fd7-44d5-a53e-2a94fdf5401d/',
      // },
      level: post.__typename === 'PublishedPost' ? 'public' : 'private',
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
      // console.log(e.powerAnalysis);
      setActivity(e);
    });
  }, []);

  return (
    <AuthCustom>
      <PostContext.Provider
        value={{ activity, setActivity, powerAnalysis, setPowerAnalysis }}
      >
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
      </PostContext.Provider>
    </AuthCustom>
  );
};

export default withAuthenticator(Publish);
