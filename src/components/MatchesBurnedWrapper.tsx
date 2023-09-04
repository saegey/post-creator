import { Box, Close } from 'theme-ui';
import { Transforms } from 'slate';
import { useSlateStatic, ReactEditor } from 'slate-react';

import MatchesBurned from './MatchesBurned';

const MatchesBurnedWrapper = ({ element }) => {
  const editor = useSlateStatic() as ReactEditor;
  const path = ReactEditor.findPath(editor, element);

  return (
    <Box
      sx={{
        backgroundColor: 'activityOverviewBackgroundColor',
        borderRadius: '5px',
        padding: '10px',
        position: 'relative',
        marginY: '20px',
      }}
      contentEditable={false}
    >
      <Box sx={{ marginTop: '35px' }}>
        <MatchesBurned
          data={[
            {
              averagePower: 900,
              totalJoules: 900,
              totalTime: 400,
              vals: [],
              startTime: 'blah',
            },
            {
              averagePower: 800,
              totalJoules: 2000,
              totalTime: 800,
              vals: [],
              startTime: 'blah',
            },
            {
              averagePower: 900,
              totalJoules: 900,
              totalTime: 400,
              vals: [],
              startTime: 'blah',
            },
            {
              averagePower: 900,
              totalJoules: 900,
              totalTime: 400,
              vals: [],
              startTime: 'blah',
            },
          ]}
        />
      </Box>
      <Box sx={{ position: 'absolute', top: '10px', right: '10px' }}>
        <Close onClick={() => Transforms.removeNodes(editor, { at: path })} />
      </Box>
    </Box>
  );
};

export default MatchesBurnedWrapper;
