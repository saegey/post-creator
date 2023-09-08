import { useSlateStatic, ReactEditor } from 'slate-react';
import { Transforms } from 'slate';
import { Box, Flex, Close } from 'theme-ui';
import { useContext } from 'react';

import { PowerCurveGraph } from './PowerCurveGraph';
import { PostContext } from '../PostContext';

const PowerGraph = ({ element }) => {
  const { powerAnalysis, currentFtp } = useContext(PostContext);
  const editor = useSlateStatic() as ReactEditor;
  const path = ReactEditor.findPath(editor, element);
  if (!powerAnalysis) {
    return <></>;
  }

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
        backgroundColor: '#f5f5f5',
        borderRadius: '5px',
        padding: '20px',
        margin: '10px',
      }}
      contentEditable={false}
    >
      <Flex sx={{ width: '100%' }}>
        <Box sx={{ marginLeft: 'auto' }}>
          <Close
            onClick={(e) => Transforms.removeNodes(editor, { at: path })}
          />
        </Box>
      </Flex>

      <Box sx={{ width: '100%', height: '200px' }}>
        <PowerCurveGraph
          ftp={currentFtp ? Number(currentFtp) : 0}
          data={graphData as any}
        />
      </Box>
    </Box>
  );
};

export default PowerGraph;
