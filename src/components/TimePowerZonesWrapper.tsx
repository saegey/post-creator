import { Box, Close } from 'theme-ui';
import { Transforms } from 'slate';
import { useSlateStatic, ReactEditor } from 'slate-react';
import React from 'react';

import TimePowerZones from './TimePowerZones';
import { PostContext } from '../PostContext';

const TimePowerZonesWrapper = ({ element }) => {
  const editor = useSlateStatic() as ReactEditor;
  const path = ReactEditor.findPath(editor, element);
  const { powerZones, powerZoneBuckets } = React.useContext(PostContext);

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
        powerZoneBuckets={powerZoneBuckets}
        powerZones={powerZones}
      />
      <Box sx={{ position: 'absolute', top: '10px', right: '10px' }}>
        <Close onClick={() => Transforms.removeNodes(editor, { at: path })} />
      </Box>
    </Box>
  );
};

export default TimePowerZonesWrapper;
