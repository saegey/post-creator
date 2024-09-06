import React from "react";
import { Path, Transforms } from "slate";
import { Box } from "theme-ui";
import { Editor } from "slate";

import OptionsMenu from "../components/posts/Editor/OptionsMenu";
import { moveNodeDown, moveNodeUp } from "../utils/SlateUtilityFunctions";
import { EditorContext } from "./posts/Editor/EditorContext";
import { useSlateContext } from "./SlateContext";
import GenericMenuItem from "./GenericMenuItem";
import { CustomElement } from "../types/common";
import { set } from "cypress/types/lodash";

const OptionsDropdown = () => {
  const {
    isOptionsOpen,
    setIsOptionsOpen,
    setIsChangeImageModalOpen,
    setIsSettingsModalOpen,
    setIsPhotoCaptionOpen,
  } = React.useContext(EditorContext);
  console.log("isOptionsOpen", isOptionsOpen);
  const { menuPosition } = React.useContext(EditorContext);
  const { editor } = useSlateContext();
  const { path } = menuPosition;

  if (!editor) {
    throw new Error("Editor is not defined");
  }

  const [node] = Editor.node(editor, menuPosition.path) as [
    CustomElement,
    Path
  ];
  console.log("node", JSON.stringify(path), JSON.stringify([2]));

  return (
    <OptionsMenu
      isOpen={isOptionsOpen}
      setIsOpen={setIsOptionsOpen}
      path={path}
    >
      <>
        {node.type === "image" && (
          <Box variant="boxes.sidebarMenuItem" sx={{ paddingX: "5px" }}>
            <GenericMenuItem
              onClick={() => {
                setIsPhotoCaptionOpen(true);
                setIsOptionsOpen(false);
              }}
              label="Edit Caption"
            />
          </Box>
        )}
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
          <>
            <Box variant="boxes.sidebarMenuItem" sx={{ paddingX: "5px" }}>
              <GenericMenuItem
                onClick={() => {
                  setIsChangeImageModalOpen(true);
                  setIsOptionsOpen(false);
                }}
                label="Change Image"
              />
            </Box>
            <Box variant="boxes.sidebarMenuItem" sx={{ paddingX: "5px" }}>
              <GenericMenuItem
                onClick={() => {
                  setIsSettingsModalOpen(true);
                  setIsOptionsOpen(false);
                }}
                label="Settings"
              />
            </Box>

            <Box variant="boxes.sidebarMenuItem" sx={{ paddingX: "5px" }}>
              <GenericMenuItem
                onClick={() => {
                  setIsPhotoCaptionOpen(true);
                  setIsOptionsOpen(false);
                }}
                label="Edit Caption"
              />
            </Box>
          </>
        )}
      </>
    </OptionsMenu>
  );
};

export default OptionsDropdown;
