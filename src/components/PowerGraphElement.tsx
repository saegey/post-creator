import { useSlateStatic, ReactEditor } from 'slate-react';
import { Transforms } from 'slate';
import { Box, Flex, Close } from 'theme-ui';
import React from 'react';

import { PowerCurveGraph } from './PowerCurveGraph';
import { PostContext } from './PostContext';
import OptionsButton from './OptionsButton';
import Dropdown from './Dropdown';
import { useClickOutside } from '../utils/ux';

const PowerGraph = ({ element }) => {
  const { powerAnalysis, currentFtp } = React.useContext(PostContext);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const editor = useSlateStatic() as ReactEditor;
  const path = ReactEditor.findPath(editor, element);

  const wrapperRef = React.useRef('menu');
  useClickOutside(wrapperRef, (e) => {
    setIsMenuOpen(false);
    e.stopPropagation();
  });

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
        marginX: 'auto',
        maxWidth: '690px',
        backgroundColor: 'activityOverviewBackgroundColor',
        borderRadius: '5px',
        padding: ['10px', '20px', '20px'],
        position: 'relative',
        marginY: ['20px', '60px', '60px'],
      }}
      contentEditable={false}
    >
      <Box sx={{ width: '100%', height: ['250px', '450px', '450px'] }}>
        <PowerCurveGraph
          ftp={currentFtp ? Number(currentFtp) : 0}
          data={graphData as any}
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

export default PowerGraph;
