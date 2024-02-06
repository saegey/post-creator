import { Flex, Text, Box, Button } from "theme-ui";
import React from "react";
import { Transforms } from "slate";
import { useSlateStatic } from "slate-react";

import { EditorContext } from "./EditorContext";
import { PostContext } from "../../PostContext";

const AddRouteOverview = () => {
  const editor = useSlateStatic();
  const { gpxFile } = React.useContext(PostContext);
  const { setIsNewComponentMenuOpen, menuPosition } =
    React.useContext(EditorContext);

  const addMap = () => {
    if (gpxFile) {
      Transforms.insertNodes(
        editor,
        { type: "visualOverview", children: [{ text: "" }], void: true },
        { at: menuPosition.path }
      );
      setIsNewComponentMenuOpen(false);
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
      <Flex sx={{ alignItems: "center", gap: "20px" }}>
        <Box
          sx={{
            width: "16px",
            height: "auto",
          }}
        >
          <svg
            className="childButton"
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 6H12.01M9 20L3 17V4L5 5M9 20L15 17M9 20V14M15 17L21 20V7L19 6M15 17V14M15 6.2C15 7.96731 13.5 9.4 12 11C10.5 9.4 9 7.96731 9 6.2C9 4.43269 10.3431 3 12 3C13.6569 3 15 4.43269 15 6.2Z"
              stroke="currentcolor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Box>
        <Text as="span" sx={{ fontSize: "14px" }}>
          Route Overview
        </Text>
      </Flex>
    </Box>
  );
};

export default AddRouteOverview;
