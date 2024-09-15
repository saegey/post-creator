import { Box } from "theme-ui";
import React from "react";
import { Transforms } from "slate";

import ActivityOverviewIcon from "../../icons/ActivityOverviewIcon";
import { EditorContext } from "./EditorContext";
import { useSlateContext } from "../../SlateContext";
import GenericMenuItem from "../../GenericMenuItem";

const AddActivityOverview = () => {
  const { setIsNewComponentMenuOpen, menuPosition } =
    React.useContext(EditorContext);
  const { setMobileMenu } = React.useContext(EditorContext);
  const { path } = menuPosition;

  const { editor } = useSlateContext();

  if (!editor) {
    return;
  }

  const addActivityOverview = () => {
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
  };

  return (
    <Box
      onClick={() => addActivityOverview()}
      variant="boxes.sidebarMenuItem"
      sx={{
        cursor: "pointer",
      }}
    >
      <GenericMenuItem
        label="Metrics"
        icon={<ActivityOverviewIcon sx={{ padding: "6px" }} />}
      />
    </Box>
  );
};

export default AddActivityOverview;
