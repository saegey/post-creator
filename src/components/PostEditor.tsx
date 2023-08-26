import { Slate, Editable, withReact } from 'slate-react';
import React from 'react';
import { createEditor } from 'slate';

import renderElement from '../../src/utils/RenderElement';
import PostMenu from './PostMenu';
import { PostContext } from '../PostContext';

const PostEditor = ({ initialState }) => {
  const [editor] = React.useState(() => withReact(createEditor()));
  const { setTitle, title, postLocation, setPostLocation } =
    React.useContext(PostContext);

  return (
    <>
      <h1
        style={{ marginBottom: '20px' }}
        contentEditable='true'
        suppressContentEditableWarning={true}
        onBlur={(event) => {
          // console.log('tst');
          setTitle(event.target.textContent);
        }}
      >
        {title}
      </h1>
      <h2
        contentEditable='true'
        suppressContentEditableWarning={true}
        onBlur={(event) => {
          // console.log('tst');
          setPostLocation(event.target.textContent);
        }}
      >
        {postLocation}
      </h2>
      <PostMenu editor={editor} />
      <Slate editor={editor} initialValue={initialState}>
        <Editable
          spellCheck
          autoFocus
          renderElement={renderElement}
          style={{ padding: '2px' }}
        />
      </Slate>
    </>
  );
};

export default PostEditor;
