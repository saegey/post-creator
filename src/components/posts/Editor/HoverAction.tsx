// SlateEditor.js
import React from "react";
import HoverIcon from "../../HoverIcon";
import { Box, Flex } from "theme-ui";
import { EditorContext } from "./EditorContext";
import { useSlateStatic, ReactEditor } from "slate-react";
import { CustomElement } from "../../../types/common";
import { useViewport } from "../../ViewportProvider";

const HoverAction = ({
  children,
  element,
}: {
  children: JSX.Element;
  element: CustomElement;
}) => {
  const [hoverIcon, setHoverIcon] = React.useState(false);
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);
  const { setIsNewComponentMenuOpen, setMenuPosition } =
    React.useContext(EditorContext);
  const { width } = useViewport();

  // console.log(editor.selection);

  return (
    <Flex
      onMouseEnter={() => setHoverIcon(true)}
      onMouseLeave={() => setHoverIcon(false)}
      className="hoverAction"
    >
      <Box
        sx={{
          position: "relative",
          width: ["100%", "690px", "690px"],
          marginX: "auto",
          marginY: "20px",
        }}
      >
        <Box sx={{ position: "relative" }}>
          {width > 500 && hoverIcon && (
            <Box sx={{ display: "inherit" }}>
              <HoverIcon
                onClick={(event) => {
                  event.preventDefault();
                  // const { selection } = editor;

                  // console.log(editor.selection);

                  editor.deselect();

                  const rect = event.currentTarget.getBoundingClientRect();
                  const scrollX = window.scrollX || window.pageXOffset;
                  const scrollY = window.scrollY || window.pageYOffset;
                  const adjustedTop = rect.bottom + scrollY - 10;
                  const adjustedLeft = rect.right + scrollX + 10;

                  // Transforms.select(editor, {
                  //   anchor: selection?.anchor,
                  //   focus: selection?.focus,
                  // });

                  // console.log(path);
                  setMenuPosition({
                    top: adjustedTop,
                    left: adjustedLeft,
                    path: path,
                  });

                  // console.log(editor.selection);
                  setIsNewComponentMenuOpen(true);
                }}
              />
            </Box>
          )}
          {children}
        </Box>
      </Box>
    </Flex>
  );
};

export default HoverAction;
