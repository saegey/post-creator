import { withAuthenticator } from '@aws-amplify/ui-react';
import { withSSRContext, API } from 'aws-amplify';
import Head from 'next/head';
import { Button, Box, Grid, Link as ThemeLink, Flex, Text } from 'theme-ui';
import React from 'react';
import Link from 'next/link';
import { CldImage } from 'next-cloudinary';

import { listPostsCustom } from '../src/graphql/customQueries';
import Header from '../src/components/Header';
import CreatePostModal from '../src/components/CreatePostModal';
import { CloudinaryImage } from '../src/components/AddImage';
import PostCard from '../src/components/PostCard';
import AuthCustom from '../src/components/AuthCustom';
import PostsAllUsers from '../src/components/PostsAllUsers';

type ListPosts = {
  data: {
    listPostsByCreatedAt: {
      items: Array<{
        id: string;
        title: string;
        images: string;
      }>;
    };
  };
};

export const getServerSideProps = async ({ req }) => {
  const SSR = withSSRContext({ req });

  try {
    const response: ListPosts = await SSR.API.graphql({
      query: listPostsCustom,
      authMode: 'API_KEY',
    });

    return {
      props: {
        posts: response.data.listPostsByCreatedAt.items.map((d) => {
          return { ...d, imagesObj: JSON.parse(d.images) };
        }),
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {},
    };
  }
};

type HomeProps = {
  signOut: () => {};
  user: object;
  posts: Array<{
    id: string;
    title: string;
    images: string;
    imagesObj: Array<CloudinaryImage>;
    author: {
      fullName: string;
      username: string;
      image: string;
    };
  }>;
};

const Home = ({ signOut, user, posts = [] }: HomeProps) => {
  return (
    <AuthCustom>
      <>
        <Head>
          <title>Home</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <PostsAllUsers posts={posts} />
      </>
    </AuthCustom>
  );
};

export default Home;
