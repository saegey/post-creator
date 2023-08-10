// src/pages/_app.js
import * as React from 'react';
import NextApp from 'next/app';
import { ThemeUIProvider } from 'theme-ui';
import theme from '../src/utils/theme'; // theme object from step 2
import '../styles/globals.css';

import { Amplify, Storage } from 'aws-amplify';
import awsconfig from '../src/aws-exports';
Amplify.configure(awsconfig);

export default class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeUIProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeUIProvider>
    );
  }
}
