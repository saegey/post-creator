import { Box } from "theme-ui";
import React from "react";

import { HeadingElement } from "../../../types/common";
import HeadingBase from "./HeadingBase";

const HeadingView = ({
  children,
  element,
}: {
  children: JSX.Element;
  element: HeadingElement;
}) => {
  const headingMemo = React.useMemo(() => {
    return (
      <Box
        sx={{
          position: "relative",
          width: ["100%", "690px", "690px"],
          marginX: "auto",
          marginY: "20px",
        }}
      >
        <HeadingBase>{children}</HeadingBase>
      </Box>
    );
  }, [element]);

  return headingMemo;
};

export default HeadingView;
