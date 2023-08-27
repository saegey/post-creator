import { withAuthenticator } from '@aws-amplify/ui-react';
import { API, withSSRContext, PubSub, Amplify, Auth } from 'aws-amplify';
import Head from 'next/head';
import { Button } from 'theme-ui';
import { useEffect, useState } from 'react';
import { useViewport } from '@saegey/posts.viewport';


import { listPosts } from '../src/graphql/queries';
import Header from '../src/components/Header';
import CreatePostModal from '../src/components/CreatePostModal';
import awsExports from '../src/aws-exports';

export async function getServerSideProps({ req }) {
  const SSR = withSSRContext({ req });

  try {
    const response = await SSR.API.graphql({
      query: listPosts,
      authMode: 'API_KEY',
    });
    return {
      props: {
        posts: response.data.listPosts.items,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {},
    };
  }
}

function Home({ signOut, user, posts = [] }) {
  const [newPost, setNewPost] = useState(false);
  // const { width } = useViewport();

  return (
    <>
      {newPost && <CreatePostModal setMenuOpen={setNewPost} />}
      <div>
        <Head>
          <title>Home</title>
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
            <div>
              <Button onClick={() => setNewPost(true)}>New Post</Button>
            </div>
            <ul>
              {posts.map((post) => (
                <li
                  style={{ paddingTop: '20px', listStyleType: 'none' }}
                  key={`post-${post.id}`}
                >
                  <a href={`/posts/${post.id}`} key={post.id}>
                    <p>{post.title}</p>
                    <p>{post.content}</p>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </>
  );
}

export default withAuthenticator(Home);
