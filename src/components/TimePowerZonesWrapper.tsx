import { Box } from 'theme-ui';
import { Transforms } from 'slate';
import { useSlateStatic, ReactEditor } from 'slate-react';
import React from 'react';

import TimePowerZones from './TimePowerZones';
import { PostContext } from '../PostContext';
import Dropdown from './Dropdown';
import OptionsButton from './OptionsButton';
import { useClickOutside } from '../utils/ux';

const TimePowerZonesWrapper = ({ element }) => {
  const editor = useSlateStatic() as ReactEditor;
  const path = ReactEditor.findPath(editor, element);
  const { powerZones, powerZoneBuckets } = React.useContext(PostContext);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const wrapperRef = React.useRef('menu');
  useClickOutside(wrapperRef, (e) => {
    setIsMenuOpen(false);
    e.stopPropagation();
  });

  return (
    <Box
      sx={{
        backgroundColor: 'activityOverviewBackgroundColor',
        borderRadius: '5px',
        padding: ['10px', '30px', '30px'],
        position: 'relative',
        marginY: ['20px', '60px', '60px'],
        marginX: 'auto',
        maxWidth: '690px',
      }}
      contentEditable={false}
    >
      <TimePowerZones
        powerZoneBuckets={powerZoneBuckets}
        powerZones={powerZones}
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
        <Box ref={wrapperRef}>
          <Dropdown isOpen={isMenuOpen}>
            <Box
              onClick={() => {
                Transforms.removeNodes(editor, { at: path });
                setIsMenuOpen(false);
              }}
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

export default TimePowerZonesWrapper;
