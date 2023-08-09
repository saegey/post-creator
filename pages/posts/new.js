import Link from 'next/link';
import {
  Slate,
  Editable,
  withReact,
  useSlateStatic,
  ReactEditor,
} from 'slate-react';
import { createEditor, Transforms } from 'slate';
import { useState } from 'react';
import { Button, Box, Text, Container, Flex } from 'theme-ui';
import PowerGraphElement from '../../src/components/PowerGraphElement.jsx';

export default function FirstPost() {
  const [editor] = useState(() => withReact(createEditor()));

  const addGraph = (editor) => {
    // const editor = useSlateStatic();
    Transforms.insertNodes(editor, {
      id: 3,
      type: 'powergraph',
      children: [{ text: '' }],
      void: true,
    });
  };

  const initialValue = [
    {
      id: 1,
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
    {
      id: 2,
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ];

  const renderElement = (props) => {
    switch (props.element.type) {
      case 'powergraph':
        const newProps = { editor, ...props };
        return <PowerGraphElement {...newProps} />;
      default:
        return <p {...props} />;
    }
  };

  return (
    <Container p={4} bg='muted' sx={{ maxWidth: '800px' }}>
      <h1>First Post</h1>
      <Flex sx={{ marginBottom: '20px' }}>
        <Button onClick={() => addGraph(editor)}>+ Power Graph</Button>
      </Flex>
      <Box bg='background' sx={{ padding: '20px' }}>
        <Slate editor={editor} initialValue={initialValue}>
          <Editable renderElement={renderElement} />
        </Slate>
      </Box>
      <Link href='/'>
        <p>Back to home</p>
      </Link>
    </Container>
  );
}
