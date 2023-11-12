import { Box } from "theme-ui";
import React from "react";

import { BulletedListType } from "../../../types/common";
import { PostContext } from "../../PostContext";

const BullettedListViewWrapper = ({ node }: { node?: BulletedListType }) => {
  const { id } = React.useContext(PostContext);

  return (
    <Box
      as="ul"
      sx={{
        lineHeight: "30px",
        paddingTop: ["0px", "0px", "0px"],
        paddingBottom: ["0px", "20px", "20px"],
        paddingLeft: ["40px", "25px", "28px"],
        paddingRight: ["20px", "20px", "20px"],
        borderLeftColor: "postBorderLeft",
        borderLeftStyle: "solid",
        borderLeftWidth: ["0px", "1px", "1px"],
        marginX: "auto",
        maxWidth: "690px",
        fontSize: "19px",
        li: {
          paddingRight: "5px",
          paddingLeft: "15px",
          marginBottom: "10px",
          paddingY: "5px",
        },
      }}
      key={`{bulleted-list-${id}}`}
    >
      {node &&
        node.children.map((c, i) => {
          return (
            <Box as="li" key={`bullet-${i}`}>
              {c.children.map((child, itemNum) => {
                if (child.bold) {
                  return (
                    <Box
                      as="span"
                      sx={{ fontWeight: "700" }}
                      key={`bulleted-list-${id}-${itemNum}`}
                    >
                      {child.text}
                    </Box>
                  );
                }
                return `${child.text}`;
              })}
            </Box>
          );
        })}
    </Box>
  );
};

export default BullettedListViewWrapper;
