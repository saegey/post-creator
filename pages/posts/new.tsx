import Link from 'next/link';
import {
  Slate,
  Editable,
  withReact,
  useSlateStatic,
  ReactEditor,
} from 'slate-react';
import { createEditor, Transforms, Editor, Descendant } from 'slate';
import { useState, useEffect } from 'react';
import { Button, Box, Text, Container, Flex } from 'theme-ui';
// import { Storage } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { GraphQLResult } from '@aws-amplify/api';
import '@aws-amplify/ui-react/styles.css';
import { API } from 'aws-amplify';

import { createPost } from '../../src/graphql/mutations';
import { CreatePostMutation } from '../../src/API';
import UploadGpxModal from '../../src/components/UploadGpxModal';
import renderElement from '../../src/utils/RenderElement';

function FirstPost({ signOut, user, renderedAt }) {
  const [editor] = useState(() => withReact(createEditor()));
  const [uploadModal, setUploadModal] = useState(false);

  const save = async (editor: any) => {
    event.preventDefault();

    try {
      const response = (await API.graphql({
        authMode: 'AMAZON_COGNITO_USER_POOLS',
        query: createPost,
        variables: {
          input: {
            title: 'this is a title',
            // content: form.get('content'),
            components: JSON.stringify(editor.children),
          },
        },
      })) as GraphQLResult<CreatePostMutation>;
      console.log('saved');
    } catch ({ errors }) {
      console.error(...errors);
      throw new Error(errors[0].message);
    }
  };

  const upload = (editor) => {
    setUploadModal(true);
    console.log('yupload');
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('content'));
    if (!data) {
      return;
    }

    // Delete all entries leaving 1 empty node
    Transforms.delete(editor, {
      at: {
        anchor: Editor.start(editor, []),
        focus: Editor.end(editor, []),
      },
    });

    // Removes empty node
    Transforms.removeNodes(editor, {
      at: [0],
    });

    // Insert array of children nodes
    Transforms.insertNodes(editor, data);
  }, []);

  const addGraph = (editor) => {
    Transforms.insertNodes(editor, [
      {
        type: 'powergraph',
        children: [{ text: '' }],
        void: true,
      } as Descendant,
      { type: 'text', children: [{ text: '' }] } as Descendant,
    ]);
  };

  const addImage = (editor) => {
    Transforms.insertNodes(editor, [
      {
        type: 'image',
        children: [{ text: '' }],
        void: true,
      } as Descendant,
      { type: 'text', children: [{ text: '' }] } as Descendant,
    ]);
  };



  return (
    <>
      {uploadModal && <UploadGpxModal openModal={setUploadModal} />}
      <Container p={4} bg='muted' sx={{ maxWidth: '1100px' }}>
        <p>Logged in as {user.username}.</p>
        <button onClick={signOut}>Sign out</button>
        <h1>Post Name</h1>
        <Flex sx={{ marginBottom: '20px', gap: '10px' }}>
          <Button onClick={() => addGraph(editor)}>+ Power Graph</Button>
          <Button onClick={() => addImage(editor)}>+ Image </Button>
          <Button onClick={() => save(editor)}>Save</Button>
          <Button onClick={() => upload(editor)}>Upload GPX</Button>
        </Flex>
        <Box bg='background' sx={{ padding: '20px' }}>
          <Slate
            editor={editor}
            initialValue={[
              { type: 'text', children: [{ text: '' }] } as Descendant,
            ]}
            onChange={(value) => {
              const isAstChange = editor.operations.some(
                (op) => 'set_selection' !== op.type
              );
              if (isAstChange) {
                const content = JSON.stringify(value);
                localStorage.setItem('content', content);
              }
            }}
          >
            <Editable
              spellCheck
              autoFocus
              renderElement={renderElement}
              style={{ padding: '2px' }}
            />
          </Slate>
        </Box>

        <Link href='/'>
          <p>Back to home</p>
        </Link>
      </Container>
    </>
  );
}

export default withAuthenticator(FirstPost);
