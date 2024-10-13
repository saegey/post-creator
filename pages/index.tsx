import Head from "next/head";
import React from "react";
import { NextApiRequest } from "next";
import Router from "next/router";

import User from "../src/actions/User";

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
};

const Home = () => {
  React.useEffect(() => {
    Router.push("/posts");
  }, []);

  return (
    <>
      <Head>
        <title>Monopad - Home</title>
      </Head>
    </>
  );
};

export default Home;
