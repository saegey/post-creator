import React from "react";
import { Box, Text } from "theme-ui";
import { Transforms } from "slate";
import { useSlateStatic, ReactEditor } from "slate-react";

import HoverAction from "../HoverAction";
import { BulletedListType } from "../../../../types/common";
import OptionsMenu from "../../../posts/Editor/OptionsMenu";

import {
  moveNodeDown,
  moveNodeUp,
} from "../../../../utils/SlateUtilityFunctions";

const BulletList = ({
  attributes,
  children,
  element,
}: {
  attributes: object;
  children: JSX.Element;
  element: BulletedListType;
}) => {
  const [isOptionsOpen, setIsOptionsOpen] = React.useState(false);
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);

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
                <Text sx={{ fontSize: ["14px", "16px", "16px"] }}>
                  Move Down
                </Text>
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
    </HoverAction>
  );
};

export default BulletList;
