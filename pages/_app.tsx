// src/pages/_app.js
import * as React from 'react';
import NextApp from 'next/app';
import { ThemeUIProvider, Flex } from 'theme-ui';
import theme from '../src/utils/theme'; // theme object from step 2
import ViewportProvider from '@saegey/posts.viewport';
import UnitProvider from '@saegey/posts.units';
import { Amplify, Storage } from 'aws-amplify';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import awsconfig from '../src/aws-exports';

import '@aws-amplify/ui-react/styles.css';
import '../styles/globals.css';
import 'mapbox-gl/dist/mapbox-gl.css';

Amplify.configure(awsconfig);

export default class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <UnitProvider>
        <ViewportProvider>
          <ThemeUIProvider theme={theme}>
            <Authenticator
              signUpAttributes={['name', 'preferred_username']}
              components={{
                SignUp: {
                  FormFields() {
                    const { validationErrors } = useAuthenticator();

                    return (
                      <>
                        <h2>monopad</h2>
                        {/* Re-use default `Authenticator.SignUp.FormFields` */}
                        <Authenticator.SignUp.FormFields />

                        {/* Append & require Terms & Conditions field to sign up  */}
                      </>
                    );
                  },
                },
              }}
            >
              <Component {...pageProps} />
            </Authenticator>
          </ThemeUIProvider>
        </ViewportProvider>
      </UnitProvider>
    );
  }
}
