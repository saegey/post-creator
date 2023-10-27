import { Box } from "theme-ui";
import React from "react";
import Router from "next/router";

import PostEditor from "../../src/components/PostEditor";
import Header from "../../src/components/Header";
import { EditorContext } from "../../src/components/EditorContext";
import { IUser } from "../../pages/_app";

type EditUserPostProps = {
  user?: IUser;
  postComponents: any;
  postId: string;
  author: any;
};

const EditUserPost = ({
  user,
  postComponents,
  postId,
  author,
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
  const [savingStatus, setSavingStatus] = React.useState("");
  const [isPublishedConfirmationOpen, setIsPublishedConfirmationOpen] =
    React.useState(false);

  // const { push } = useRouter();

  React.useEffect(() => {
    if (user?.attributes.sub !== author.id) {
      Router.push(`/posts/${postId}`);
    }
    if (!user) {
      Router.push("/");
      return;
    }
  }, []);

  return (
    <Box
      as="main"
      sx={{
        width: "100vw",
        flexGrow: 1,
      }}
    >
      {user && <Header user={user} />}
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
          <PostEditor initialState={postComponents} />
        </EditorContext.Provider>
      </Box>
    </Box>
  );
};

export default EditUserPost;
