import Link from 'next/link';
import {
  Slate,
  Editable,
  withReact,
  useSlateStatic,
  ReactEditor,
} from 'slate-react';
import { createEditor, Transforms, Editor } from 'slate';
import { useState, useMemo, useEffect } from 'react';
import { Button, Box, Text, Container, Flex } from 'theme-ui';
import PowerGraphElement from '../../src/components/PowerGraphElement';
import ImageElement from '../../src/components/ImageElement';

export default function FirstPost() {
  const [editor] = useState(() => withReact(createEditor()));
  const [uploadModal, setUploadModal] = useState(false);

  const save = async (editor) => {
    const res = await fetch('/api/users/420', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(editor.children),
    });
    const payload = await res.json();
    console.log(payload);
    // console.log(editor.children);
  };

  const upload = (editor) => {
    setUploadModal(true);
    console.log('yupload');
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('content'));

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
        id: 3,
        type: 'powergraph',
        children: [{ text: '' }],
        void: true,
      },
      { id: 5, type: 'text', children: [{ text: '' }] },
    ]);
  };

  const addImage = (editor) => {
    Transforms.insertNodes(editor, [
      {
        id: 4,
        type: 'image',
        children: [{ text: '' }],
        void: true,
      },
      { id: 5, type: 'text', children: [{ text: '' }] },
    ]);
  };

  const renderElement = ({ attributes, children, element }) => {
    const style = { textAlign: element.align };
    switch (element.type) {
      case 'powergraph':
        return (
          <PowerGraphElement
            attributes={attributes}
            children={children}
            element={element}
          />
        );
      case 'image':
        return (
          <ImageElement
            attributes={attributes}
            children={children}
            element={element}
          />
        );
      case 'heading-two':
        return (
          <h2 style={style} {...attributes}>
            {children}
          </h2>
        );
      default:
        return (
          <p
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
              maxWidth: '690px',
            }}
            {...attributes}
          >
            {children}
          </p>
        );
    }
  };

  return (
    <Container p={4} bg='muted' sx={{ maxWidth: '1100px' }}>
      <h1>First Post</h1>
      <Flex sx={{ marginBottom: '20px', gap: '10px' }}>
        <Button onClick={() => addGraph(editor)}>+ Power Graph</Button>
        <Button onClick={() => addImage(editor)}>+ Image </Button>
        <Button onClick={() => save(editor)}>Save</Button>
        <Button onClick={() => upload(editor)}>Upload GPX</Button>
      </Flex>
      <Box bg='background' sx={{ padding: '20px' }}>
        <Slate
          editor={editor}
          initialValue={[{ id: 5, type: 'text', children: [{ text: '' }] }]}
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
  );
}
