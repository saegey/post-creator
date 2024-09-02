import { Flex, Text, Box } from "theme-ui";
import React from "react";
import { Transforms } from "slate";

import { EditorContext } from "./EditorContext";
import { PostContext } from "../../PostContext";
import { useSlateContext } from "../../SlateContext";
import RouteIcon from "../../icons/RouteIcon";
import GenericMenuItem from "../../GenericMenuItem";

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

  return (
    <Box
      onClick={addMap}
      sx={{
        cursor: gpxFile ? "pointer" : "not-allowed",
      }}
      variant="boxes.sidebarMenuItem"
    >
      <GenericMenuItem icon={<RouteIcon />} label="Route Overview" />
    </Box>
  );
};

export default AddRouteOverview;
