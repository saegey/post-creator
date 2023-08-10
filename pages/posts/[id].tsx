import { Amplify, API, withSSRContext } from 'aws-amplify';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Slate, withReact, Editable, ReactEditor } from 'slate-react';
import { useState } from 'react';
import { createEditor, Descendant, Transforms } from 'slate';
import { Button, Flex } from 'theme-ui';
import { GraphQLResult } from '@aws-amplify/api';

import awsExports from '../../src/aws-exports';
import { deletePost } from '../../src/graphql/mutations';
import { getPost } from '../../src/graphql/queries';
import styles from '../../styles/Home.module.css';
import renderElement from '../../src/utils/RenderElement';
import { updatePost } from '../../src/graphql/mutations';
import { UpdatePostMutation } from '../../src/API';

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
  // console.log(JSON.parse(data.getPost.components));

  return {
    props: {
      post: data.getPost,
    },
  };
}

function Post({ signOut, user, renderedAt, post }) {
  const router = useRouter();
  const [editor] = useState(() => withReact(createEditor()));
  const initialState = JSON.parse(post.components);

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

  const addGraph = (editor: ReactEditor) => {
    Transforms.insertNodes(editor, [
      {
        type: 'powergraph',
        children: [{ text: '' }],
        void: true,
      } as Descendant,
      { type: 'text', children: [{ text: '' }] } as Descendant,
    ]);
  };

  const save = async (editor: any) => {
    event.preventDefault();

    try {
      const response = (await API.graphql({
        authMode: 'AMAZON_COGNITO_USER_POOLS',
        query: updatePost,
        variables: {
          input: {
            id: post.id,
            title: post.title,
            // content: form.get('content'),
            components: JSON.stringify(editor.children),
          },
        },
      })) as GraphQLResult<UpdatePostMutation>;
      console.log('saved');
    } catch ({ errors }) {
      console.error(...errors);
      throw new Error(errors[0].message);
    }
  };

  return (
    <div>
      <h1>Logged in as {user.username}.</h1>
      <Head>
        <title>{post.title} – Amplify + Next.js</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <h1>{post.title}</h1>
        <Flex sx={{ marginBottom: '20px', gap: '10px' }}>
          <Button onClick={() => addGraph(editor)}>+ Power Graph</Button>
          <Button onClick={() => save(editor)}>Save</Button>
        </Flex>
        <Slate editor={editor} initialValue={initialState}>
          <Editable
            spellCheck
            autoFocus
            renderElement={renderElement}
            style={{ padding: '2px' }}
          />
        </Slate>
      </main>
      <footer className={styles.footer}>
        <button onClick={handleDelete}>Delete post</button>
      </footer>
    </div>
  );
}

export default withAuthenticator(Post);
