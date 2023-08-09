import Head from 'next/head';
import Link from 'next/link';
import { Text } from 'theme-ui';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <Text as='h1' sx={{ fontFamily: 'body' }}>
          Welcome to Race Journal
        </Text>

        <div className={styles.grid}>
          <Link href='/posts/new'>
            <Text as='p' sx={{ color: 'red', fontFamily: 'body' }}>
              Create a new post.
            </Text>
          </Link>
        </div>
      </main>
    </div>
  );
}
