import React from "react";
import { Box, Text } from "theme-ui";

import HoverAction from "./posts/Editor/HoverAction";
import { ParagraphElement as ParagraphElementType } from "../types/common";

const ParagraphElement = ({
  children,
  element,
}: {
  children: JSX.Element;
  element: ParagraphElementType;
}) => {
  // console.log(element.children);
  const hover =
    element.children.length === 1 && element.children[0].text === "";

  if (!hover) {
    return (
      <Box
        sx={{
          position: "relative",
          width: ["100%", "690px", "690px"],
          marginX: "auto",
          marginY: "20px",
        }}
      >
        <Text
          as="p"
          sx={{
            fontSize: ["16px", "19px", "19px"],
            marginX: ["10px", "0px", "0px"],
          }}
        >
          {children}
        </Text>
      </Box>
    );
  }

  return (
    <HoverAction element={element}>
      <Text
        as="p"
        sx={{
          fontSize: ["16px", "19px", "19px"],
          marginX: ["10px", "0px", "0px"],
        }}
      >
        {children}
      </Text>
    </HoverAction>
  );
};

export default ParagraphElement;
