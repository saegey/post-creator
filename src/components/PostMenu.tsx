import { Button, Flex } from 'theme-ui';
import { ReactEditor } from 'slate-react';
import React from 'react';
import { Descendant, Transforms } from 'slate';

import UploadGpxModal from './UploadGpxModal';
import AddImage from './AddImage';
import { PostContext } from '../PostContext';
import { PostSaveComponents } from '../actions/PostSave';
import BlackBox from './BlackBox';

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
  const [uploadModal, setUploadModal] = React.useState(false);
  const [addImageModal, setAddImageModal] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const { id, title, gpxFile, postLocation } = React.useContext(PostContext);

  const save = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    await PostSaveComponents({
      postId: id,
      title: title,
      postLocation: postLocation,
      components: editor.children,
    });

    setIsSaving(false);
  };

  return (
    <>
      {uploadModal && <UploadGpxModal openModal={setUploadModal} />}
      {addImageModal && <AddImage isOpen={setAddImageModal} editor={editor} />}
      {isSaving && (
        <BlackBox>
          <p>saving</p>
        </BlackBox>
      )}

      <Flex sx={{ marginBottom: '20px', gap: '10px' }}>
        <Button
          disabled={gpxFile ? false : true}
          onClick={() => addGraph(editor)}
        >
          + Power Graph
        </Button>
        <Button onClick={() => setAddImageModal(true)}>+ Image </Button>
        <Button onClick={save}>Save</Button>
        <Button disabled={true}>Delete</Button>
        <Button onClick={() => setUploadModal(true)}>Upload GPX</Button>
        <Button
          onClick={() => addMap(editor)}
          disabled={gpxFile ? false : true}
        >
          Add Map
        </Button>
      </Flex>
    </>
  );
};

export default PostMenu;
