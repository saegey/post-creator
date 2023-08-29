import { Slate, Editable, withReact } from 'slate-react';
import { API } from 'aws-amplify';
import React from 'react';
import { createEditor, Editor, Transforms } from 'slate';
import { Box, Flex, Text } from 'theme-ui';
import { withHistory } from 'slate-history';

import renderElement, { renderLeaf } from '../../src/utils/RenderElement';
import PostMenu from './PostMenu';
import { PostContext } from '../PostContext';
import SkeletonPost from './SkeletonPost';
import { getActivity } from '../../src/actions/PostGet';
import { getActivityQuery } from '../../src/graphql/customQueries';

const PostEditor = ({ postId, initialState }) => {
  const [editor] = React.useState(() => withHistory(withReact(createEditor())));
  const [loading, setLoading] = React.useState(true);
  // console.log(initialState);

  const {
    setTitle,
    title,
    postLocation,
    setPostLocation,
    id,
    setActivity,
    activity,
    setPowerAnalysis,
    components,
  } = React.useContext(PostContext);
  console.log('post editor render', activity);

  React.useEffect(() => {
    if (initialState) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [initialState]);

  React.useEffect(() => {
    editor.children = components;
    editor.onChange();
  }, [components]);

  const getData = async () => {
    const { data } = await API.graphql({
      query: getActivityQuery,
      authMode: 'API_KEY',
      variables: {
        id: id,
      },
    });
    console.log('post editor - get Activity');
    const activity = await getActivity(data.getPost);
    setPowerAnalysis(JSON.parse(data.getPost.powerAnalysis));

    return activity;
  };

  React.useEffect(() => {
    getData().then((d) => {
      setActivity(d);
    });
  }, [id]);

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
                  console.log('blur h1');
                  if (event.target.textContent !== title) {
                    setTitle(event.target.textContent);
                  }
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
            <Slate
              editor={editor}
              initialValue={initialState}
              // onChange={(val) => {
              //   console.log(val);
              // }}
            >
              <Editable
                spellCheck
                autoFocus
                renderElement={renderElement}
                style={{ padding: '2px' }}
                onKeyDown={(event) => {
                  if (event.key === 'b' && event.metaKey) {
                    event.preventDefault();

                    const marks = Editor.marks(editor);
                    const isActive = marks ? marks['bold'] === true : false;

                    if (isActive) {
                      Editor.removeMark(editor, 'bold');
                    } else {
                      Editor.addMark(editor, 'bold', true);
                    }
                  }
                }}
                renderLeaf={renderLeaf}
              />
            </Slate>
          </div>
        </>
      )}
    </>
  );
};

export default PostEditor;
