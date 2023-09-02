import { Button, Flex, Box, Alert, Close } from 'theme-ui';
import { ReactEditor } from 'slate-react';
import React from 'react';

import AddImage from './AddImage';
import BlackBox from './BlackBox';
import OptionsButton from './OptionsButton';
import ActivitySettings from './ActivitySettings';
import HeadingButton from './HeadingButton';
import GraphButton from './GraphButton';
import ImagesButton from './ImagesButton';
import MapButton from './MapButton';
import SaveButton from './SaveButton';
import BoldButton from './BoldButton';

const PostMenu = ({ editor, id }: { editor: ReactEditor; id: string }) => {
  const [addImageModal, setAddImageModal] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [savedMessage, setSavedMessage] = React.useState(false);
  const [isHoverSettings, setIsHoverSettings] = React.useState(false);

  React.useEffect(() => {
    setSavedMessage(false);
  }, [id]);

  return (
    <>
      {addImageModal && <AddImage isOpen={setAddImageModal} editor={editor} />}

      <Flex
        sx={{
          gap: '5px',
          position: 'sticky',
          top: '0px',
          backgroundColor: 'background',
          paddingY: '10px',
          paddingX: '10px',
          zIndex: 1000,
          borderBottomStyle: 'solid',
          borderBottomWidth: '1px',
          borderBottomColor: 'buttonBorderColor',
        }}
      >
        <BoldButton editor={editor} />
        <HeadingButton editor={editor} />
        <GraphButton editor={editor} />
        <ImagesButton onClick={() => setAddImageModal(true)} />
        <MapButton editor={editor} />
        <SaveButton
          setIsSaving={setIsSaving}
          isSaving={isSaving}
          editor={editor}
          setSavedMessage={setSavedMessage}
        />
        <Box sx={{ marginLeft: 'auto' }}>
          <Flex sx={{ height: '100%' }}>
            <Box
              sx={{
                marginY: 'auto',
                justifyContent: 'center',
              }}
              onClick={() =>
                setTimeout(() => {
                  setIsHoverSettings(true);
                }, 1)
              }
            >
              <OptionsButton />
            </Box>
          </Flex>
          {isHoverSettings && (
            <ActivitySettings
              isOpen={setIsHoverSettings}
              setSavedMessage={setSavedMessage}
            />
          )}
        </Box>
      </Flex>
      {savedMessage && (
        <Alert
          sx={{ borderRadius: 0, backgroundColor: '#dadada', color: 'black' }}
        >
          Post saved successfully.
          <Close ml='auto' mr={-2} onClick={() => setSavedMessage(false)} />
        </Alert>
      )}
      <Box sx={{ marginBottom: '20px' }} />
    </>
  );
};

export default PostMenu;
