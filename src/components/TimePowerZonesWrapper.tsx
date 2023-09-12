import { Box, Close } from 'theme-ui';
import { Transforms } from 'slate';
import { useSlateStatic, ReactEditor } from 'slate-react';
import React from 'react';

import TimePowerZones from './TimePowerZones';
import { PostContext } from '../PostContext';
import Dropdown from './Dropdown';
import OptionsButton from './OptionsButton';

const TimePowerZonesWrapper = ({ element }) => {
  const editor = useSlateStatic() as ReactEditor;
  const path = ReactEditor.findPath(editor, element);
  const { powerZones, powerZoneBuckets } = React.useContext(PostContext);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

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
          onClick={() =>
            setTimeout(() => {
              if (isMenuOpen) {
                setIsMenuOpen(false);
              } else {
                setIsMenuOpen(true);
              }
            }, 10)
          }
        />
        <Dropdown isOpen={isMenuOpen}>
          <Box
            onClick={() =>
              setTimeout(() => {
                Transforms.removeNodes(editor, { at: path });
                setIsMenuOpen(false);
              }, 10)
            }
            variant='boxes.dropdownMenuItem'
          >
            Remove
          </Box>
        </Dropdown>
      </Box>
    </Box>
  );
};

export default TimePowerZonesWrapper;
