import { Flex, Box } from "theme-ui";
import React from "react";
import { Transforms } from "slate";

import ActivityOverviewIcon from "../../icons/ActivityOverviewIcon";
import { PostContext } from "../../PostContext";
import { EditorContext } from "./EditorContext";
import { useSlateContext } from "../../SlateContext";
import GenericMenuItem from "../../GenericMenuItem";

const AddActivityOverview = () => {
  const { gpxFile } = React.useContext(PostContext);
  const { setIsNewComponentMenuOpen, menuPosition } =
    React.useContext(EditorContext);
  const { setMobileMenu } = React.useContext(EditorContext);
  const { path } = menuPosition;

  const { editor } = useSlateContext();

  if (!editor) {
    return;
  }

  const addActivityOverview = () => {
    if (gpxFile) {
      Transforms.insertNodes(
        editor,
        {
          type: "activityOverview",
          children: [{ text: "" }],
          void: true,
        },
        { at: path }
      );

      if (path.length > 2) {
        Transforms.liftNodes(editor);
      }

      setMobileMenu({
        top: 0,
        left: 0,
        display: false,
        path: path,
        isFullScreen: false,
      });

      setIsNewComponentMenuOpen(false);
      const selection = window.getSelection();

      selection && selection.removeAllRanges();
    }
  };

  return (
    <Box
      onClick={() => addActivityOverview()}
      variant="boxes.sidebarMenuItem"
      sx={{
        // padding: "10px",
        cursor: gpxFile ? "pointer" : "not-allowed",
      }}
    >
      <GenericMenuItem label="Metrics" icon={<ActivityOverviewIcon />} />
    </Box>
  );
};

export default AddActivityOverview;
