import { useCallback, useState, useContext } from "react";
import { Editor } from "slate";

import { useViewport } from "../components/ViewportProvider";
import { EditorContext } from "../components/posts/Editor/EditorContext";

const useSelectionChangeHandler = (editor: Editor) => {
  const { setMobileMenu, setMenuPosition } = useContext(EditorContext);
  const { width } = useViewport();
  const [selectionMenu, setSelectionMenu] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const handleSelectionChange = useCallback(() => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount < 1) return;

    const range = selection.getRangeAt(0);
    const operations = editor.operations;

    const isNewLineInserted = operations.some((op) => op.type === "split_node");

    if (editor.selection?.focus.offset === 0 && width < 500) {
      const rect = range.getBoundingClientRect();
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;
      const adjustedTop =
        rect.bottom + scrollY + (isNewLineInserted ? 60 : -10);
      const adjustedLeft = rect.right + scrollX + 10;

      if (editor.selection) {
        const path = editor.selection.anchor.path;
        setMobileMenu({
          display: true,
          top: adjustedTop,
          left: adjustedLeft,
          path,
          isFullScreen: false,
        });
        setMenuPosition({ path });
      }
    } else {
      setMobileMenu({
        display: false,
        top: 0,
        left: 0,
        path: [0, 0],
        isFullScreen: false,
      });
    }

    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const selectedText = range.toString();
      if (selectedText.length > 0) {
        const rect = range.getBoundingClientRect();
        const scrollX = window.scrollX || window.pageXOffset;
        const scrollY = window.scrollY || window.pageYOffset;

        setSelectionMenu({
          top: rect.bottom + scrollY,
          left: rect.left + scrollX,
        });
      } else {
        setSelectionMenu(null);
      }
    } else {
      setSelectionMenu(null);
    }
  }, [editor, width]);

  return { handleSelectionChange, selectionMenu };
};

export default useSelectionChangeHandler;
