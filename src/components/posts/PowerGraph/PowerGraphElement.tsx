import { useSlateStatic, ReactEditor } from "slate-react";
import { Transforms } from "slate";
import { Box, Text, ThemeUIStyleObject, Theme } from "theme-ui";
import React from "react";

import PowerCurveGraph from "./PowerCurveGraph";
import { PostContext } from "../../PostContext";
import { PowerGraphType } from "../../../types/common";
import OptionsMenu from "../Editor/OptionsMenu";
import HoverAction from "../Editor/HoverAction";
import { moveNodeDown, moveNodeUp } from "../../../utils/SlateUtilityFunctions";

const PowerGraph = ({
  element,
  children,
}: {
  element: PowerGraphType;
  children: JSX.Element;
}) => {
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);
  const { powerAnalysis, currentFtp } = React.useContext(PostContext);
  const [isOptionsOpen, setIsOptionsOpen] = React.useState(false);

  const powerGraph = React.useMemo(() => {
    return (
      <PowerCurveGraph
        ftp={currentFtp ? Number(currentFtp) : 0}
        data={
          Object.keys(powerAnalysis ? powerAnalysis : [])
            .map((k, i) => {
              if (Number(k) > 0) {
                return {
                  x: Number(k),
                  y: powerAnalysis
                    ? powerAnalysis[k as keyof Object]
                    : undefined,
                };
              }
            })
            .filter((p) => p !== undefined) as any
        }
      />
    );
  }, [powerAnalysis, currentFtp]);

  const optionsMenu = React.useMemo(() => {
    return (
      <OptionsMenu
        setIsOpen={setIsOptionsOpen}
        isOpen={isOptionsOpen}
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
            <Text
              sx={
                {
                  fontSize: ["14px", "16px", "16px"],
                } as ThemeUIStyleObject<Theme>
              }
            >
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
            <Text
              sx={
                {
                  fontSize: ["14px", "16px", "16px"],
                } as ThemeUIStyleObject<Theme>
              }
            >
              Move Down
            </Text>
          </Box>
          <Box
            onClick={() => {
              Transforms.removeNodes(editor, { at: path });
              const selection = window.getSelection();
              selection && selection.removeAllRanges();
            }}
            variant="boxes.dropdownMenuItem"
          >
            Remove
          </Box>
        </>
      </OptionsMenu>
    );
  }, [isOptionsOpen]);

  return (
    <HoverAction element={element}>
      <>
        <Box variant="boxes.componentCard" contentEditable={false}>
          <Box
            sx={
              {
                width: "100%",
                height: ["250px", "450px", "450px"],
              } as ThemeUIStyleObject<Theme>
            }
          >
            {powerGraph}
          </Box>
          <Box
            sx={
              {
                position: "absolute",
                top: "10px",
                right: "10px",
              } as ThemeUIStyleObject<Theme>
            }
          >
            {optionsMenu}
          </Box>
        </Box>
        {children}
      </>
    </HoverAction>
  );
};

export default PowerGraph;
