import { Box } from 'theme-ui';
import { withAuthenticator } from '@aws-amplify/ui-react';
import React from 'react';
import { useRouter } from 'next/navigation';

import PostEditor from '../../src/components/PostEditor';
import Header from '../../src/components/Header';
import { EditorContext } from '../../src/components/EditorContext';

type EditUserPostProps = {
  user?: any;
  postComponents: any;
  postId: string;
  author: any;
  signOut?: any;
};
const EditUserPost = ({
  user,
  postComponents,
  postId,
  author,
  signOut,
}: EditUserPostProps) => {
  const [isGraphMenuOpen, setIsGraphMenuOpen] = React.useState(false);
  const [isFtpUpdating, setIsFtpUpdating] = React.useState(false);
  const [isGpxUploadOpen, setIsGpxUploadOpen] = React.useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = React.useState(false);
  const [isPhotoCaptionOpen, setIsPhotoCaptionOpen] = React.useState(false);
  const [isHeroImageModalOpen, setIsHeroImageModalOpen] = React.useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = React.useState(false);
  const [isRaceResultsModalOpen, setIsRaceResultsModalOpen] =
    React.useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = React.useState(false);
  const [isSavingPost, setIsSavingPost] = React.useState(false);
  const [savingStatus, setSavingStatus] = React.useState('');
  const [isPublishedConfirmationOpen, setIsPublishedConfirmationOpen] =
    React.useState(false);

  const { push } = useRouter();
  // console.log(postComponents);

  React.useEffect(() => {
    if (user.attributes.sub !== author.id) {
      push(`/posts/${postId}`);
    }
  }, []);

  return (
    <Box
      as='main'
      sx={{
        width: '100vw',
        flexGrow: 1,
      }}
    >
      <Header user={user} signOut={signOut} />
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
            isHeroImageModalOpen,
            setIsHeroImageModalOpen,
            isShareModalOpen,
            setIsShareModalOpen,
            isRaceResultsModalOpen,
            setIsRaceResultsModalOpen,
            isSettingsModalOpen,
            setIsSettingsModalOpen,
            isSavingPost,
            setIsSavingPost,
            savingStatus,
            setSavingStatus,
            isPublishedConfirmationOpen,
            setIsPublishedConfirmationOpen,
          }}
        >
          <PostEditor postId={postId} initialState={postComponents} />
        </EditorContext.Provider>
      </Box>
    </Box>
  );
};

export default withAuthenticator(EditUserPost);
