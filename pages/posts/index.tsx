import Head from 'next/head';
import { Amplify } from 'aws-amplify';
import React from 'react';

import awsconfig from '../../src/aws-exports';
import PostsAll from '../../src/components/PostsAll';
import AuthCustom from '../../src/components/AuthCustom';
import { CloudinaryImage } from '../../src/components/AddImage';

Amplify.configure({ ...awsconfig, ssr: true });

export type PostType = Array<{
  id: string;
  title: string;
  author: {
    fullName: string;
    username: string;
    image: string;
  };
  privacyStatus?: string;
  imagesObj: Array<CloudinaryImage>;
}>;

const MyPosts = () => {
  return (
    <AuthCustom>
      <div>
        <Head>
          <title>My Posts</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <PostsAll view='my' />
      </div>
    </AuthCustom>
  );
};

export default MyPosts;
