import { withSSRContext } from "aws-amplify";
import Head from "next/head";
import React from "react";
import { NextApiRequest } from "next";
import { GraphQLResult } from "@aws-amplify/api";

import { listPostsCustom } from "../src/graphql/customQueries";
import { CloudinaryImage } from "../src/components/AddImage";
import PostsAllUsers from "../src/components/PostsAllUsers";
import { ListPostsCustom } from "../src/API";
import { CognitoUserExt } from "../src/types/common";
import { UserContext } from "../src/components/UserContext";

export const getServerSideProps = async ({ req }: { req: NextApiRequest }) => {
  const SSR = withSSRContext({ req });

  try {
    const response = (await SSR.API.graphql({
      query: listPostsCustom,
      authMode: "API_KEY",
    })) as GraphQLResult<ListPostsCustom>;

    return {
      props: {
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
  user: CognitoUserExt;
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

const Home = ({ posts = [] }: HomeProps) => {
  const { user } = React.useContext(UserContext);

  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user && <PostsAllUsers posts={posts} user={user} />}
    </>
  );
};

export default Home;
