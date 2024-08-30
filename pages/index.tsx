import Head from "next/head";
import React from "react";
import { NextApiRequest } from "next";

import PostsAllUsers from "../src/components/posts/Explore/PostsAllUsers";
import { CloudinaryImage, IUser } from "../src/types/common";
import User from "../src/actions/User";
import Post from "../src/actions/PostExplore";

export const getServerSideProps = async ({ req }: { req: NextApiRequest }) => {
  const user = await User.getUser({ req });
  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return await Post.explore({ req, user });
};

type HomeProps = {
  signOut: () => void;
  user: IUser;
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
    privacyStatus: string;
  }>;
};

const Home = ({ posts = [], user }: HomeProps) => {
  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PostsAllUsers posts={posts} user={user} />
    </>
  );
};

export default Home;
