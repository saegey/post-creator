import React from "react";
import { Box } from "theme-ui";

import { ParagraphElement as ParagraphElementType } from "../../../types/common";
import ParagraphBase from "./ParagraphBase";

const ParagraphView = ({
  children,
  element,
}: {
  children: React.ReactNode;
  element: ParagraphElementType;
}) => {
  const textMemo = React.useMemo(() => {
    return (
      <Box
        sx={{
          position: "relative",
          width: ["100%", "690px", "690px"],
          marginX: "auto",
          marginY: "20px",
        }}
      >
        <ParagraphBase>{children}</ParagraphBase>
      </Box>
    );
  }, [element]);

  return textMemo;
};

export default ParagraphView;
