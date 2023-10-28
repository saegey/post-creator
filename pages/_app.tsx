// src/pages/_app.js
import * as React from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import { ThemeUIProvider } from "theme-ui";
import { Amplify, Hub, Auth } from "aws-amplify";
import Router from "next/router";

import theme from "../src/utils/theme";
import ViewportProvider from "../src/components/ViewportProvider";
import UnitProvider from "../src/components/UnitProvider";
import awsconfig from "../src/aws-exports";
import ErrorBoundary from "../src/components/ErrorBoundary";

// import "@aws-amplify/ui-react/styles.css";
import "../styles/globals.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { UserContext } from "../src/components/UserContext";

Amplify.configure({ ...awsconfig, ssr: true });

export interface IUser {
  userId: string;
  email: string;
  email_verified: boolean;
  role: string;
  attributes: {
    picture: string;
    name: string;
    preferred_username: string;
    sub: string;
    profile: string;
  };
}

const app = ({ Component, pageProps }: AppProps) => {
  const [user, setUser] = React.useState<IUser>();

  const initialLoad = React.useCallback(async () => {
    Hub.listen("auth", async ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn": {
          const role = data?.attributes["custom:role"];
          //if role doesn't match as defined logout
          // if (role === "admin") {
          //   console.error({
          //     content: "Not authenticated",
          //   });
          //   await Auth.signOut();
          //   break;
          // }

          const user: IUser = {
            userId: data?.username,
            email: data?.attributes?.email,
            email_verified: data?.attributes?.email_verified,
            role: role,
            attributes: {
              picture: data?.attributes?.picture,
              name: data?.attributes?.name,
              preferred_username: data?.attributes?.preferred_username,
              // sub: data?.attribut
              sub: data?.attributes?.sub,
              profile: data?.attributes?.profile,
            },
          };
          setUser(user);
          //set user data to redux/context
          break;
        }
        case "signUp":
          break;
        case "signOut":
          setUser(undefined);
          //clear user data in redux/context
          break;
        case "signIn_failure":
          break;
        default:
      }
    });
  }, []);

  const getCurrentSession = async () => {
    try {
      const session = await Auth.currentSession();
      const sessionData = session.getIdToken();

      if (sessionData) {
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
          role: role,
          attributes: {
            picture,
            name,
            preferred_username,
            sub,
            profile,
          },
        };
        // console.log("user", user);
        setUser(user);
      }
    } catch (e) {
      console.log(e);
      Router.push("/login");
    }
  };

  React.useEffect(() => {
    initialLoad();
    getCurrentSession();
  }, []);

  const { metaTags } = pageProps as {
    metaTags: {
      description: string;
      "twitter:domain": string;
      "twitter:title": string;
      "twitter:description": string;
      "twitter:url": string;
      "twitter:card": string;
      "twitter:image": string;
      "og:title": string;
      "og:description": string;
      "og:image": string;
      "og:type": string;
      "og:url": string;
      author: string;
    };
  };

  return (
    <ErrorBoundary fallback={<h1>oh no</h1>}>
      <>
        <Head>
          {metaTags &&
            Object.entries(metaTags).map((entry) => (
              <meta
                property={entry[0]}
                name={entry[0]}
                content={entry[1]}
                key={entry[0]}
              />
            ))}
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
          />
        </Head>
        <UnitProvider>
          <ViewportProvider>
            <ThemeUIProvider theme={theme}>
              <UserContext.Provider value={{ user, setUser }}>
                <Component {...pageProps} />
              </UserContext.Provider>
            </ThemeUIProvider>
          </ViewportProvider>
        </UnitProvider>
      </>
    </ErrorBoundary>
  );
};

export default app;
