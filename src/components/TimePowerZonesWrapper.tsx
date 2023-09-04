import { Box, Close } from 'theme-ui';
import { Transforms } from 'slate';
import { useSlateStatic, ReactEditor } from 'slate-react';

import TimePowerZones from './TimePowerZones';

const TimePowerZonesWrapper = ({ element }) => {
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
      <TimePowerZones
        powerZoneBuckets={[400, 200, 300, 400, 500, 500]}
        powerZones={[
          { powerLow: 1, powerHigh: 100, zone: 1, title: 'Recovery' },
          { powerLow: 101, powerHigh: 180, zone: 2, title: 'Endurance' },
          { powerLow: 181, powerHigh: 220, zone: 3, title: 'Tempo' },
          { powerLow: 221, powerHigh: 280, zone: 4, title: 'Threshold' },
          { powerLow: 281, powerHigh: 300, zone: 5, title: 'V02Max' },
          { powerLow: 301, powerHigh: 999, zone: 5, title: 'Anaerobic' },
        ]}
      />
      <Box sx={{ position: 'absolute', top: '10px', right: '10px' }}>
        <Close onClick={() => Transforms.removeNodes(editor, { at: path })} />
      </Box>
    </Box>
  );
};

export default TimePowerZonesWrapper;
