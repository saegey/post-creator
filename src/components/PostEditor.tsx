import { Slate, Editable, withReact } from 'slate-react';
import { API, graphqlOperation } from 'aws-amplify';
import { GraphQLResult, GraphQLSubscription } from '@aws-amplify/api';
import React from 'react';
import { createEditor, Editor } from 'slate';
import { Flex, Box } from 'theme-ui';
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
import UploadGpxModal from './UploadGpxModal';
import { OnUpdatePostSubscription } from '../API';
import ShareModal from './ShareModal';
import RaceResultsPreview from './RaceResultsPreview';

const PostEditor = ({ postId, initialState }) => {
  const [editor] = React.useState(() => withHistory(withReact(createEditor())));
  const [loading, setLoading] = React.useState(true);

  const {
    id,
    setActivity,
    setPowerAnalysis,
    components,
    setTimeInRed,
    setPowerZones,
    setPowerZoneBuckets,
  } = React.useContext(PostContext);
  const { setIsFtpUpdating, isPhotoCaptionOpen, isShareModalOpen } =
    React.useContext(EditorContext);

  const { isGraphMenuOpen, isGpxUploadOpen, isRaceResultsModalOpen } =
    React.useContext(EditorContext);

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
        if (
          !value.data?.onUpdatePost?.powerZoneBuckets ||
          !value.data?.onUpdatePost?.timeInRed ||
          !value.data?.onUpdatePost?.powerZones
        ) {
          return;
        }
        // console.log({ provider, value });

        setTimeInRed(value.data?.onUpdatePost?.timeInRed);
        setPowerZoneBuckets(
          JSON.parse(value.data?.onUpdatePost?.powerZoneBuckets)
        );
        setPowerZones(JSON.parse(value.data?.onUpdatePost?.powerZones));
        setIsFtpUpdating(false);
      },
      error: (error) => console.warn(error),
    });

    return () => {
      console.log('post subscription destroy');
      subscription.unsubscribe();
    };
  }, []);

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
          <PostMenu editor={editor} />
          <Flex>
            {isGraphMenuOpen && <GraphSelectorMenu editor={editor} />}
            {isGpxUploadOpen && <UploadGpxModal />}
            {isShareModalOpen && <ShareModal postId={postId} />}
            {isRaceResultsModalOpen && <RaceResultsPreview />}
            <Box
              sx={{
                marginTop: '20px',
                // maxWidth: '900px',
                minWidth: [null, null, '900px'],
                marginLeft: isGraphMenuOpen
                  ? ['20px', '20px', 'auto']
                  : [0, 0, 'auto'],
                marginRight: isGraphMenuOpen
                  ? ['20px', '20px', 'auto']
                  : [0, 0, 'auto'],
                marginBottom: '50px',
                width: ['100%', null, null],
                backgroundColor: 'background',
                borderRadius: '10px',
                padding: '10px',
              }}
            >
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
