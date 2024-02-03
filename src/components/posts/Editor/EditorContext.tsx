import React from "react";
import { Path } from "slate";

export type EditorContextType = {
  isGraphMenuOpen: boolean;
  setIsGraphMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;

  isFtpUpdating: boolean;
  setIsFtpUpdating: React.Dispatch<React.SetStateAction<boolean>>;

  isGpxUploadOpen: boolean;
  setIsGpxUploadOpen: React.Dispatch<React.SetStateAction<boolean>>;

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

  isStravaModalOpen: boolean;
  setIsStravaModalOpen: React.Dispatch<React.SetStateAction<boolean>>;

  isRWGPSModalOpen: boolean;
  setIsRWGPSModalOpen: React.Dispatch<React.SetStateAction<boolean>>;

  menuPosition: { top: number; left: number; path: Path };
  setMenuPosition: React.Dispatch<
    React.SetStateAction<{ top: number; left: number; path: Path }>
  >;
};

const EditorContext = React.createContext<EditorContextType>({
  isGraphMenuOpen: false,
  setIsGraphMenuOpen: () => {},
  isFtpUpdating: false,
  setIsFtpUpdating: () => {},
  isGpxUploadOpen: false,
  setIsGpxUploadOpen: () => {},
  isImageModalOpen: false,
  setIsImageModalOpen: () => {},
  isHeroImageModalOpen: false,
  setIsHeroImageModalOpen: () => {},
  isPhotoCaptionOpen: false,
  setIsPhotoCaptionOpen: () => {},
  isShareModalOpen: false,
  setIsShareModalOpen: () => {},
  isRaceResultsModalOpen: false,
  setIsRaceResultsModalOpen: () => {},
  isSettingsModalOpen: false,
  setIsSettingsModalOpen: () => {},
  isSavingPost: false,
  setIsSavingPost: () => {},
  savingStatus: "",
  setSavingStatus: () => {},
  isPublishedConfirmationOpen: false,
  setIsPublishedConfirmationOpen: () => {},
  isVideoUploadOpen: false,
  setIsVideoUploadOpen: () => {},
  isNewComponentMenuOpen: false,
  setIsNewComponentMenuOpen: () => {},
  menuPosition: { top: 0, left: 0, path: [0] },
  setMenuPosition: () => {},
  isStravaModalOpen: false,
  setIsStravaModalOpen: () => {},
  isRWGPSModalOpen: false,
  setIsRWGPSModalOpen: () => {},
});

export { EditorContext };
