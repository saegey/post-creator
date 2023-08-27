import { Slate, Editable, withReact } from 'slate-react';
import React from 'react';
import { createEditor } from 'slate';
import { Box, Flex, Text } from 'theme-ui';

import renderElement from '../../src/utils/RenderElement';
import PostMenu from './PostMenu';
import { PostContext } from '../PostContext';
import SkeletonPost from './SkeletonPost';

const PostEditor = ({ initialState }) => {
  const [editor] = React.useState(() => withReact(createEditor()));
  const [loading, setLoading] = React.useState(true);

  const { setTitle, title, postLocation, setPostLocation } =
    React.useContext(PostContext);

  React.useEffect(() => {
    console.log('use eeff', initialState);
    if (initialState) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [initialState]);

  return (
    <>
      {loading ? (
        <SkeletonPost />
      ) : (
        <>
          <PostMenu editor={editor} />
          <div
            style={{
              marginTop: '0px',
              maxWidth: '900px',
              marginLeft: 'auto',
              marginRight: 'auto',
              backgroundColor: 'white',
              borderRadius: '10px',
              border: '1px dotted #bcbcbc',
              padding: '10px',
            }}
          >
            <Flex>
              <Text
                as='h1'
                contentEditable='true'
                suppressContentEditableWarning={true}
                onBlur={(event) => {
                  setTitle(event.target.textContent);
                }}
                sx={{ width: '100%' }}
              >
                {title}
              </Text>
            </Flex>
            <h2
              contentEditable='true'
              suppressContentEditableWarning={true}
              onBlur={(event) => {
                setPostLocation(event.target.textContent);
              }}
            >
              {postLocation}
            </h2>
            <Slate editor={editor} initialValue={initialState}>
              <Editable
                spellCheck
                autoFocus
                renderElement={renderElement}
                style={{ padding: '2px' }}
              />
            </Slate>
          </div>
        </>
      )}
    </>
  );
};

export default PostEditor;
