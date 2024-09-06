import { Box, IconButton } from "theme-ui";
import React from "react";

import {
  isMarkActive,
  toggleMark,
} from "../../../../../utils/SlateUtilityFunctions";
import { CustomEditor } from "../../../../../types/common";
import BoldIcon from "../../../../icons/BoldIcon";

const BoldButton = ({ editor }: { editor: CustomEditor }) => {
  return (
    <Box
      onMouseDown={(e) => {
        e.preventDefault();
        toggleMark(editor, "bold");
      }}
      title={"Toggle Bold Text"}
      sx={{
        marginX: ["5px", 0, 0],
        marginBottom: ["5px", 0, 0],
        verticalAlign: "top",
      }}
    >
      <BoldIcon
        sx={{
          color: isMarkActive(editor, "bold") ? "accent" : "secondary",
        }}
      />
    </Box>
  );
};

export default BoldButton;
