import { IconButton } from 'theme-ui';
import { BaseEditor } from 'slate';
import React from 'react';

import { isMarkActive, toggleMark } from '../utils/SlateUtilityFunctions';
import BoldIcon from './BoldIcon';

const BoldButton = ({
  editor,
  format,
}: {
  editor: BaseEditor;
  format: string;
}) => {
  return (
    <IconButton
      onMouseDown={(e) => {
        e.preventDefault();
        toggleMark(editor, 'bold');
      }}
      title={'Toggle Bold Text'}
      key='bold1'
      variant='iconButton'
    >
      <BoldIcon active={isMarkActive(editor, format)} />
    </IconButton>
  );
};

export default BoldButton;
