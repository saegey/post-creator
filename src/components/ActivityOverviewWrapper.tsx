import { Box, Close } from 'theme-ui';
import { Transforms } from 'slate';
import React from 'react';
import { useSlateStatic, ReactEditor } from 'slate-react';

import ActivityOverview from './ActivityOverview';
import { PostContext } from '../PostContext';
import { EditorContext } from './EditorContext';
import OptionsButton from './OptionsButton';
import Dropdown from './Dropdown';
import { useClickOutside } from '../utils/ux';
const ActivityOverviewWrapper = ({ element }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const wrapperRef = React.useRef('menu');
  useClickOutside(wrapperRef, (e) => {
    setIsMenuOpen(false);
    e.stopPropagation();
  });

  const editor = useSlateStatic() as ReactEditor;
  const path = ReactEditor.findPath(editor, element);
  const {
    elevationTotal,
    normalizedPower,
    heartAnalysis,
    distance,
    elapsedTime,
    stoppedTime,
    timeInRed,
    powerAnalysis,
    cadenceAnalysis,
    tempAnalysis,
    currentFtp,
  } = React.useContext(PostContext);

  const { isFtpUpdating } = React.useContext(EditorContext);

  return (
    <Box
      sx={{
        backgroundColor: 'activityOverviewBackgroundColor',
        borderRadius: '5px',
        padding: ['10px', '30px', '30px'],
        position: 'relative',
        maxWidth: '690px',
        marginY: ['20px', '60px', '60px'],
        marginX: 'auto',
      }}
      contentEditable={false}
    >
      <ActivityOverview
        data={{
          elevationGain: elevationTotal ? elevationTotal : 0,
          distance: distance ? distance : 0,
          normalizedPower: normalizedPower ? normalizedPower : 0,
          heartAnalysis: heartAnalysis ? heartAnalysis : null,
          powerAnalysis: powerAnalysis ? powerAnalysis : null,
          cadenceAnalysis: cadenceAnalysis ? cadenceAnalysis : null,
          tempAnalysis: tempAnalysis ? tempAnalysis : null,
          stoppedTime: stoppedTime ? stoppedTime : 0,
          elapsedTime: { seconds: elapsedTime ? elapsedTime : 0 },
          timeInRed: isFtpUpdating
            ? '....'
            : timeInRed
            ? timeInRed
            : currentFtp !== undefined
            ? timeInRed
            : 0,
        }}
        selectedFields={[
          'Normalized Power',
          'Avg Heart Rate',
          'Distance',
          'Elevation Gain',
          'Avg Temperature',
          'Avg Speed',
          'Elapsed Time',
          'Stopped Time',
          'Time in Red',
          'Avg Cadence',
          'Avg Power',
        ]}
      />
      <Box sx={{ position: 'absolute', top: '10px', right: '10px' }}>
        <OptionsButton
          onClick={() => {
            if (isMenuOpen) {
              setIsMenuOpen(false);
            } else {
              setIsMenuOpen(true);
            }
          }}
        />
        <Box>
          <Dropdown isOpen={isMenuOpen}>
            <Box
              onClick={() => {
                Transforms.removeNodes(editor, { at: path });
                setIsMenuOpen(false);
              }}
              ref={wrapperRef}
              variant='boxes.dropdownMenuItem'
            >
              Remove
            </Box>
          </Dropdown>
        </Box>
      </Box>
    </Box>
  );
};

export default ActivityOverviewWrapper;
