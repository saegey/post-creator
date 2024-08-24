import { Box, Text } from "theme-ui";
import React from "react";
import { useSlateStatic, ReactEditor } from "slate-react";

import { BulletedListType } from "../../../types/common";
import { PostContext } from "../../PostContext";
import { moveNodeDown, moveNodeUp } from "../../../utils/SlateUtilityFunctions";
import OptionsMenu from "../../posts/Editor/OptionsMenu";

const BullettedListViewWrapper = ({ node }: { node?: BulletedListType }) => {
  const { id } = React.useContext(PostContext);

  const [isOptionsOpen, setIsOptionsOpen] = React.useState(false);
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);

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
      <Box sx={{ position: "absolute", top: "-15px", right: "10px" }}>
        <OptionsMenu
          isOpen={isOptionsOpen}
          setIsOpen={setIsOptionsOpen}
          path={path}
        >
          <>
            <Box
              onClick={(e) => {
                moveNodeUp(editor, path);
                setIsOptionsOpen(false);
              }}
              variant="boxes.dropdownMenuItem"
            >
              <Text sx={{ fontSize: ["14px", "16px", "16px"] }}>Move Up</Text>
            </Box>
            <Box
              onClick={(e) => {
                moveNodeDown(editor, path);
                setIsOptionsOpen(false);
                // setAddCaption(false);
              }}
              variant="boxes.dropdownMenuItem"
            >
              <Text sx={{ fontSize: ["14px", "16px", "16px"] }}>Move Down</Text>
            </Box>
            <Box
              onClick={() => {
                Transforms.removeNodes(editor, { at: path });
              }}
              variant="boxes.dropdownMenuItem"
            >
              Remove
            </Box>
          </>
        </OptionsMenu>
      </Box>
    </Box>
  );
};

export default BullettedListViewWrapper;
