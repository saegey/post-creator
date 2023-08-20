import { useSlateStatic, ReactEditor } from 'slate-react';
import { Transforms } from 'slate';
import { Box, Button } from 'theme-ui';

const ImageElement = ({ attributes, children, element }) => {
  const editor = useSlateStatic() as ReactEditor;
  const path = ReactEditor.findPath(editor, element);

  return (
    <Box contentEditable={false}>
      <Box sx={{ position: 'relative' }}>
        <img
          src={element.src}
          style={{ width: '100%', height: 'auto', borderRadius: '5px' }}
        />
        <Box sx={{ position: 'absolute', right: '10px', top: '10px' }}>
          <Button onClick={(e) => Transforms.removeNodes(editor, { at: path })}>
            x
          </Button>
        </Box>
      </Box>
      {children}
    </Box>
  );
};

export default ImageElement;
