// src/pages/_document.js
import Document, { Main, NextScript, Head, Html } from 'next/document';
import { InitializeColorMode } from 'theme-ui';

export default class extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    // Replace html lang attribute value with your language.
    return (
      <Html lang='en'>
        <Head>
        </Head>
        <body>
          <InitializeColorMode />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
