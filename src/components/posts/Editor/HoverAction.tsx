import React from "react";
import { useSlateStatic, ReactEditor } from "slate-react";
import { Box, Flex } from "theme-ui";

import HoverIcon from "../../HoverIcon";
import { EditorContext } from "./EditorContext";
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

  const onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    editor.deselect();
    const rect = event.currentTarget.getBoundingClientRect();
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    const adjustedTop = rect.bottom + scrollY - 10;
    const adjustedLeft = rect.right + scrollX + 10;

    setMenuPosition({
      top: adjustedTop,
      left: adjustedLeft,
      path: path,
    });
    setIsNewComponentMenuOpen(true);
    return;
  };

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
              <HoverIcon onClick={onClick} />
            </Box>
          )}
          {children}
        </Box>
      </Box>
    </Flex>
  );
};

export default HoverAction;
