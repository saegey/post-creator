"use client"; // This is a client component 👈🏽

import { useSlateStatic, ReactEditor } from 'slate-react';
import { Transforms } from 'slate';
import { Box, Button, Flex } from 'theme-ui';
import { useContext } from 'react';

import { PowerCurveGraph } from '@saegey/posts.ui.power-curve-graph';
import { PostContext } from '../PostContext';

const PowerGraph = ({ attributes, children, element }) => {
  const { powerAnalysis } = useContext(PostContext);
  const editor = useSlateStatic() as ReactEditor;
  const path = ReactEditor.findPath(editor, element);

  const graphData = Object.keys(powerAnalysis)
    .map((k, i) => {
      if (Number(k) > 0) {
        return { x: Number(k), y: powerAnalysis[k] };
      }
    })
    .filter((p) => p !== undefined);

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
        <PowerCurveGraph ftp={280} data={graphData} />
      </Box>
    </Box>
  );
};

export default PowerGraph;
