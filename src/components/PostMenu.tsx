import { Flex, Box, IconButton, Text, Spinner, Button } from 'theme-ui';
import React from 'react';
import Link from 'next/link';
import { useSlate } from 'slate-react';
import { API } from 'aws-amplify';

import ActivitySettings from './ActivitySettings';
import HeadingButton from './HeadingButton';
import GraphButton from './GraphButton';
import ImagesButton from './ImagesButton';
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
  // const [isSaving, setIsSaving] = React.useState(false);
  const { isSavingPost, setIsSavingPost, savingStatus, setSavingStatus } =
    React.useContext(EditorContext);
  const [savedMessage, setSavedMessage] = React.useState(false);
  const [isPublishing, setIsPublishing] = React.useState(false);

  const { id } = React.useContext(PostContext);
  const {
    setIsImageModalOpen,
    setIsGraphMenuOpen,
    isSettingsModalOpen,
    setIsSettingsModalOpen,
    isPublishedConfirmationOpen,
    setIsPublishedConfirmationOpen,
  } = React.useContext(EditorContext);

  const editor = useSlate();

  React.useEffect(() => {
    setSavedMessage(false);
  }, [id]);

  const publishPost = async (event) => {
    setIsPublishing(true);

    const response = await API.post('api12660653', '/post/publish', {
      response: true,
      body: {
        postId: id,
        origin: `${origin}/`,
      },
    });
    setIsPublishing(false);
    setIsPublishedConfirmationOpen(true);
  };

  return (
    <>
      <Box
        sx={{
          display: ['block', 'flex', 'flex'],
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
        <Link href={`/posts/${id}`} rel='noopener noreferrer' target='_blank'>
          <PreviewButton />
        </Link>
        <ShareButton />
        <Text
          sx={{
            fontSize: '16px',
            lineHeight: '16px',
            /* align-content: center; */
            marginY: 'auto',
            marginX: '8px',
          }}
        >
          {savingStatus}
        </Text>

        <Box sx={{ marginLeft: 'auto' }}>
          <Flex sx={{ height: '100%', gap: ['5px', '20px', '20px'] }}>
            <Button
              variant='primaryButton'
              type='button'
              onClick={publishPost}
              sx={{ height: ['32px', '30px', '30px'], lineHeight: '14px' }}
            >
              <Flex sx={{ gap: '10px' }}>
                <Text as='span'>Publish</Text>
                {isPublishing && (
                  <Spinner sx={{ size: '20px', color: 'white' }} />
                )}
              </Flex>
            </Button>
            <Box
              sx={{
                marginY: 'auto',
                justifyContent: 'center',
              }}
              onClick={() => {
                setIsImageModalOpen(false);
                setIsSettingsModalOpen(true);
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
          {isSettingsModalOpen && (
            <ActivitySettings
              // isOpen={isSettingsModalOpen}
              // setIsOpen={set}
              setSavedMessage={setSavedMessage}
            />
          )}
        </Box>
      </Box>
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
