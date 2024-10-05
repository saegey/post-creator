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
    throw new Error("Editor is not defined");
  }

  const addMap = () => {
    Transforms.insertNodes(
      editor,
      { type: "visualOverview", children: [{ text: "" }], void: true },
      { at: path }
    );
    if (path.length > 1) {
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
    selection && selection.removeAllRanges();
  };

  return (
    <Box
      onClick={addMap}
      sx={{
        cursor: "pointer",
      }}
      variant="boxes.sidebarMenuItem"
    >
      <GenericMenuItem
        icon={<RouteIcon sx={{ padding: "6px" }} />}
        label="Map"
      />
    </Box>
  );
};

export default AddRouteOverview;
