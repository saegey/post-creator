import { Flex, Box, Alert, Close, IconButton } from 'theme-ui';
import { ReactEditor } from 'slate-react';
import React from 'react';
import Link from 'next/link';
import { useSlate } from 'slate-react';

import ActivitySettings from './ActivitySettings';
import HeadingButton from './HeadingButton';
import GraphButton from './GraphButton';
import ImagesButton from './ImagesButton';
import SaveButton from './SaveButton';
import BoldButton from './BoldButton';
import PreviewButton from './PreviewButton';
import { PostContext } from './PostContext';
import { EditorContext } from './EditorContext';
import BulletListIcon from './BulletListIcon';
import ShareButton from './ShareButton';
import SettingsIcon from './SettingsIcon';
import { isBlockActive } from '../utils/SlateUtilityFunctions';
import LinkButton from './LinkButton';

const PostMenu = () => {
  const [isSaving, setIsSaving] = React.useState(false);
  const [savedMessage, setSavedMessage] = React.useState(false);
  const [isHoverSettings, setIsHoverSettings] = React.useState(false);
  const { id } = React.useContext(PostContext);
  const { setIsImageModalOpen, setIsGraphMenuOpen } =
    React.useContext(EditorContext);

  const editor = useSlate();

  React.useEffect(() => {
    setSavedMessage(false);
  }, [id]);

  return (
    <>
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
        <BoldButton editor={editor} format='bold' />
        <HeadingButton editor={editor} format='heading-two' />
        <BulletListIcon editor={editor} />
        <LinkButton
          // key={element.id}
          active={isBlockActive(editor, 'link')}
          editor={editor}
        />
        <ImagesButton
          onClick={() => {
            setIsGraphMenuOpen(false);
            setIsImageModalOpen(true);
          }}
        />
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
              onClick={() => {
                setIsImageModalOpen(false);
                setIsHoverSettings(true);
              }}
            >
              <IconButton
                aria-label='Toggle options'
                variant='iconButton'
                type='button'
              >
                <SettingsIcon />
              </IconButton>
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
      {/* {savedMessage && (
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
      )} */}
    </>
  );
};

export default PostMenu;
