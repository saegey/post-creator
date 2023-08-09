import {
  Slate,
  Editable,
  withReact,
  useSlateStatic,
  ReactEditor,
} from 'slate-react';
import { Transforms } from 'slate';
import dynamic from 'next/dynamic';
import { Box, Text, Button } from 'theme-ui';

import { PowerCurveGraph } from '@saegey/posts.ui.power-curve-graph';

const PowerGraph = ({ attributes, children, element }) => {
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);
	// console.log(PowerCurveGraph.PowerCurveGraph);
  return (
    <Box
      sx={{ border: '1px solid red', padding: '20px' }}
      contentEditable={false}
    >
      <Text as='h2'>PowerGraph</Text>{' '}
      {/* <PowerCurveGraph
        ftp={280}
        data={[
          { x: 1, y: 800 },
          { x: 5, y: 700 },
          { x: 20, y: 600 },
          { x: 60, y: 590 },
          { x: 300, y: 500 },
          { x: 3600, y: 200 },
        ]}
      /> */}
      <Button onClick={(e) => Transforms.removeNodes(editor, { at: path })}>
        Delete
      </Button>
    </Box>
  );
};

export default PowerGraph;
