import { withSSRContext } from 'aws-amplify';
import Head from 'next/head';
import React from 'react';

import { listPostsCustom } from '../src/graphql/customQueries';
import { CloudinaryImage } from '../src/components/AddImage';
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
