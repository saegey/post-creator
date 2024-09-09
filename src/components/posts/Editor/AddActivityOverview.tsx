import { Flex, Box } from "theme-ui";
import React from "react";
import { Transforms } from "slate";

import ActivityOverviewIcon from "../../icons/ActivityOverviewIcon";
import { PostContext } from "../../PostContext";
import { EditorContext } from "./EditorContext";
import { useSlateContext } from "../../SlateContext";
import GenericMenuItem from "../../GenericMenuItem";
import Tooltip from "../../shared/Tooltip";

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

  return !gpxFile ? (
    <Tooltip text="Upload an activity file in settings to Enable">
      <Box
        variant="boxes.sidebarMenuItem"
        sx={{
          cursor: gpxFile ? "pointer" : "not-allowed",
        }}
      >
        <GenericMenuItem
          label="Metrics"
          icon={<ActivityOverviewIcon />}
          isDisabled={true}
        />
      </Box>
    </Tooltip>
  ) : (
    <Box
      onClick={() => addActivityOverview()}
      variant="boxes.sidebarMenuItem"
      sx={{
        cursor: "pointer",
      }}
    >
      <GenericMenuItem label="Metrics" icon={<ActivityOverviewIcon />} />
    </Box>
  );
};

export default AddActivityOverview;
