import React from 'react';

export type EditorContextType = {
  isGraphMenuOpen: boolean;
  setIsGraphMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isFtpUpdating: boolean;
  setIsFtpUpdating: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditorContext = React.createContext<EditorContextType>({
  isGraphMenuOpen: false,
  setIsGraphMenuOpen: () => {},
  isFtpUpdating: false,
  setIsFtpUpdating: () => {},
});

export { EditorContext };
