import React from 'react';

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
});

export { EditorContext };
