import { withSSRContext } from "aws-amplify";
import Head from "next/head";
import React from "react";
import { NextApiRequest } from "next";
import { GraphQLResult } from "@aws-amplify/api";
import Router from "next/router";

import { listPostsCustom } from "../src/graphql/customQueries";
import PostsAllUsers from "../src/components/posts/Explore/PostsAllUsers";
import { ListPostsCustom } from "../src/API";
import { CognitoUserExt, CloudinaryImage, IUser } from "../src/types/common";

export const getServerSideProps = async ({ req }: { req: NextApiRequest }) => {
  const SSR = withSSRContext({ req });
  let session;
  try {
    session = await SSR.Auth.currentSession();
  } catch (e) {
    console.log(e);
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const sessionData = session.getIdToken();
  const { payload } = sessionData;
  //"custom:role": role if custom attribute is added
  const {
    email,
    sub,
    email_verified,
    "custom:role": role,
    picture,
    name,
    preferred_username,
    profile,
  } = payload;

  const user: IUser = {
    userId: sub,
    email: email,
    email_verified: email_verified,
    // role: role,
    attributes: {
      picture,
      name,
      preferred_username,
      sub,
      profile,
    },
  };

  try {
    const response = (await SSR.API.graphql({
      query: listPostsCustom,
      authMode: "API_KEY",
    })) as GraphQLResult<ListPostsCustom>;

    return {
      props: {
        user,
        posts: response?.data?.listPublishedPostsByCreatedAt?.items.map((d) => {
          return {
            ...d,
            imagesObj: JSON.parse(d.images ? d.images : ""),
            author: JSON.parse(d.author ? d.author : "") as {
              __typename: "User";
              id: string;
              fullName: string;
              email: string;
              image?: string | null;
              username?: string | null;
              createdAt: string;
              updatedAt: string;
              owner?: string | null;
            },
          };
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
