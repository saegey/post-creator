import React, { useState } from "react";
import { Path } from "slate";

type EditorState = {
  isGraphMenuOpen: boolean;
  setIsGraphMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isFtpUpdating: boolean;
  setIsFtpUpdating: React.Dispatch<React.SetStateAction<boolean>>;
  isImageModalOpen: boolean;
  setIsImageModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isPhotoCaptionOpen: boolean;
  setIsPhotoCaptionOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isHeroImageModalOpen: boolean;
  setIsHeroImageModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isShareModalOpen: boolean;
  setIsShareModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isRaceResultsModalOpen: boolean;
  setIsRaceResultsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSettingsModalOpen: boolean;
  setIsSettingsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSavingPost: boolean;
  setIsSavingPost: React.Dispatch<React.SetStateAction<boolean>>;
  savingStatus: string;
  setSavingStatus: React.Dispatch<React.SetStateAction<string>>;
  isPublishedConfirmationOpen: boolean;
  setIsPublishedConfirmationOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isVideoUploadOpen: boolean;
  setIsVideoUploadOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isNewComponentMenuOpen: boolean;
  setIsNewComponentMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  menuPosition: { top: number; left: number; path: Path };
  setMenuPosition: React.Dispatch<
    React.SetStateAction<{ top: number; left: number; path: Path }>
  >;
  mobileMenu: {
    display: boolean;
    top: number;
    left: number;
    path: Path;
    isFullScreen: boolean;
  };
  setMobileMenu: React.Dispatch<
    React.SetStateAction<{
      display: boolean;
      top: number;
      left: number;
      path: Path;
      isFullScreen: boolean;
    }>
  >;
  isStravaModalOpen: boolean;
  setIsStravaModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isRWGPSModalOpen: boolean;
  setIsRWGPSModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  newComponentPath: Path | undefined;
  setNewComponentPath: React.Dispatch<React.SetStateAction<Path | undefined>>;
  isOptionsOpen: boolean;
  setIsOptionsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const useEditorState = (): EditorState => {
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
  const [isStravaModalOpen, setIsStravaModalOpen] = useState(false);
  const [isRWGPSModalOpen, setIsRWGPSModalOpen] = useState(false);
  const [newComponentPath, setNewComponentPath] = useState<Path | undefined>(
    undefined
  );
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

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
    isStravaModalOpen,
    setIsStravaModalOpen,
    isRWGPSModalOpen,
    setIsRWGPSModalOpen,
    newComponentPath,
    setNewComponentPath,
    isOptionsOpen,
    setIsOptionsOpen,
  };
};

export default useEditorState;
