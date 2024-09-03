import React, { createContext, useContext, useState } from "react";
import { Path } from "slate";
import { CustomEditor } from "../types/common";

type SlateContextType = {
  editor: CustomEditor | null;
  currentPath: Path | null;
  setCurrentPath: (path: Path | null) => void;
};

const SlateContext = createContext<SlateContextType | undefined>(undefined);

export const SlateProvider: React.FC<{
  editor: CustomEditor;
  children: React.ReactNode;
}> = ({ editor, children }) => {
  const [currentPath, setCurrentPath] = useState<Path | null>(null);

  return (
    <SlateContext.Provider value={{ editor, currentPath, setCurrentPath }}>
      {children}
    </SlateContext.Provider>
  );
};

export const useSlateContext = (): SlateContextType => {
  const context = useContext(SlateContext);
  if (!context) {
    throw new Error("useSlateContext must be used within a SlateProvider");
  }
  return context;
};
