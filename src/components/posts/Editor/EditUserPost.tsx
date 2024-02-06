import { Box } from "theme-ui";
import React from "react";
import Router from "next/router";

import PostEditor from "./PostEditor";
import Header from "../../shared/Header";
import { EditorContext } from "../Editor/EditorContext";
import { IUser } from "../../../types/common";

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
  const [isVideoUploadOpen, setIsVideoUploadOpen] = React.useState(false);
  const [isNewComponentMenuOpen, setIsNewComponentMenuOpen] =
    React.useState(false);
  const [menuPosition, setMenuPosition] = React.useState({
    top: 0,
    left: 0,
    path: [0],
  });
  const [isStravaModalOpen, setIsStravaModalOpen] = React.useState(false);
  const [isRWGPSModalOpen, setIsRWGPSModalOpen] = React.useState(false);

  React.useEffect(() => {
    if (user && user?.attributes.sub !== author.id) {
      Router.push(`/posts/${postId}`);
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
      <Box>
        <EditorContext.Provider
          value={{
            isNewComponentMenuOpen,
            setIsNewComponentMenuOpen,
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
            isVideoUploadOpen,
            setIsVideoUploadOpen,
            menuPosition,
            setMenuPosition,
            isStravaModalOpen,
            setIsStravaModalOpen,
            isRWGPSModalOpen,
            setIsRWGPSModalOpen,
          }}
        >
          {user && <Header user={user} />}
          <PostEditor initialState={postComponents} />
        </EditorContext.Provider>
      </Box>
    </Box>
  );
};

export default EditUserPost;
