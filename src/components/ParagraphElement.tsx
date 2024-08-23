import React from "react";
import { Text, Box } from "theme-ui";
import { useSlateStatic, ReactEditor } from "slate-react";
import { Transforms } from "slate";

import HoverAction from "./posts/Editor/HoverAction";
import { ParagraphElement as ParagraphElementType } from "../types/common";
import OptionsMenu from "./posts/Editor/OptionsMenu";
import { moveNodeDown, moveNodeUp } from "../utils/SlateUtilityFunctions";

const ParagraphElement = ({
  children,
  element,
}: {
  children: JSX.Element;
  element: ParagraphElementType;
}) => {
  const [isOptionsOpen, setIsOptionsOpen] = React.useState(false);
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);

  return (
    <HoverAction element={element}>
      <>
        <Text
          as="p"
          sx={{
            fontSize: ["16px", "19px", "19px"],
            marginX: ["10px", "0px", "0px"],
          }}
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
                  <Text sx={{ fontSize: ["14px", "16px", "16px"] }}>
                    Move Up
                  </Text>
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
        </Text>
      </>
    </HoverAction>
  );
};

export default ParagraphElement;
