import React from "react";
import { Box, ThemeUIStyleObject, Theme } from "theme-ui";

import { CustomEditor } from "../types/common";
import { EditorContext } from "../components/posts/Editor/EditorContext";
import OptionsIcon from "../components/icons/OptionsIcon";
import { Path } from "slate";

const useOptionsMenu = (
  editor: CustomEditor,
  path: Path,
  sx?: ThemeUIStyleObject
) => {
  const { isOptionsOpen, setIsOptionsOpen, setMobileMenu, setMenuPosition } =
    React.useContext(EditorContext);

  const toggleOptionsMenu = () => {
    setIsOptionsOpen((prev) => !prev);
  };

  const optionsMenu = (
    <Box
      sx={
        sx
          ? sx
          : ({
              position: "absolute",
              right: "-30px",
              top: "0px",
            } as ThemeUIStyleObject<Theme>)
      }
      onClick={(event) => {
        event.preventDefault();
        editor.deselect();
        const rect = event.currentTarget.getBoundingClientRect();
        console.log("rect", rect);
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

        console.log(adjustedTop, adjustedLeft, path);
        setIsOptionsOpen(true);
      }}
    >
      <OptionsIcon
        sx={{
          backgroundColor: "muted",
          color: "background",
          "&:hover": { backgroundColor: "accent" },
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
