import React, {
  createContext,
  useContext,
  useRef,
  useState,
  forwardRef,
} from "react";
import { Path } from "slate";
import { CustomEditor } from "../types/common";

type SlateContextType = {
  editor: CustomEditor | null;
  currentPath: Path | null;
  setCurrentPath: (path: Path | null) => void;
  slateRef: React.RefObject<HTMLDivElement>; // Expose the ref for the Slate DOM element
};

const SlateContext = createContext<SlateContextType | undefined>(undefined);

export const SlateProvider = forwardRef<
  HTMLElement,
  { editor: CustomEditor; children: React.ReactNode }
>(({ editor, children }, ref) => {
  const [currentPath, setCurrentPath] = useState<Path | null>(null);
  const slateRef = useRef<HTMLDivElement>(null); // Create a ref for the Slate element

  return (
    <SlateContext.Provider
      value={{ editor, currentPath, setCurrentPath, slateRef }}
    >
      <div ref={slateRef}>{children}</div>{" "}
      {/* Attach the slateRef to the DOM element */}
    </SlateContext.Provider>
  );
});

export const useSlateContext = (): SlateContextType => {
  const context = useContext(SlateContext);
  if (!context) {
    throw new Error("useSlateContext must be used within a SlateProvider");
  }
  return context;
};
