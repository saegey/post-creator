import { IconButton } from 'theme-ui';
import { ReactEditor } from 'slate-react';
import { Transforms, Editor, Element as SlateElement } from 'slate';

const toggleHeading = ({ editor }: { editor: ReactEditor }) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n['type'] === 'heading-two',
    })
  );

  if (match) {
    let newProperties: Partial<SlateElement>;
    newProperties = { type: 'paragraph' } as any;
    Transforms.setNodes<SlateElement>(editor, newProperties);
  } else {
    let newProperties: Partial<SlateElement>;
    newProperties = { type: 'heading-two' } as any;
    Transforms.setNodes<SlateElement>(editor, newProperties);
  }
};

const HeadingButton = ({ editor }: { editor: ReactEditor }) => {
  return (
    <IconButton
      aria-label='Toggle header'
      onClick={() => toggleHeading({ editor })}
      variant='iconButton'
    >
      <svg
        className='menu-button'
        fill='var(--theme-ui-colors-text)'
        width='100%'
        height='100%'
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M18 20V4h-3v6H9V4H6v16h3v-7h6v7z' />
      </svg>
    </IconButton>
  );
};

export default HeadingButton;
