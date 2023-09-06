import { Slate, Editable, withReact } from 'slate-react';
import { API, Amplify, graphqlOperation } from 'aws-amplify';
import { GraphQLResult, GraphQLSubscription } from '@aws-amplify/api';
import React from 'react';
import { createEditor, Editor, Transforms, Descendant } from 'slate';
import { Flex, Text, Box, Close } from 'theme-ui';
import { withHistory } from 'slate-history';

import renderElement, { renderLeaf } from '../../src/utils/RenderElement';
import PostMenu from './PostMenu';
import { PostContext } from '../PostContext';
import { EditorContext } from './EditorContext';
import SkeletonPost from './SkeletonPost';
import { getActivity } from '../../src/actions/PostGet';
import {
  getActivityQuery,
  getActivityQueryProps,
} from '../../src/graphql/customQueries';
import GraphSelectorMenu from './GraphSelectorMenu';
import * as subscriptions from '../../src/graphql/subscriptions';

// import { Amplify, API, graphqlOperation } from 'aws-amplify';
// import { GraphQLSubscription } from '@aws-amplify/api';
// import * as subscriptions from './graphql/subscriptions';
import { OnUpdatePostSubscription } from '../API';

// Stop receiving data updates from the subscription
// sub.unsubscribe();

const PostEditor = ({ postId, initialState }) => {
  const [editor] = React.useState(() => withHistory(withReact(createEditor())));
  const [loading, setLoading] = React.useState(true);
  // const subscription = React.useRef();

  const {
    setTitle,
    title,
    postLocation,
    setPostLocation,
    id,
    setActivity,
    setPowerAnalysis,
    components,
    setTimeInRed,
  } = React.useContext(PostContext);

  const { isGraphMenuOpen } = React.useContext(EditorContext);

  React.useEffect(() => {
    if (initialState) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [initialState]);

  React.useEffect(() => {
    const subscription = API.graphql<
      GraphQLSubscription<OnUpdatePostSubscription>
    >(graphqlOperation(subscriptions.onUpdatePost)).subscribe({
      next: ({ provider, value }) => {
        console.log({ provider, value });
        console.log(value.data?.onUpdatePost?.timeInRed);
        setTimeInRed(value.data?.onUpdatePost?.timeInRed);
      },
      error: (error) => console.warn(error),
    });

    return () => {
      console.log('post subscription destroy', subscription.unsubscribe());
    };
  }, []);

  // API.graphql(
  //     graphqlOperation(subscriptions.itemUpdated, {
  //        id: Id,
  //     }),
  //   ).subscribe({
  //     next: handleSubscription,
  //   });
  // Subscribe to creation of Todo

  React.useEffect(() => {
    editor.children = components as any;
    editor.onChange();
  }, [components]);

  const getData = async () => {
    const { data } = (await API.graphql({
      query: getActivityQuery,
      authMode: 'API_KEY',
      variables: {
        id: id,
      },
    })) as GraphQLResult<getActivityQueryProps>;
    if (!data || !data.getPost) {
      console.error('faileed too get activity data');
      return;
    }

    const activity = await getActivity(data.getPost);
    if (data.getPost.powerAnalysis) {
      setPowerAnalysis(JSON.parse(data.getPost.powerAnalysis));
    }

    return activity;
  };

  React.useEffect(() => {
    getData().then((d) => {
      setActivity(d as any);
    });
  }, [id]);

  return (
    <>
      {loading ? (
        <SkeletonPost />
      ) : (
        <>
          <PostMenu editor={editor} id={id} />
          <Flex>
            {isGraphMenuOpen && <GraphSelectorMenu editor={editor} />}
            <Box
              sx={{
                marginTop: '0px',
                maxWidth: '900px',
                minWidth: [null, null, '900px'],
                marginLeft: isGraphMenuOpen
                  ? ['20px', '20px', 'auto']
                  : [0, 0, 'auto'],
                marginRight: isGraphMenuOpen
                  ? ['20px', '20px', 'auto']
                  : [0, 0, 'auto'],
                marginBottom: 'auto',
                width: ['100%', null, null],
                backgroundColor: 'background',
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
            </Box>
          </Flex>
        </>
      )}
    </>
  );
};

export default PostEditor;
