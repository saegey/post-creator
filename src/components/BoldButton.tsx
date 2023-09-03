import { IconButton } from 'theme-ui';
import { ReactEditor } from 'slate-react';
import { Editor } from 'slate';

const toggleBold = ({ editor }: { editor: ReactEditor }) => {
  const marks = Editor.marks(editor);
  const isActive = marks ? marks['bold'] === true : false;
  if (isActive) {
    Editor.removeMark(editor, 'bold');
  } else {
    Editor.addMark(editor, 'bold', true);
  }
};

const BoldButton = ({ editor }: { editor: ReactEditor }) => {
  return (
    <IconButton
      aria-label='Toggle bold text'
      onClick={() => toggleBold({ editor })}
      variant='iconButton'
    >
      <svg
        className='menu-button'
        fill='var(--theme-ui-colors-text)'
        width='18px'
        height='16px'
        viewBox='0 0 1920 1920'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M480.286 822.857h548.571c151.269 0 274.286-123.017 274.286-274.286 0-151.268-123.017-274.285-274.286-274.285H480.286v548.571Zm0 822.857H1166c151.269 0 274.286-123.017 274.286-274.285 0-151.269-123.017-274.286-274.286-274.286H480.286v548.571ZM1166 1920H206V0h822.857c302.537 0 548.572 246.034 548.572 548.571 0 134.263-48.549 257.418-128.778 352.732 159.223 96.137 265.92 270.994 265.92 470.126 0 302.537-246.034 548.571-548.571 548.571Z'
          fillRule='evenodd'
        />
      </svg>
    </IconButton>
  );
};

export default BoldButton;
