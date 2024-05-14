import React from "react";
import { Text } from "theme-ui";

import HoverAction from "./posts/Editor/HoverAction";
import { ParagraphElement as ParagraphElementType } from "../types/common";

const ParagraphElement = ({
  children,
  element,
}: {
  children: JSX.Element;
  element: ParagraphElementType;
}) => {
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
