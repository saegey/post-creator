import { Flex, Box, Alert, Close } from 'theme-ui';
import { ReactEditor } from 'slate-react';
import React from 'react';
import { Descendant, Transforms } from 'slate';
import Link from 'next/link';

import AddImage from './AddImage';
import OptionsButton from './OptionsButton';
import ActivitySettings from './ActivitySettings';
import HeadingButton from './HeadingButton';
import GraphButton from './GraphButton';
import ImagesButton from './ImagesButton';
import SaveButton from './SaveButton';
import BoldButton from './BoldButton';
import PreviewButton from './PreviewButton';
import { PostContext } from '../PostContext';
import { EditorContext } from './EditorContext';
import BulletListIcon from './BulletListIcon';
import ShareButton from './ShareButton';

const PostMenu = ({ editor }: { editor: ReactEditor }) => {
  const [isSaving, setIsSaving] = React.useState(false);
  const [savedMessage, setSavedMessage] = React.useState(false);
  const [isHoverSettings, setIsHoverSettings] = React.useState(false);
  const { id } = React.useContext(PostContext);
  const { setIsImageModalOpen, isImageModalOpen } =
    React.useContext(EditorContext);

  React.useEffect(() => {
    setSavedMessage(false);
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

  return (
    <>
      {isImageModalOpen && (
        <AddImage
          callback={insertImage}
          setIsOpen={setIsImageModalOpen}
          isOpen={isImageModalOpen}
        />
      )}

      <Flex
        sx={{
          gap: '5px',
          position: 'sticky',
          top: '0px',
          backgroundColor: 'background',
          paddingY: '10px',
          paddingX: '10px',
          zIndex: 9,
          borderBottomStyle: 'solid',
          borderBottomWidth: '1px',
          borderBottomColor: 'divider',
          // boxShadow: '1px 4px 5px var(--theme-ui-colors-menuBoxShadow)',
          width: '100vw',
        }}
      >
        <BoldButton editor={editor} />
        <HeadingButton editor={editor} />
        <BulletListIcon editor={editor} />
        <ImagesButton onClick={() => setIsImageModalOpen(true)} />
        <GraphButton />
        <SaveButton
          setIsSaving={setIsSaving}
          isSaving={isSaving}
          editor={editor}
          setSavedMessage={setSavedMessage}
        />
        <Link href={`/posts/${id}`} rel='noopener noreferrer' target='_blank'>
          <PreviewButton />
        </Link>
        <ShareButton />

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
          {isHoverSettings && (
            <ActivitySettings
              isOpen={isHoverSettings}
              setIsOpen={setIsHoverSettings}
              setSavedMessage={setSavedMessage}
            />
          )}
        </Box>
      </Flex>
      {savedMessage && (
        <Alert
          sx={{
            borderRadius: 0,
            position: 'sticky',
            width: '100vw',
            top: '55px',
            zIndex: 3,
            backgroundColor: 'alertBackground',
            color: 'alertForeground',
            fontWeight: '400',
          }}
        >
          Post saved successfully.
          <Close ml='auto' mr={-2} onClick={() => setSavedMessage(false)} />
        </Alert>
      )}
    </>
  );
};

export default PostMenu;
