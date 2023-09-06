import React from 'react';
import { useSlateStatic, ReactEditor } from 'slate-react';
import dynamic from 'next/dynamic';
import { Box, Close, Spinner, Flex } from 'theme-ui';
import { Transforms } from 'slate';

import { PostContext } from '../PostContext';

const VisualOverview = dynamic(import('./VisualOverview'), {
  ssr: false,
}); // Async API cannot be server-side rendered

const VisualOverviewWrapper = ({ element }) => {
  const { activity } = React.useContext(PostContext);
  const editor = useSlateStatic() as ReactEditor;
  const path = ReactEditor.findPath(editor, element);

  if (!activity || activity.length === 0) {
    return (
      <Flex sx={{ width: '100vw', backgroundColor: '#ddd' }}>
        <Spinner sx={{ margin: 'auto' }} />
      </Flex>
    );
  }

  const fixedData = activity.map((a) => {
    return { ...a, g: a.g !== null ? a.g : 0 };
  });

  return (
    <Box sx={{ position: 'relative' }} contentEditable={false}>
      <VisualOverview
        activity={fixedData}
        token={
          'pk.eyJ1Ijoic2FlZ2V5IiwiYSI6ImNsYmU1amxuYTA3emEzbm81anNmdXo4YnIifQ.uxutNvuagvWbw1h-RBfmPg'
        }
      />
      <Box sx={{ position: 'absolute', top: 0, left: 0 }}>
        <Close onClick={() => Transforms.removeNodes(editor, { at: path })} />
      </Box>
    </Box>
  );
};

export default VisualOverviewWrapper;
