import { Box } from "theme-ui";
import React from "react";
import Router from "next/router";

import PostEditor from "./PostEditor";
import Header from "../../shared/Header";
import { EditorContext } from "../Editor/EditorContext";
import { IUser } from "../../../types/common";
import { usePost } from "../../PostContext";

type EditUserPostProps = {
  user?: IUser;
  // postComponents: any;
  // postId: string;
  // author: any;
};

const EditUserPost = ({ user }: EditUserPostProps) => {
  const [isGraphMenuOpen, setIsGraphMenuOpen] = React.useState(false);
  const [isFtpUpdating, setIsFtpUpdating] = React.useState(false);
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
  const [mobileMenu, setMobileMenu] = React.useState({
    display: false,
    top: 0,
    left: 0,
    path: [0, 0],
    isFullScreen: false,
  });
  const [isStravaModalOpen, setIsStravaModalOpen] = React.useState(false);
  const [isRWGPSModalOpen, setIsRWGPSModalOpen] = React.useState(false);
  const { id: postId, author, components } = usePost();

  React.useEffect(() => {
    if (user && user?.attributes.sub !== author?.id) {
      Router.push(`/posts/${postId}`);
    }
  }, []);

  return (
    <Box
      as="main"
      sx={
        {
          // width: "100vw",
          // flexGrow: 1,
        }
      }
    >
      <EditorContext.Provider
        value={{
          isNewComponentMenuOpen,
          setIsNewComponentMenuOpen,
          setIsGraphMenuOpen,
          isGraphMenuOpen,
          setIsFtpUpdating,
          isFtpUpdating,
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
          mobileMenu,
          setMobileMenu,
        }}
      >
        {user && <Header user={user} />}
        <PostEditor initialState={components} />
      </EditorContext.Provider>
    </Box>
  );
};

export default EditUserPost;
