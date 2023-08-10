import Head from 'next/head';
import Link from 'next/link';
import { Flex, Text, Box } from 'theme-ui';
import CloudinaryUpload from '../src/components/CloudinaryUpload'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <Text as='h1' sx={{ fontFamily: 'body' }}>
          Welcome to Race Journal
        </Text>

        <div>
          <Link href='/posts/new'>
            <Text as='p' sx={{ color: 'red', fontFamily: 'body' }}>
              Create a new post.
            </Text>
          </Link>
        </div>
				<CloudinaryUpload />
        <img id="uploadedimage" src=""></img>
      </main>
    </div>
  );
}
