import { withAuthenticator } from '@aws-amplify/ui-react';
import Head from 'next/head';
import { Amplify, withSSRContext, API, Auth } from 'aws-amplify';
import { Grid, Box } from 'theme-ui';
import React from 'react';

import Header from '../../src/components/Header';
import { listPostsCustom } from '../../src/graphql/customQueries';
import { GetServerSidePropsContext } from 'next';
import awsconfig from '../../src/aws-exports';
import PostCard from '../../src/components/PostCard';
import AuthCustom from '../../src/components/AuthCustom';
import PostsAll from '../../src/components/PostsAll';
Amplify.configure({ ...awsconfig, ssr: true });

export type PostType = Array<{
  id: string;
  title: string;
  author: {
    fullName: string;
    username: string;
    image: string;
  };
}>;

const MyPosts = ({ signOut, user }) => {
  const [posts, setPosts] = React.useState<PostType>();

  const getData = async () => {
    const user = await Auth.currentAuthenticatedUser();
    const response: any = await API.graphql({
      query: listPostsCustom,
      authMode: 'API_KEY',
      variables: {
        filter: {
          postAuthorId: {
            eq: user.attributes.sub,
          },
        },
      },
    });
    // console.log('getData', JSON.stringify(response));
    return response.data.listPostsByCreatedAt.items.map((d) => {
      return { ...d, imagesObj: JSON.parse(d.images) };
    });
  };

  React.useEffect(() => {
    getData().then((d) => setPosts(d));
  }, []);

  return (
    <AuthCustom>
      <div>
        <Head>
          <title>My Posts</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <PostsAll posts={posts} />
      </div>
    </AuthCustom>
  );
};

export default MyPosts;
