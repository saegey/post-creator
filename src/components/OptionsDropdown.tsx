import React from "react";
import { Transforms } from "slate";
import { Box } from "theme-ui";

import OptionsMenu from "../components/posts/Editor/OptionsMenu";
import { moveNodeDown, moveNodeUp } from "../utils/SlateUtilityFunctions";
import { EditorContext } from "./posts/Editor/EditorContext";
import { useSlateContext } from "./SlateContext";
import GenericMenuItem from "./GenericMenuItem";

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
        <Box variant="boxes.sidebarMenuItem" sx={{ paddingX: "5px" }}>
          <GenericMenuItem
            onClick={() => {
              moveNodeUp(editor, path);
              setIsOptionsOpen(false);
            }}
            label="Move Up"
          />
        </Box>
        <Box variant="boxes.sidebarMenuItem" sx={{ paddingX: "5px" }}>
          <GenericMenuItem
            onClick={() => {
              moveNodeDown(editor, path);
              setIsOptionsOpen(false);
            }}
            label="Move Down"
          />
        </Box>
        <Box variant="boxes.sidebarMenuItem" sx={{ paddingX: "5px" }}>
          <GenericMenuItem
            onClick={() => {
              Transforms.removeNodes(editor, { at: path });

              setIsOptionsOpen(false);
              const selection = window.getSelection();
              selection && selection.removeAllRanges();
            }}
            label="Delete"
          />
        </Box>
      </>
    </OptionsMenu>
  );
};

export default OptionsDropdown;
