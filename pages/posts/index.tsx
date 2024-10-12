import Head from "next/head";
import { Amplify, withSSRContext } from "aws-amplify";
import React from "react";
import { NextApiRequest } from "next";

import awsconfig from "../../src/aws-exports";
import PostsAll from "../../src/components/posts/View/PostsAll";
import { CloudinaryImage, IUser } from "../../src/types/common";

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

export const getServerSideProps = async ({ req }: { req: NextApiRequest }) => {
  const SSR = withSSRContext({ req });
  let session;

  let user: IUser | null = null;

  try {
    session = await SSR.Auth.currentSession();

    const sessionData = session.getIdToken();
    const { payload } = sessionData;
    console.log(payload);
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
      zoneinfo,
    } = payload;

    user = {
      userId: sub,
      email: email,
      email_verified: email_verified,
      // role: role,
      attributes: {
        picture: picture ? picture : null,
        name,
        preferred_username,
        sub,
        profile: profile ? profile : null,
        zoneinfo,
      },
    };
    // console.log(user);
  } catch (e) {
    console.log(e);
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user,
    },
  };
};

const MyPosts = ({ user }: { user: IUser }) => {
  return (
    <>
      <Head>
        <title>Monopad - My Posts</title>
      </Head>
      {user && <PostsAll user={user} />}
    </>
  );
};

export default MyPosts;
