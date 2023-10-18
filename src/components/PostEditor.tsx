import { Slate, Editable, withReact } from 'slate-react';
import { API, graphqlOperation, Storage } from 'aws-amplify';
import { GraphQLResult, GraphQLSubscription } from '@aws-amplify/api';
import React from 'react';
import { createEditor, Editor } from 'slate';
import { Flex, Box } from 'theme-ui';
import { withHistory } from 'slate-history';
import { Descendant, Transforms } from 'slate';

import renderElement, { renderLeaf } from '../../src/utils/RenderElement';
import PostMenu from './PostMenu';
import { PostContext } from './PostContext';
import { EditorContext } from './EditorContext';
import SkeletonPost from './SkeletonPost';
import { getActivity } from '../../src/actions/PostGet';
import GraphSelectorMenu from './GraphSelectorMenu';
import * as subscriptions from '../../src/graphql/subscriptions';
import UploadGpxModal from './UploadGpxModal';
import { OnUpdatePostSubscription } from '../API';
import ShareModal from './ShareModal';
import RaceResultsImport from './RaceResultsImport';
import AddImage from './AddImage';
import withLinks from './plugins/withLinks';
import withLayout from './withLayout';

const PostEditor = ({ postId, initialState }) => {
  const editor = React.useMemo(
    () => withLayout(withHistory(withLinks(withReact(createEditor())))),
    []
  );
  const [loading, setLoading] = React.useState(true);

  const {
    id,
    timeSeriesFile,
    setActivity,
    setPowerAnalysis,
    setComponents,
    setTimeInRed,
    setPowerZones,
    setPowerZoneBuckets,
    setHeroImage,
  } = React.useContext(PostContext);

  const {
    isGraphMenuOpen,
    isGpxUploadOpen,
    isRaceResultsModalOpen,
    setIsFtpUpdating,
    isImageModalOpen,
    setIsImageModalOpen,
    isShareModalOpen,
    setIsHeroImageModalOpen,
    isHeroImageModalOpen,
  } = React.useContext(EditorContext);

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
      next: ({ value }) => {
        if (
          !value.data?.onUpdatePost?.powerZoneBuckets ||
          !value.data?.onUpdatePost?.timeInRed ||
          !value.data?.onUpdatePost?.powerZones
        ) {
          return;
        }

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
      subscription.unsubscribe();
    };
  }, []);

  const getData = async () => {
    if (timeSeriesFile) {
      // console.log(timeSeriesFile);
      const result = await Storage.get(timeSeriesFile, {
        download: true,
        // customPrefix: {
        //   public: 'private/us-east-1:29b6299d-6fd7-44d5-a53e-2a94fdf5401d/',
        // },
        level: 'private',
      });
      const timeSeriesData = await new Response(result.Body).json();
      // console.log(result);

      const activity = await getActivity(timeSeriesData);
      setPowerAnalysis(timeSeriesData.powerAnalysis);
      return activity;
    } else {
      console.log('no timeserriees files');
    }
  };

  React.useEffect(() => {
    getData().then((d) => {
      setActivity(d as any);
    });
  }, [id]);

  const insertImage = ({ selectedImage }) => {
    Transforms.insertNodes(editor, [
      {
        type: 'image',
        asset_id: selectedImage?.asset_id,
        public_id: selectedImage?.public_id,
        children: [{ text: '' }],
        void: true,
      } as Descendant,
      { type: 'text', children: [{ text: '' }] } as Descendant,
    ]);
  };

  const addImage = ({ selectedImage }) => {
    setHeroImage(selectedImage);
    setIsHeroImageModalOpen(false);
  };

  return (
    <>
      {loading ? (
        <SkeletonPost />
      ) : (
        <>
          <Flex>
            {isGraphMenuOpen && <GraphSelectorMenu editor={editor} />}
            {isImageModalOpen && (
              <AddImage
                callback={insertImage}
                setIsOpen={setIsImageModalOpen}
                isOpen={isImageModalOpen}
              />
            )}
            {isHeroImageModalOpen && (
              <AddImage
                setIsOpen={setIsHeroImageModalOpen}
                isOpen={isHeroImageModalOpen}
                callback={addImage}
              />
            )}
            {isGpxUploadOpen && <UploadGpxModal />}
            {isShareModalOpen && <ShareModal postId={postId} />}
            {isRaceResultsModalOpen && <RaceResultsImport editor={editor} />}
            <Box
              sx={{
                // marginTop: '20px',
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
                padding: '0px',
                paddingBottom: '200px',
              }}
            >
              <Slate
                editor={editor}
                initialValue={initialState}
                onChange={(newValue) => {
                  setComponents(newValue);
                }}
                // style={{ marginBottom: '200px' }}
              >
                <PostMenu />
                <Editable
                  spellCheck
                  autoFocus
                  renderElement={renderElement}
                  renderLeaf={renderLeaf}
                  style={{ paddingBottom: '200px' }}
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
