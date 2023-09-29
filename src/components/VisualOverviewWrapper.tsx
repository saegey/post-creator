import React from 'react';
import { useSlateStatic, ReactEditor } from 'slate-react';
import dynamic from 'next/dynamic';
import { Box, Close, Spinner, Flex } from 'theme-ui';
import { Transforms } from 'slate';

import { PostContext } from './PostContext';
import OptionsButton from './OptionsButton';
import Dropdown from './Dropdown';
import { useClickOutside } from '../utils/ux';

const VisualOverview = dynamic(import('./VisualOverview'), {
  ssr: false,
}); // Async API cannot be server-side rendered

const VisualOverviewWrapper = ({ element }) => {
  const { activity } = React.useContext(PostContext);
  const editor = useSlateStatic() as ReactEditor;
  const path = ReactEditor.findPath(editor, element);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const wrapperRef = React.useRef('menu');
  useClickOutside(wrapperRef, (e) => {
    setIsMenuOpen(false);
    e.stopPropagation();
  });

  if (!activity || activity.length === 0) {
    return (
      <Flex sx={{ width: '900px', backgroundColor: '#ddd' }}>
        <Spinner sx={{ margin: 'auto' }} />
      </Flex>
    );
  }

  const fixedData = activity.map((a, i) => {
    return {
      ...a,
      g: a.g !== null ? a.g : 0,
      d: a.d === 0 ? (a.d = activity[i - 1] ? activity[i - 1]?.d : 0) : a.d,
    };
  });

  return (
    <Box
      sx={{ position: 'relative', maxWidth: '900px', marginX: 'auto' }}
      contentEditable={false}
    >
      <VisualOverview
        activity={fixedData}
        token={
          'pk.eyJ1Ijoic2FlZ2V5IiwiYSI6ImNsYmU1amxuYTA3emEzbm81anNmdXo4YnIifQ.uxutNvuagvWbw1h-RBfmPg'
        }
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

export default VisualOverviewWrapper;
