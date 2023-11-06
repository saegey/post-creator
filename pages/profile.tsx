import Head from "next/head";
import { Box } from "theme-ui";
import React from "react";
import { withSSRContext } from "aws-amplify";
import { NextApiRequest } from "next";

// import { UserContext } from "../src/components/UserContext";
import EditProfile from "../src/components/user/EditProfile";
import { IUser } from "../src/types/common";

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

  return { props: { user } };
};

const Profile = ({ user }: { user: IUser }) => {
  // const { user } = React.useContext(UserContext);

  return (
    <>
      <Box
        sx={{ width: "100%", height: "100vw", backgroundColor: "background" }}
      >
        <Head>
          <title>Profile</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {user && <EditProfile user={user} />}
      </Box>
    </>
  );
};

export default Profile;
