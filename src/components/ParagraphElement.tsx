import React from "react";
import { Text } from "theme-ui";

import HoverAction from "./posts/Editor/HoverAction";

const ParagraphElement = ({ children }: { children: JSX.Element }) => {
  return (
    <HoverAction>
      <Text as="p" sx={{ lineHeight: "32px", fontSize: "19px" }}>
        {children}
      </Text>
    </HoverAction>
  );
};

export default ParagraphElement;
