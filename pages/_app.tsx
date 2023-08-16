// src/pages/_app.js
import * as React from 'react';
import NextApp from 'next/app';
import { ThemeUIProvider } from 'theme-ui';
import theme from '../src/utils/theme'; // theme object from step 2
import '../styles/globals.css';
import 'mapbox-gl/dist/mapbox-gl.css'
import ViewportProvider from '@saegey/posts.viewport';
import UnitProvider from '@saegey/posts.units';

import { Amplify, Storage } from 'aws-amplify';
import awsconfig from '../src/aws-exports';
Amplify.configure(awsconfig);

export default class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <UnitProvider>
        <ViewportProvider>
          <ThemeUIProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeUIProvider>
        </ViewportProvider>
      </UnitProvider>
    );
  }
}
