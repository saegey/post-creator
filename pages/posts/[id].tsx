import { Amplify, API, withSSRContext } from 'aws-amplify';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { withAuthenticator } from '@aws-amplify/ui-react';

import awsExports from '../../src/aws-exports';
import { deletePost } from '../../src/graphql/mutations';
import { getPost } from '../../src/graphql/queries';
import styles from '../../styles/Home.module.css';

Amplify.configure({ ...awsExports, ssr: true });

export async function getServerSideProps({ req, params }) {
  const SSR = withSSRContext({ req });

  const { data } = await SSR.API.graphql({
    query: getPost,
    authMode: 'API_KEY',
    variables: {
      id: params.id,
    },
  });

  return {
    props: {
      post: data.getPost,
    },
  };
}

function Post({ signOut, user, renderedAt, post }) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Loading&hellip;</h1>
      </div>
    );
  }

  async function handleDelete() {
    try {
      await API.graphql({
        authMode: 'AMAZON_COGNITO_USER_POOLS',
        query: deletePost,
        variables: {
          input: { id: post.id },
        },
      });

      window.location.href = '/';
    } catch ({ errors }) {
      console.error(...errors);
      throw new Error(errors[0].message);
    }
  }

  return (
    <div className={styles.container}>
      <h1>Logged in as {user.username}.</h1>
      <Head>
        <title>{post.title} – Amplify + Next.js</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{post.title}</h1>

        <p className={styles.description}>{post.content}</p>
      </main>
      <footer className={styles.footer}>
        <button onClick={handleDelete}>Delete post</button>
      </footer>
    </div>
  );
}

export default withAuthenticator(Post);
