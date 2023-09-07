import React from 'react';

import { EditorContext } from './EditorContext';
import TooltipButton from './TooltipButton';

const GraphButton = () => {
  const { setIsGraphMenuOpen, isGraphMenuOpen } =
    React.useContext(EditorContext);

  return (
    <TooltipButton
      onClick={() => {
        if (isGraphMenuOpen) {
          setIsGraphMenuOpen(false);
        } else {
          setIsGraphMenuOpen(true);
        }
      }}
      title='Add Widget'
      tooltipText={'Add Component'}
    >
      <svg
        width='100%'
        height='100%'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M3.75 4.5L4.5 3.75H10.5L11.25 4.5V10.5L10.5 11.25H4.5L3.75 10.5V4.5ZM5.25 5.25V9.75H9.75V5.25H5.25ZM13.5 3.75L12.75 4.5V10.5L13.5 11.25H19.5L20.25 10.5V4.5L19.5 3.75H13.5ZM14.25 9.75V5.25H18.75V9.75H14.25ZM17.25 20.25H15.75V17.25H12.75V15.75H15.75V12.75H17.25V15.75H20.25V17.25H17.25V20.25ZM4.5 12.75L3.75 13.5V19.5L4.5 20.25H10.5L11.25 19.5V13.5L10.5 12.75H4.5ZM5.25 18.75V14.25H9.75V18.75H5.25Z'
          fill='var(--theme-ui-colors-text)'
        />
      </svg>
      {/* <svg
        width='100%'
        height='100%'
        className='menu-button'
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
      </svg> */}
    </TooltipButton>
  );
};

export default GraphButton;
