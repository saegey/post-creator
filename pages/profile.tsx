import Head from "next/head";
import { Box } from "theme-ui";
import React from "react";

import { UserContext } from "../src/components/UserContext";
import EditProfile from "../src/components/EditProfile";

const Profile = () => {
  const { user } = React.useContext(UserContext);

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
