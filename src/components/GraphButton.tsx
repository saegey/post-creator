import { IconButton } from 'theme-ui';
import { ReactEditor } from 'slate-react';
import { Transforms, Descendant } from 'slate';
import React from 'react';
import { PostContext } from '../PostContext';

const addGraph = (editor: ReactEditor) => {
  Transforms.insertNodes(editor, [
    {
      type: 'powergraph',
      children: [{ text: '' }],
      void: true,
    } as Descendant,
    { type: 'text', children: [{ text: '' }] } as Descendant,
  ]);
};

const GraphButton = ({ editor }) => {
  const { gpxFile } = React.useContext(PostContext);

  return (
    <IconButton
      aria-label='Graph Button'
      disabled={gpxFile ? false : true}
      onClick={() => addGraph(editor)}
      sx={{
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'buttonBorderColor',
        backgroundColor: gpxFile
          ? 'iconButtonBackground'
          : 'iconButtonBackgroundDisabled',
        '&:hover': {
          backgroundColor: gpxFile ? 'buttonBackgroundHoverColor' : '',
        },
      }}
    >
      <svg
        width='24px'
        height='24px'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M4 5V19C4 19.5523 4.44772 20 5 20H19'
          stroke='var(--theme-ui-colors-text)'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M18 9L13 13.9999L10.5 11.4998L7 14.9998'
          stroke='var(--theme-ui-colors-text)'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </IconButton>
  );
};

export default GraphButton;
