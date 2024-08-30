import { Box, Flex, Embed, Text, ThemeUIStyleObject, Theme } from "theme-ui";
import { useSlateStatic, ReactEditor } from "slate-react";
import React from "react";

import { useUnits } from "../../UnitProvider";
import { EmbedElementType } from "../../../types/common";
import HoverAction from "../Editor/HoverAction";
import useOptionsMenu from "../../../hooks/useSlateOptionsMenu";

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
  const { optionsMenu, isOptionsOpen } = useOptionsMenu(editor, path);

  const url = `${element.url}{${
    unitOfMeasure === "metric" ? "&metricUnits=true" : ""
  }}`;

  const hoverActionMemo = React.useMemo(() => {
    return (
      <HoverAction element={element}>
        <>
          <Flex
            contentEditable={false}
            sx={
              {
                minWidth: "100%",
                maxWidth: ["100vw", "690px", "690px"],
                height: "fit-content",
                padding: ["10px", null, null],
                marginY: ["20px", "60px", "60px"],
              } as ThemeUIStyleObject<Theme>
            }
          >
            <Box
              sx={
                {
                  marginX: "auto",
                  width: ["100%", null, null],
                  maxWidth: "690px",
                  position: "relative",
                } as ThemeUIStyleObject<Theme>
              }
            >
              <Embed
                src={url}
                sx={
                  {
                    height: ["500px", "700px", "700px"],
                    width: "100%",
                    border: "none",
                  } as ThemeUIStyleObject<Theme>
                }
              />
              {optionsMenu}
            </Box>
          </Flex>
          {children}
        </>
      </HoverAction>
    );
  }, [isOptionsOpen]);

  return hoverActionMemo;
};

export default EmbedElemnt;
