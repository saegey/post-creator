import React from "react";
import { Box } from "theme-ui";
import HoverAction from "../HoverAction";
import { BulletedListType } from "../../../../types/common";

const BulletList = ({
  attributes,
  children,
  element,
}: {
  attributes: object;
  children: JSX.Element;
  element: BulletedListType;
}) => {
  return (
    <HoverAction element={element}>
      <Box
        as="ul"
        sx={{
          lineHeight: "30px",
          paddingTop: ["0px", "0px", "0px"],
          paddingBottom: ["0px", "0px", "0px"],
          paddingLeft: ["40px", "25px", "28px"],
          paddingRight: ["20px", "20px", "20px"],
          // borderLeftColor: "postBorderLeft",
          // borderLeftStyle: "solid",
          // borderLeftWidth: ["0px", "1px", "1px"],
          marginX: "auto",
          marginTop: "10px",
          maxWidth: "690px",
          fontSize: "19px",
          li: {
            paddingRight: "5px",
            paddingLeft: "15px",
            marginBottom: "10px",
            paddingY: "5px",
          },
        }}
        {...attributes}
      >
        {children}
      </Box>
    </HoverAction>
  );
};

export default BulletList;
