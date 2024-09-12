import Head from "next/head";
import React from "react";
import { NextApiRequest } from "next";
import Router from "next/router";

import PostsAllUsers from "../src/components/posts/Explore/PostsAllUsers";
import { CloudinaryImage, IUser } from "../src/types/common";
import User from "../src/actions/User";
import Post from "../src/actions/PostExplore";
import FavIcon from "../src/components/shared/FavIcon";

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

  return { props: {} };

  // return await Post.explore({ req, user });
};

const Home = () => {
  React.useEffect(() => {
    Router.push("/posts");
  }, []);

  return (
    <>
      <Head>
        <title>Monopad - Home</title>
        <FavIcon />
      </Head>
      {/* <PostsAllUsers posts={posts} user={user} /> */}
    </>
  );
};

export default Home;
