import { NextApiRequest } from "next";
import { withSSRContext, Amplify } from "aws-amplify";

import awsconfig from "../aws-exports";

Amplify.configure({ ...awsconfig, ssr: true });

class User {
  static getUser = async ({ req }: { req: NextApiRequest }) => {
    // console.log(JSON.stringify(withSSRContext({ req })));
    const SSR = withSSRContext({ req });
    let session;

    try {
      session = await SSR.Auth.currentSession();

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

      return {
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
    } catch (e) {
      console.log(e);
      // console.log("error");
      return null;
    }
  };
}

export default User;
