import { Box, Close } from 'theme-ui';
import { Transforms } from 'slate';
import { useSlateStatic, ReactEditor } from 'slate-react';

import ActivityOverview from './ActivityOverview';

const ActivityOverviewWrapper = ({ element }) => {
  const editor = useSlateStatic() as ReactEditor;
  const path = ReactEditor.findPath(editor, element);

  return (
    <Box
      sx={{
        backgroundColor: 'activityOverviewBackgroundColor',
        borderRadius: '5px',
        padding: '10px',
        position: 'relative',
      }}
      contentEditable={false}
    >
      <ActivityOverview
        data={{
          elevationGain: 1000,
          distance: 5000,
          normalizedPower: 250,
          heartAnalysis: { entire: 150 },
          powerAnalysis: { entire: 150 },
          cadenceAnalysis: { entire: 150 },
          tempAnalysis: { entire: 150 },
          stoppedTime: 5000,
          elapsedTime: { seconds: 150 },
          timeInRed: 420,
        }}
        selectedFields={[
          'Normalized Power',
          'Avg Heart Rate',
          'Distance',
          'Elapsed Time',
          'Avg Temperature',
          'Avg Speed',
        ]}
      />
      <Box sx={{ position: 'absolute', top: '10px', right: '10px' }}>
        <Close onClick={() => Transforms.removeNodes(editor, { at: path })} />
      </Box>
    </Box>
  );
};

export default ActivityOverviewWrapper;
