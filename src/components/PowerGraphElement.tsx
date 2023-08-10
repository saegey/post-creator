import {
  useSlateStatic,
  ReactEditor,
} from 'slate-react';
import { Transforms } from 'slate';
import { Box, Button, Flex } from 'theme-ui';

import { PowerCurveGraph } from '@saegey/posts.ui.power-curve-graph';

const PowerGraph = ({ attributes, children, element }) => {
  const editor = useSlateStatic() as ReactEditor;
  const path = ReactEditor.findPath(editor, element);

  return (
    <Box
      sx={{
        backgroundColor: 'lightgray',
        borderRadius: '5px',
        padding: '20px',
        margin: '10px',
      }}
      contentEditable={false}
    >
      <Flex sx={{ width: '100%' }}>
        <Box sx={{ marginLeft: 'auto' }}>
          <Button onClick={(e) => Transforms.removeNodes(editor, { at: path })}>
            x
          </Button>
        </Box>
      </Flex>
      <Box sx={{ width: '100%', height: '200px' }}>
        <PowerCurveGraph
          ftp={280}
          data={[
            { x: 1, y: 800 },
            { x: 5, y: 700 },
            { x: 20, y: 600 },
            { x: 60, y: 590 },
            { x: 300, y: 500 },
            { x: 3600, y: 200 },
          ]}
        />
      </Box>
    </Box>
  );
};

export default PowerGraph;
