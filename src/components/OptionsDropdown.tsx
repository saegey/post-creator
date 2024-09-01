import React from "react";
import { Transforms } from "slate";
import { Box, Text, ThemeUIStyleObject, Theme } from "theme-ui";

import OptionsMenu from "../components/posts/Editor/OptionsMenu";
import { moveNodeDown, moveNodeUp } from "../utils/SlateUtilityFunctions";
import { EditorContext } from "./posts/Editor/EditorContext";
import { useSlateContext } from "./SlateContext";

const OptionsDropdown = () => {
  const { isOptionsOpen, setIsOptionsOpen } = React.useContext(EditorContext);

  const { menuPosition } = React.useContext(EditorContext);
  const { editor } = useSlateContext();
  const { path } = menuPosition;
  if (!editor) {
    return;
  }

  return (
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
          variant="boxes.sidebarMenuItem"
        >
          <Text>Move Up</Text>
        </Box>
        <Box
          onClick={() => {
            moveNodeDown(editor, path);
            setIsOptionsOpen(false);
          }}
          variant="boxes.sidebarMenuItem"
        >
          <Text>Move Down</Text>
        </Box>
        <Box
          onClick={() => {
            setIsOptionsOpen(false);
            Transforms.removeNodes(editor, { at: path });
            const selection = window.getSelection();
            selection && selection.removeAllRanges();
          }}
          variant="boxes.sidebarMenuItem"
        >
          <Text>Delete</Text>
        </Box>
      </>
    </OptionsMenu>
  );
};

export default OptionsDropdown;
