import { IconButton } from 'theme-ui';
import { ReactEditor } from 'slate-react';
import { Transforms, Descendant } from 'slate';
import { PostContext } from '../PostContext';
import React from 'react';

const addMap = (editor: ReactEditor) => {
  Transforms.insertNodes(editor, [
    { type: 'visualOverview', children: [{ text: '' }] } as Descendant,
  ]);
};

const MapButton = ({ editor }: { editor: ReactEditor }) => {
  const { gpxFile } = React.useContext(PostContext);

  const color = gpxFile
    ? `var(--theme-ui-colors-text)`
    : `var(--theme-ui-colors-iconButtonDisabled)`;
  return (
    <IconButton
      aria-label='Map button'
      disabled={gpxFile ? false : true}
      onClick={() => addMap(editor)}
      variant='iconButton'
    >
      <svg
        className='menu-button'
        width='24px'
        height='24px'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M12 6H12.01M9 20L3 17V4L5 5M9 20L15 17M9 20V14M15 17L21 20V7L19 6M15 17V14M15 6.2C15 7.96731 13.5 9.4 12 11C10.5 9.4 9 7.96731 9 6.2C9 4.43269 10.3431 3 12 3C13.6569 3 15 4.43269 15 6.2Z'
          stroke={color}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </IconButton>
  );
};

export default MapButton;
