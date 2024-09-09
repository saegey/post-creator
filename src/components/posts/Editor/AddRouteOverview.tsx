import { Flex, Text, Box } from "theme-ui";
import React from "react";
import { Transforms } from "slate";

import { EditorContext } from "./EditorContext";
import { PostContext } from "../../PostContext";
import { useSlateContext } from "../../SlateContext";
import RouteIcon from "../../icons/RouteIcon";
import GenericMenuItem from "../../GenericMenuItem";
import Tooltip from "../../shared/Tooltip";

const AddRouteOverview = () => {
  const { editor } = useSlateContext();
  const { gpxFile } = React.useContext(PostContext);
  const { setIsNewComponentMenuOpen, setMobileMenu, menuPosition } =
    React.useContext(EditorContext);
  const { path } = menuPosition;

  if (!editor) {
    return;
  }

  const addMap = () => {
    if (gpxFile) {
      Transforms.insertNodes(
        editor,
        { type: "visualOverview", children: [{ text: "" }], void: true },
        { at: path }
      );
      if (path.length > 2) {
        Transforms.liftNodes(editor);
      }
      setIsNewComponentMenuOpen(false);
      setMobileMenu({
        top: 0,
        left: 0,
        display: false,
        path: path,
        isFullScreen: false,
      });
      const selection = window.getSelection();
      // console.log(selection)
      selection && selection.removeAllRanges();
    }
  };

  return !gpxFile ? (
    <Tooltip text="Upload an activity file in settings to Enable">
      <Box
        sx={{
          cursor: "not-allowed",
        }}
        variant="boxes.sidebarMenuItem"
      >
        <GenericMenuItem
          icon={<RouteIcon />}
          label="Route Overview"
          isDisabled={gpxFile ? false : true}
        />
      </Box>
    </Tooltip>
  ) : (
    <Box
      onClick={addMap}
      sx={{
        cursor: "pointer",
      }}
      variant="boxes.sidebarMenuItem"
    >
      <GenericMenuItem icon={<RouteIcon />} label="Map" />
    </Box>
  );
};

export default AddRouteOverview;
