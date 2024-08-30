import React from "react";
import { Transforms } from "slate";
import { Box, Text, ThemeUIStyleObject, Theme } from "theme-ui";

import { CustomEditor } from "../types/common";
import OptionsMenu from "../components/posts/Editor/OptionsMenu";
import { moveNodeDown, moveNodeUp } from "../utils/SlateUtilityFunctions";

const useOptionsMenu = (editor: CustomEditor, path: any) => {
  const [isOptionsOpen, setIsOptionsOpen] = React.useState(false);

  const toggleOptionsMenu = () => {
    setIsOptionsOpen((prev) => !prev);
  };

  const optionsMenu = (
    <OptionsMenu
      isOpen={isOptionsOpen}
      setIsOpen={setIsOptionsOpen}
      path={path}
    >
      <>
        <Box
          onClick={() => {
            moveNodeUp(editor, path);
            setIsOptionsOpen(false);
          }}
          variant="boxes.dropdownMenuItem"
        >
          <Text
            sx={{ fontSize: ["14px", "16px"] } as ThemeUIStyleObject<Theme>}
          >
            Move Up
          </Text>
        </Box>
        <Box
          onClick={() => {
            moveNodeDown(editor, path);
            setIsOptionsOpen(false);
          }}
          variant="boxes.dropdownMenuItem"
        >
          <Text
            sx={{ fontSize: ["14px", "16px"] } as ThemeUIStyleObject<Theme>}
          >
            Move Down
          </Text>
        </Box>
        <Box
          onClick={() => {
            setIsOptionsOpen(false);
            Transforms.removeNodes(editor, { at: path });
            const selection = window.getSelection();
            selection && selection.removeAllRanges();
          }}
          variant="boxes.dropdownMenuItem"
        >
          Delete
        </Box>
      </>
    </OptionsMenu>
  );

  return {
    isOptionsOpen,
    toggleOptionsMenu,
    optionsMenu,
  };
};

export default useOptionsMenu;
