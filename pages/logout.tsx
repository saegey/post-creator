import { Auth } from "aws-amplify";
import React from "react";
import Router from "next/router";

const Logout = () => {
  const logUserOut = async () => {
    await Auth.signOut();
    Router.push("/login");
  };

  React.useEffect(() => {
    logUserOut().then(() => console.log("done"));
  }, []);
};

export default Logout;
