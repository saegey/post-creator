import { Box } from "theme-ui";
import React from "react";

import {
  isMarkActive,
  toggleMark,
} from "../../../../../utils/SlateUtilityFunctions";
import BoldIcon from "../../../../icons/BoldIcon";
import { useSlateContext } from "../../../../SlateContext";
import { lighten } from "@theme-ui/color";

const BoldButton = () => {
  const { editor } = useSlateContext();
  if (!editor) {
    throw new Error("Editor is not defined");
  }

  return (
    <Box
      onMouseDown={(e) => {
        e.preventDefault();
        toggleMark(editor, "bold");
      }}
      title={"Toggle Bold Text"}
      variant="boxes.floatingMenu"
    >
      <BoldIcon
        sx={{
          color: isMarkActive(editor, "bold")
            ? "accent"
            : lighten("primary", 0.3),
        }}
      />
    </Box>
  );
};

export default BoldButton;
