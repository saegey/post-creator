import { Flex, Text, Box, Button } from "theme-ui";
import React from "react";
import { Transforms } from "slate";
import { useSlateStatic } from "slate-react";

import ActivityOverviewIcon from "../../icons/ActivityOverviewIcon";
import { PostContext } from "../../PostContext";
import { EditorContext } from "./EditorContext";

const AddActivityOverview = () => {
  const { gpxFile } = React.useContext(PostContext);
  const { setIsNewComponentMenuOpen } = React.useContext(EditorContext);

  const editor = useSlateStatic();

  const addActivityOverview = () => {
    if (gpxFile) {
      Transforms.insertNodes(editor, [
        {
          type: "activityOverview",
          children: [{ text: "" }],
          void: true,
        },
        { type: "paragraph", children: [{ text: "" }] },
      ]);
      setIsNewComponentMenuOpen(false);
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
            // marginRight: "10px",
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
