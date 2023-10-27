import { Auth } from "aws-amplify";
import React from "react";

const Logout = () => {
  try {
    Auth.signOut();
    window.location.href = `/login`;
  } catch (error) {
    console.log(error);
  }
};

export default Logout;
