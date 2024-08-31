import { Flex, Text, Box } from "theme-ui";
import React from "react";
import { Path, Transforms } from "slate";

import ActivityOverviewIcon from "../../icons/ActivityOverviewIcon";
import { PostContext } from "../../PostContext";
import { EditorContext } from "./EditorContext";
import { useSlateContext } from "../../SlateContext";

const AddActivityOverview = ({ path }: { path: Path }) => {
  const { gpxFile } = React.useContext(PostContext);
  const { setIsNewComponentMenuOpen } = React.useContext(EditorContext);
  const { setMobileMenu } = React.useContext(EditorContext);

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
        cursor: gpxFile ? "pointer" : "not-allowed",
      }}
    >
      <Flex sx={{ alignItems: "center", gap: "20px" }}>
        <Box
          sx={{
            width: "16px",
            height: "auto",
          }}
        >
          <ActivityOverviewIcon />
        </Box>
        <Text as="span" sx={{ fontSize: "14px" }}>
          Activity Overview
        </Text>
      </Flex>
    </Box>
  );
};

export default AddActivityOverview;
