import { useState } from "react";
import { Path } from "slate";
import { EditorContextType } from "../components/posts/Editor/EditorContext";

const useEditorState = (): EditorContextType => {
  const [isGraphMenuOpen, setIsGraphMenuOpen] = useState(false);
  const [isFtpUpdating, setIsFtpUpdating] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isPhotoCaptionOpen, setIsPhotoCaptionOpen] = useState(false);
  const [isHeroImageModalOpen, setIsHeroImageModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isRaceResultsModalOpen, setIsRaceResultsModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isSavingPost, setIsSavingPost] = useState(false);
  const [savingStatus, setSavingStatus] = useState("");
  const [isPublishedConfirmationOpen, setIsPublishedConfirmationOpen] =
    useState(false);
  const [isVideoUploadOpen, setIsVideoUploadOpen] = useState(false);
  const [isNewComponentMenuOpen, setIsNewComponentMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState<{
    top: number;
    left: number;
    path: Path;
  }>({
    top: 0,
    left: 0,
    path: [0],
  });
  const [mobileMenu, setMobileMenu] = useState({
    display: false,
    top: 0,
    left: 0,
    path: [0, 0],
    isFullScreen: false,
  });
  const [isRWGPSModalOpen, setIsRWGPSModalOpen] = useState(false);
  const [newComponentPath, setNewComponentPath] = useState<Path | undefined>(
    undefined
  );
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isImageUploadOpen, setIsImageUploadOpen] = useState(false);
  const [isNewPostImageUploadOpen, setIsNewPostImageUploadOpen] =
    useState(false);

  const [isChangeImageModalOpen, setIsChangeImageModalOpen] = useState(false);

  const [isPublishing, setIsPublishing] = useState(false);

  return {
    isGraphMenuOpen,
    setIsGraphMenuOpen,
    isFtpUpdating,
    setIsFtpUpdating,
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
    isNewComponentMenuOpen,
    setIsNewComponentMenuOpen,
    menuPosition,
    setMenuPosition,
    mobileMenu,
    setMobileMenu,
    isRWGPSModalOpen,
    setIsRWGPSModalOpen,
    newComponentPath,
    setNewComponentPath,
    isOptionsOpen,
    setIsOptionsOpen,
    isImageUploadOpen,
    setIsImageUploadOpen,
    isNewPostImageUploadOpen,
    setIsNewPostImageUploadOpen,
    isChangeImageModalOpen,
    setIsChangeImageModalOpen,
    isPublishing,
    setIsPublishing,
  };
};

export default useEditorState;
