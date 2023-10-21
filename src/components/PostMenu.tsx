import { Flex, Box, IconButton, Text, Spinner, Button } from 'theme-ui';
import React from 'react';
import Link from 'next/link';
import { useSlate } from 'slate-react';
import { API } from 'aws-amplify';

import PostSettings from './PostSettings';

import ImagesButton from './buttons/ImagesButton';
import BoldButton from './buttons/BoldButton';
import HeadingButton from './buttons/HeadingButton';
import NewComponentButton from './buttons/NewComponentButton';

import PreviewButton from './PreviewButton';
import { PostContext } from './PostContext';
import { EditorContext } from './EditorContext';
import BulletListIcon from './BulletListIcon';
import ShareButton from './ShareButton';
import SettingsIcon from './SettingsIcon';
import { isBlockActive } from '../utils/SlateUtilityFunctions';
import LinkButton from './LinkButton';

const PostMenu = () => {
  const [isPublishing, setIsPublishing] = React.useState(false);

  const { id } = React.useContext(PostContext);
  const {
    setIsImageModalOpen,
    setIsGraphMenuOpen,
    isSettingsModalOpen,
    setIsSettingsModalOpen,
    setIsPublishedConfirmationOpen,
    savingStatus,
  } = React.useContext(EditorContext);

  const editor = useSlate();

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
          width: '100vw',
        }}
      >
        <BoldButton editor={editor} format='bold' />
        <HeadingButton editor={editor} format='heading-two' />
        <BulletListIcon editor={editor} />
        <LinkButton active={isBlockActive(editor, 'link')} editor={editor} />
        <ImagesButton
          onClick={() => {
            setIsGraphMenuOpen(false);
            setIsImageModalOpen(true);
          }}
        />
        <NewComponentButton />
        <Link href={`/posts/${id}`} rel='noopener noreferrer' target='_blank'>
          <PreviewButton />
        </Link>
        <ShareButton />
        <Text
          sx={{
            fontSize: '16px',
            lineHeight: '16px',
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
                  <Spinner sx={{ size: '20px', color: 'spinnerButton' }} />
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
          {isSettingsModalOpen && <PostSettings />}
        </Box>
      </Box>
    </>
  );
};

export default PostMenu;
