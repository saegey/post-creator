import { Box, Flex, Embed, Text } from "theme-ui";
import { useSlateStatic, ReactEditor } from "slate-react";
import { Transforms } from "slate";
import React from "react";

import { useUnits } from "../../UnitProvider";
import { EmbedElementType } from "../../../types/common";
import OptionsMenu from "../Editor/OptionsMenu";
import HoverAction from "../Editor/HoverAction";
import { moveNodeDown, moveNodeUp } from "../../../utils/SlateUtilityFunctions";

const EmbedElemnt = ({
  element,
  children,
}: {
  element: EmbedElementType;
  children: JSX.Element;
}) => {
  const { unitOfMeasure } = useUnits();
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);
  const [isOptionsOpen, setIsOptionsOpen] = React.useState(false);

  const url = `${element.url}{${
    unitOfMeasure === "metric" ? "&metricUnits=true" : ""
  }}`;

  return (
    <HoverAction element={element}>
      <>
        <Flex
          contentEditable={false}
          sx={{
            minWidth: "100%",
            maxWidth: ["100vw", "690px", "690px"],
            height: "fit-content",
            padding: ["10px", null, null],
            marginY: ["20px", "60px", "60px"],
          }}
        >
          <Box
            sx={{
              marginX: "auto",
              width: ["100%", null, null],
              maxWidth: "690px",
              position: "relative",
            }}
          >
            <Embed
              src={url}
              sx={{
                height: ["500px", "700px", "700px"],
                width: "100%",
                border: "none",
              }}
            />
            <OptionsMenu
              setIsOpen={setIsOptionsOpen}
              isOpen={isOptionsOpen}
              path={path}
            >
              <>
                <Box
                  onClick={() => {
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
                  }}
                  variant="boxes.dropdownMenuItem"
                >
                  <Text sx={{ fontSize: ["14px", "16px", "16px"] }}>
                    Move Down
                  </Text>
                </Box>
                <Box
                  onClick={(e) => {
                    Transforms.removeNodes(editor, { at: path });
                  }}
                  variant="boxes.dropdownMenuItem"
                >
                  Delete
                </Box>
              </>
            </OptionsMenu>
          </Box>
        </Flex>
        {children}
      </>
    </HoverAction>
  );
};

export default EmbedElemnt;
