import { withAuthenticator } from '@aws-amplify/ui-react';
import Head from 'next/head';

import Header from '../../src/components/Header';

const Profile = ({ signOut, user }) => {
  return (
    <>
      <div>
        <Head>
          <title>Profile</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <main>
          <Header user={user} signOut={signOut} />
          <div
            style={{
              marginTop: '60px',
              maxWidth: '900px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Posts
          </div>
        </main>
      </div>
    </>
  );
};

export default withAuthenticator(Profile);
