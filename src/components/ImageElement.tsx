import {
  Slate,
  Editable,
  withReact,
  useSlateStatic,
  ReactEditor,
} from 'slate-react';
import { Transforms } from 'slate';
import { Box, Text, Button, Flex } from 'theme-ui';

const ImageElement = ({ attributes, children, element }) => {
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);
  console.log(path);

  return (
    <Box
      contentEditable={false}
    >
      <Box sx={{ position: 'relative' }}>
        <img
          src='https://res.cloudinary.com/dprifih4o/image/upload/f_auto,q_auto/v1/user_images/gyqhevvdy52q1xveqcfd'
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
