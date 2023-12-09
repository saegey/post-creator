import Head from "next/head";
import { Box } from "theme-ui";
import React from "react";
import { withSSRContext } from "aws-amplify";
import { NextApiRequest } from "next";

import EditProfile from "../src/components/user/EditProfile";
import { IUser } from "../src/types/common";
import Header from "../src/components/shared/Header";

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
    zoneinfo,
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
      zoneinfo,
    },
  };

  return { props: { user } };
};

const Profile = ({ user }: { user: IUser }) => {
  return (
    <>
      <Box
        sx={{ width: "100%", height: "100vw", backgroundColor: "background" }}
      >
        <Head>
          <title>Profile</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {user && (
          <main>
            <Header user={user} />
            <EditProfile user={user} />
          </main>
        )}
      </Box>
    </>
  );
};

export default Profile;
