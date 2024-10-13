import React from "react";
import { Path, Transforms } from "slate";
import { Box, IconButton } from "theme-ui";
import { Editor } from "slate";

import OptionsMenu from "../components/posts/Editor/OptionsMenu";
import { moveNodeDown, moveNodeUp } from "../utils/SlateUtilityFunctions";
import { EditorContext } from "./posts/Editor/EditorContext";
import { useSlateContext } from "./SlateContext";
import GenericMenuItem from "./GenericMenuItem";
import { CustomElement } from "../types/common";
import EditIcon from "./icons/EditIcon";
import DeleteIcon from "./icons/DeleteIcon";
import MoveUpIcon from "./icons/MoveUpIcon";
import MoveDownIcoon from "./icons/MoveDownIcon";
import ImagesIcon from "./icons/ImagesIcon";
import SettingsIcon from "./icons/SettingsIcon";

const OptionsDropdown = () => {
  const {
    isOptionsOpen,
    setIsOptionsOpen,
    setIsChangeImageModalOpen,
    setIsSettingsModalOpen,
    setIsPhotoCaptionOpen,
  } = React.useContext(EditorContext);

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

  return (
    <OptionsMenu
      isOpen={isOptionsOpen}
      setIsOpen={setIsOptionsOpen}
      path={path}
    >
      <>
        {node.type === "image" && (
          <Box variant="boxes.sidebarMenuItem">
            <GenericMenuItem
              onClick={() => {
                setIsPhotoCaptionOpen(true);
                setIsOptionsOpen(false);
              }}
              label="Edit Caption"
              icon={
                <IconButton>
                  <EditIcon />
                </IconButton>
              }
            />
          </Box>
        )}
        {node.type !== undefined &&
          JSON.stringify(path) !== JSON.stringify([2]) && (
            <Box variant="boxes.sidebarMenuItem">
              <GenericMenuItem
                onClick={() => {
                  moveNodeUp(editor, path);
                  setIsOptionsOpen(false);
                }}
                label="Move Up"
                icon={
                  <IconButton>
                    <MoveUpIcon />
                  </IconButton>
                }
              />
            </Box>
          )}
        {node.type !== undefined && (
          <Box variant="boxes.sidebarMenuItem">
            <GenericMenuItem
              onClick={() => {
                moveNodeDown(editor, path);
                setIsOptionsOpen(false);
              }}
              label="Move Down"
              icon={
                <IconButton>
                  <MoveDownIcoon />
                </IconButton>
              }
            />
          </Box>
        )}
        {node.type !== undefined && (
          <Box variant="boxes.sidebarMenuItem">
            <GenericMenuItem
              onClick={() => {
                Transforms.removeNodes(editor, { at: path });

                setIsOptionsOpen(false);
                const selection = window.getSelection();
                selection && selection.removeAllRanges();
              }}
              label="Delete"
              icon={
                <IconButton sx={{ padding: "8px" }}>
                  <DeleteIcon />
                </IconButton>
              }
            />
          </Box>
        )}
        {node.type === undefined && (
          <>
            <Box variant="boxes.sidebarMenuItem">
              <GenericMenuItem
                onClick={() => {
                  setIsChangeImageModalOpen(true);
                  setIsOptionsOpen(false);
                }}
                label="Change Image"
                icon={<ImagesIcon sx={{ padding: "6px" }} />}
              />
            </Box>
            <Box variant="boxes.sidebarMenuItem">
              <GenericMenuItem
                onClick={() => {
                  setIsSettingsModalOpen(true);
                  setIsOptionsOpen(false);
                }}
                label="Settings"
                icon={<SettingsIcon sx={{ padding: "6px" }} />}
              />
            </Box>

            <Box variant="boxes.sidebarMenuItem">
              <GenericMenuItem
                onClick={() => {
                  setIsPhotoCaptionOpen(true);
                  setIsOptionsOpen(false);
                }}
                label="Edit Caption"
                icon={
                  <IconButton sx={{ padding: "6px" }}>
                    <EditIcon />
                  </IconButton>
                }
              />
            </Box>
          </>
        )}
      </>
    </OptionsMenu>
  );
};

export default OptionsDropdown;
