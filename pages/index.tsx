import Head from 'next/head';
import Link from 'next/link';
import { Flex, Text, Box } from 'theme-ui';
import CloudinaryUpload from '../src/components/CloudinaryUpload';

import { withAuthenticator } from '@aws-amplify/ui-react';
import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify, API, Auth, withSSRContext } from 'aws-amplify';
import { GraphQLResult } from "@aws-amplify/api";

import awsExports from '../src/aws-exports';
import { createPost } from '../src/graphql/mutations';
import { listPosts } from '../src/graphql/queries';
import { CreatePostMutation } from '../src/API';

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

async function handleCreatePost(event) {
  event.preventDefault();

  const form = new FormData(event.target);

  try {
    const response = await API.graphql({
      authMode: 'AMAZON_COGNITO_USER_POOLS',
      query: createPost,
      variables: {
        input: {
          title: form.get('title'),
          content: form.get('content'),
        },
      },
    }) as GraphQLResult<CreatePostMutation>;

    window.location.href = `/posts/${response.data.createPost.id}`;
  } catch ({ errors }) {
    console.error(...errors);
    throw new Error(errors[0].message);
  }
}

function Home({ signOut, user, renderedAt, posts = [] }) {
  return (
    <div style={{ padding: 50 }}>
      <h1>Logged in as {user.username}.</h1>
      <div>
        <button onClick={signOut}>Sign out</button>
      </div>
      {posts.map((post) => (
        <a href={`/posts/${post.id}`} key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </a>
      ))}

      <Authenticator>
        <form onSubmit={handleCreatePost}>
          <fieldset>
            <legend>Title</legend>
            <input
              defaultValue={`Today, ${new Date().toLocaleTimeString()}`}
              name='title'
            />
          </fieldset>

          <fieldset>
            <legend>Content</legend>
            <textarea
              defaultValue='I built an Amplify project with Next.js!'
              name='content'
            />
          </fieldset>

          <button>Create Post</button>
        </form>
      </Authenticator>
      <p>This page was server-side rendered on {renderedAt}.</p>
    </div>
  );
}

export default withAuthenticator(Home);
