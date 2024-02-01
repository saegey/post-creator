// SlateEditor.js
import React from "react";
import HoverIcon from "../../HoverIcon";
import { Box, Flex } from "theme-ui";
import { EditorContext } from "./EditorContext";

const HoverAction = ({ children }: { children: JSX.Element }) => {
  const [hoverIcon, setHoverIcon] = React.useState(false);
  const { setIsNewComponentMenuOpen, setMenuPosition } =
    React.useContext(EditorContext);

  return (
    <Flex
      onMouseEnter={() => setHoverIcon(true)}
      onMouseLeave={() => setHoverIcon(false)}
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
          {hoverIcon && (
            <HoverIcon
              onClick={(event) => {
                const rect = event.currentTarget.getBoundingClientRect();

                setMenuPosition({
                  top: rect.bottom - 10,
                  left: rect.right + 10,
                });
                setIsNewComponentMenuOpen(true);
              }}
            />
          )}
          {children}
        </Box>
      </Box>
    </Flex>
  );
};

export default HoverAction;
