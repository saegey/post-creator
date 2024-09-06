import React from "react";
import { Transforms } from "slate";
import { Box } from "theme-ui";
import { Editor } from "slate";

import OptionsMenu from "../components/posts/Editor/OptionsMenu";
import { moveNodeDown, moveNodeUp } from "../utils/SlateUtilityFunctions";
import { EditorContext } from "./posts/Editor/EditorContext";
import { useSlateContext } from "./SlateContext";
import GenericMenuItem from "./GenericMenuItem";

const OptionsDropdown = () => {
  const {
    isOptionsOpen,
    setIsOptionsOpen,
    setIsHeroImageModalOpen,
    setIsChangeImageModalOpen,
  } = React.useContext(EditorContext);
  console.log("isOptionsOpen", isOptionsOpen);
  const { menuPosition } = React.useContext(EditorContext);
  const { editor } = useSlateContext();
  const { path } = menuPosition;
  // if (!editor) {
  //   return;
  // }
  if (!editor) {
    throw new Error("Editor is not defined");
  }

  const [node] = Editor.node(editor, menuPosition.path);
  console.log("node", JSON.stringify(path), JSON.stringify([2]));

  return (
    <OptionsMenu
      isOpen={isOptionsOpen}
      setIsOpen={setIsOptionsOpen}
      path={path}
    >
      <>
        {node.type !== undefined &&
          JSON.stringify(path) !== JSON.stringify([2]) && (
            <Box variant="boxes.sidebarMenuItem" sx={{ paddingX: "5px" }}>
              <GenericMenuItem
                onClick={() => {
                  moveNodeUp(editor, path);
                  setIsOptionsOpen(false);
                }}
                label="Move Up"
              />
            </Box>
          )}
        {node.type !== undefined && (
          <Box variant="boxes.sidebarMenuItem" sx={{ paddingX: "5px" }}>
            <GenericMenuItem
              onClick={() => {
                moveNodeDown(editor, path);
                setIsOptionsOpen(false);
              }}
              label="Move Down"
            />
          </Box>
        )}
        {node.type !== undefined && (
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
        )}
        {node.type === undefined && (
          <Box variant="boxes.sidebarMenuItem" sx={{ paddingX: "5px" }}>
            <GenericMenuItem
              onClick={() => {
                setIsChangeImageModalOpen(true);
              }}
              label="Change"
            />
          </Box>
        )}
      </>
    </OptionsMenu>
  );
};

export default OptionsDropdown;
