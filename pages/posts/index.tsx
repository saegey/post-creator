import Head from "next/head";
import { Amplify } from "aws-amplify";
import React from "react";

import awsconfig from "../../src/aws-exports";
import PostsAll from "../../src/components/posts/View/PostsAll";
import { CloudinaryImage } from "../../src/types/common";
import { UserContext } from "../../src/components/UserContext";

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
  const { user } = React.useContext(UserContext);

  return (
    <>
      <Head>
        <title>My Posts</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user && <PostsAll user={user} />}
    </>
  );
};

export default MyPosts;
