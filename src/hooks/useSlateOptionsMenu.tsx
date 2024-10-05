import React from "react";
import { Box, ThemeUIStyleObject } from "theme-ui";
import { Path } from "slate";
import { lighten } from "@theme-ui/color";

import { CustomEditor } from "../types/common";
import { EditorContext } from "../components/posts/Editor/EditorContext";
import OptionsIcon from "../components/icons/OptionsIcon";
import { useViewport } from "../components/ViewportProvider";

const useOptionsMenu = (
  editor: CustomEditor,
  path: Path,
  sx?: ThemeUIStyleObject
) => {
  const { isOptionsOpen, setIsOptionsOpen, setMobileMenu, setMenuPosition } =
    React.useContext(EditorContext);
  const { width, height } = useViewport();

  const toggleOptionsMenu = () => {
    setIsOptionsOpen((prev) => !prev);
  };

  const optionsMenu = (
    <Box
      sx={
        sx
          ? sx
          : {
              position: "absolute",
              right: width < 480 ? "10px" : "-30px",
              top: "0px",
            }
      }
      onClick={(event) => {
        event.preventDefault();
        editor.deselect();
        const rect = event.currentTarget.getBoundingClientRect();

        const scrollX = window.scrollX || window.pageXOffset;
        const scrollY = window.scrollY || window.pageYOffset;
        const adjustedTop = rect.bottom + scrollY - 10;
        const adjustedLeft = rect.right + scrollX + 10;

        setMenuPosition({
          top: adjustedTop,
          left: adjustedLeft,
          path: path,
        });

        setMobileMenu({
          display: false,
          left: 0,
          top: 0,
          path: path,
          isFullScreen: false,
        });

        setIsOptionsOpen(true);
      }}
    >
      <OptionsIcon
        sx={{
          width: "22px",
          height: "22px",
          backgroundColor: "muted",
          color: "background",
          "&:hover": { backgroundColor: lighten("muted", 0.2) },
        }}
      />
    </Box>
  );

  return {
    isOptionsOpen,
    toggleOptionsMenu,
    optionsMenu,
  };
};

export default useOptionsMenu;
