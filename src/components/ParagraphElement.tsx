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
        sx={{ lineHeight: "32px", fontSize: "19px" }}
      >
        {children}
      </Text>
    </HoverAction>
  );
};

export default ParagraphElement;
