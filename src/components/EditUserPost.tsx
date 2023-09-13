import { Box } from 'theme-ui';
import { withAuthenticator } from '@aws-amplify/ui-react';
import React from 'react';

import PostEditor from '../../src/components/PostEditor';
import Header from '../../src/components/Header';
import { EditorContext } from '../../src/components/EditorContext';

type EditUserPostProps = {
  user?: any;
  postComponents: any;
  postId: string;
  signOut?: any;
};
const EditUserPost = ({
  user,
  postComponents,
  postId,
  signOut,
}: EditUserPostProps) => {
  // editor context
  const [isGraphMenuOpen, setIsGraphMenuOpen] = React.useState(false);
  const [isFtpUpdating, setIsFtpUpdating] = React.useState(false);
  const [isGpxUploadOpen, setIsGpxUploadOpen] = React.useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = React.useState(false);
  const [isPhotoCaptionOpen, setIsPhotoCaptionOpen] = React.useState(false);

  return (
    <Box
      as='main'
      sx={{
        width: '100vw',
        flexGrow: 1,
      }}
    >
      <Header user={user} signOut={signOut} title={'Edit Post'} />
      <Box>
        <EditorContext.Provider
          value={{
            setIsGraphMenuOpen,
            isGraphMenuOpen,
            setIsFtpUpdating,
            isFtpUpdating,
            setIsGpxUploadOpen,
            isGpxUploadOpen,
            isImageModalOpen,
            setIsImageModalOpen,
            isPhotoCaptionOpen,
            setIsPhotoCaptionOpen,
          }}
        >
          <PostEditor postId={postId} initialState={postComponents} />
        </EditorContext.Provider>
      </Box>
    </Box>
  );
};

export default withAuthenticator(EditUserPost);
