import { Box, Close } from 'theme-ui';
import { Transforms } from 'slate';
import { useSlateStatic, ReactEditor } from 'slate-react';
import React from 'react';
import MatchesBurned from './MatchesBurned';
import Dropdown from './shared/Dropdown';
import OptionsButton from './OptionsButton';
import { useClickOutside } from '../utils/ux';

const MatchesBurnedWrapper = ({ element }) => {
  const editor = useSlateStatic() as ReactEditor;
  const path = ReactEditor.findPath(editor, element);
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
      <Box sx={{ marginTop: '35px' }}>
        <MatchesBurned
          data={[
            {
              averagePower: 900,
              totalJoules: 900,
              totalTime: 400,
              // vals: [],
              // startTime: 'blah',
            },
            {
              averagePower: 800,
              totalJoules: 2000,
              totalTime: 800,
              // vals: [],
              // startTime: 'blah',
            },
            {
              averagePower: 900,
              totalJoules: 900,
              totalTime: 400,
              // vals: [],
              // startTime: 'blah',
            },
            {
              averagePower: 900,
              totalJoules: 900,
              totalTime: 400,
              // vals: [],
              // startTime: 'blah',
            },
          ]}
        />
      </Box>
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
  );
};

export default MatchesBurnedWrapper;
