// src/pages/_app.js
import * as React from 'react';
import NextApp from 'next/app';
import { ThemeUIProvider } from 'theme-ui';
import theme from '../src/utils/theme'; // theme object from step 2
import ViewportProvider from '../src/components/ViewportProvider';
import UnitProvider from '../src/components/UnitProvider';
import { Amplify } from 'aws-amplify';
import awsconfig from '../src/aws-exports';

import '@aws-amplify/ui-react/styles.css';
import '../styles/globals.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import ErrorBoundary from '../src/components/ErrorBoundary';

Amplify.configure(awsconfig);

export default class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ErrorBoundary fallback={<h1>oh no</h1>}>
        <UnitProvider>
          {/* <ViewportProvider> */}
          <ThemeUIProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeUIProvider>

          {/* </ViewportProvider> */}
        </UnitProvider>
      </ErrorBoundary>
    );
  }
}
