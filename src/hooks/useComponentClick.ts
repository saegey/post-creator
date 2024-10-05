import React, { useRef } from "react";
import { Path, Transforms } from "slate";
import { useSlateStatic } from "slate-react";

import { EditorContext } from "../components/posts/Editor/EditorContext";
import { useViewport } from "../components/ViewportProvider";

const useComponentClick = (path: Path) => {
  const editor = useSlateStatic();
  const { setMobileMenu } = React.useContext(EditorContext);
  const { width } = useViewport();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();

    if (wrapperRef.current && width < 500) {
      const rect = wrapperRef.current.getBoundingClientRect();

      setMobileMenu({
        display: true,
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY,
        path: path,
        isFullScreen: false,
      });
      Transforms.deselect(editor);
    }
  };

  return { wrapperRef, handleClick };
};

export default useComponentClick;
