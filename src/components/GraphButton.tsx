import { IconButton } from 'theme-ui';
import React from 'react';

import { PostContext } from '../PostContext';
import { EditorContext } from './EditorContext';
import TooltipButton from './TooltipButton';

const GraphButton = ({ editor }) => {
  const { gpxFile } = React.useContext(PostContext);

  const { setIsGraphMenuOpen } = React.useContext(EditorContext);
  // const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const color = gpxFile
    ? `var(--theme-ui-colors-text)`
    : `var(--theme-ui-colors-iconButtonDisabled)`;

  return (
    <TooltipButton
      onClick={() => setIsGraphMenuOpen(true)}
      title='Add Widget'
      tooltipText={'Add Component'}
      disabled={gpxFile ? false : true}
    >
      {/* <IconButton
        aria-label='Graph Button'
        disabled={gpxFile ? false : true}
        onClick={() => setIsGraphMenuOpen(true)}
        variant='iconButton'
      > */}
      <svg
        width='100%'
        height='100%'
        className='menu-button'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M4 5V19C4 19.5523 4.44772 20 5 20H19'
          stroke={color}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M18 9L13 13.9999L10.5 11.4998L7 14.9998'
          stroke={color}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
      {/* </IconButton> */}
    </TooltipButton>
  );
};

export default GraphButton;
