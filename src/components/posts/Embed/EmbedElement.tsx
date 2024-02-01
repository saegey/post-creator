import { Box, Flex, Embed } from "theme-ui";
import { useSlateStatic, ReactEditor } from "slate-react";
import { Transforms } from "slate";

import { useUnits } from "../../UnitProvider";
import { EmbedElementType } from "../../../types/common";
import OptionsMenu from "../Editor/OptionsMenu";
import HoverAction from "../Editor/HoverAction";

const EmbedElemnt = ({ element }: { element: EmbedElementType }) => {
  const { unitOfMeasure } = useUnits();
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);

  const url = `${element.url}{${
    unitOfMeasure === "metric" ? "&metricUnits=true" : ""
  }}`;

  return (
    <HoverAction>
      <Flex
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
          <OptionsMenu>
            <>
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
    </HoverAction>
  );
};

export default EmbedElemnt;
