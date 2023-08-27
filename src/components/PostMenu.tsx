import { Button, Flex, Box } from 'theme-ui';
import { ReactEditor } from 'slate-react';
import React from 'react';
import { Descendant, Transforms } from 'slate';

// import UploadGpxModal from './UploadGpxModal';
import AddImage from './AddImage';
import { PostContext } from '../PostContext';
import { PostSaveComponents } from '../actions/PostSave';
import BlackBox from './BlackBox';
import OptionsButton from './OptionsButton';
import ActivitySettings from './ActivitySettings';

const addGraph = (editor: ReactEditor) => {
  Transforms.insertNodes(editor, [
    {
      type: 'powergraph',
      children: [{ text: '' }],
      void: true,
    } as Descendant,
    { type: 'text', children: [{ text: '' }] } as Descendant,
  ]);
};

const deletePost = () => {
  //   try {
  //   await API.graphql({
  //     authMode: 'AMAZON_COGNITO_USER_POOLS',
  //     query: deletePost,
  //     variables: {
  //       input: { id: post.id },
  //     },
  //   });
  //   window.location.href = '/';
  // } catch ({ errors }) {
  //   console.error(...errors);
  //   throw new Error(errors[0].message);
  // }
};

const addMap = (editor: ReactEditor) => {
  Transforms.insertNodes(editor, [
    { type: 'visualOverview', children: [{ text: '' }] } as Descendant,
  ]);
};

const PostMenu = ({ editor }: { editor: ReactEditor }) => {
  // const [uploadModal, setUploadModal] = React.useState(false);
  const [addImageModal, setAddImageModal] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const { id, title, gpxFile, postLocation, stravaUrl, resultsUrl } =
    React.useContext(PostContext);
  const [isHoverSettings, setIsHoverSettings] = React.useState(false);

  const save = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    await PostSaveComponents({
      postId: id,
      title: title,
      postLocation: postLocation,
      components: editor.children,
      stravaUrl: stravaUrl,
      resultsUrl: resultsUrl,
    });

    setIsSaving(false);
  };

  return (
    <>
      {/* {uploadModal && <UploadGpxModal openModal={setUploadModal} />} */}
      {addImageModal && <AddImage isOpen={setAddImageModal} editor={editor} />}
      {isSaving && (
        <BlackBox>
          <p>saving</p>
        </BlackBox>
      )}

      <Flex
        sx={{
          marginBottom: '20px',
          gap: '10px',
          position: 'sticky',
          top: '0px',
          backgroundColor: 'white',
          paddingY: '10px',
          paddingX: '10px',
          zIndex: 1000,
          borderBottomStyle: 'solid',
          borderBottomWidth: '2px',
          borderBottomColor: '#6c6c6c40',
        }}
      >
        <Button
          disabled={gpxFile ? false : true}
          onClick={() => addGraph(editor)}
        >
          Power Graph
        </Button>
        <Button onClick={() => setAddImageModal(true)}>Images </Button>
        <Button
          onClick={() => addMap(editor)}
          disabled={gpxFile ? false : true}
        >
          Map/Elev Profile
        </Button>
        <Button onClick={save}>Save</Button>
        <Box sx={{ marginLeft: 'auto' }}>
          <Flex sx={{ height: '100%' }}>
            <Box
              sx={{
                marginY: 'auto',
                justifyContent: 'center',
              }}
              onClick={() => setIsHoverSettings(true)}
            >
              <OptionsButton />
            </Box>
          </Flex>
          {isHoverSettings && <ActivitySettings isOpen={setIsHoverSettings} />}
        </Box>
      </Flex>
    </>
  );
};

export default PostMenu;
