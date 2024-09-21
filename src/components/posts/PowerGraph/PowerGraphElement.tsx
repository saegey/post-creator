import { useSlateStatic, ReactEditor } from "slate-react";
import { Box, ThemeUIStyleObject, Theme, Text, Flex, Button } from "theme-ui";
import React from "react";

import PowerCurveGraph from "./PowerCurveGraph";
import { PostContext } from "../../PostContext";
import { PowerGraphType } from "../../../types/common";
import HoverAction from "../Editor/HoverAction";
import useOptionsMenu from "../../../hooks/useSlateOptionsMenu";
import { EditorContext } from "../Editor/EditorContext";
import PowerGraphIcon from "../../icons/PowerGraphIcon";

const PowerGraph = ({ element }: { element: PowerGraphType }) => {
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);
  const { powerAnalysis, currentFtp } = React.useContext(PostContext);
  const { optionsMenu, isOptionsOpen } = useOptionsMenu(editor, path);
  const { setIsSettingsModalOpen } = React.useContext(EditorContext);

  if (powerAnalysis === undefined || powerAnalysis === null) {
    return (
      <HoverAction element={element}>
        <>
          <Box variant="boxes.componentCard" contentEditable={false}>
            <Flex
              sx={
                {
                  backgroundColor: "surface",
                  borderRadius: "5px",
                  width: "100%",
                  height: ["250px", "450px", "450px"],
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "20px",
                  flexDirection: "column",
                } as ThemeUIStyleObject<Theme>
              }
            >
              <Flex sx={{ alignItems: "center", gap: "5px" }}>
                <PowerGraphIcon
                  sx={{
                    color: "surfaceAccent",
                    width: "40px",
                    height: "40px",
                    // backgroundColor: "yellow",
                    padding: "0px",
                  }}
                />
                <Text
                  sx={{
                    color: "surfaceAccent",
                    fontSize: "20px",
                    fontWeight: 610,
                  }}
                >
                  Graph requires activity
                </Text>
              </Flex>
              <Button
                variant="primaryButton"
                sx={{ width: "fit-content" }}
                onClick={() => setIsSettingsModalOpen(true)}
              >
                Upload
              </Button>
            </Flex>
            {optionsMenu}
          </Box>
        </>
      </HoverAction>
    );
  }

  const powerGraph = React.useMemo(() => {
    const data = Object.keys(powerAnalysis ? powerAnalysis : [])
      .map((k, _) => {
        if (Number(k) > 0) {
          return {
            x: Number(k),
            y: powerAnalysis ? powerAnalysis[k as keyof Object] : undefined,
          };
        }
      })
      .filter((p) => p !== undefined) as any;

    return (
      <PowerCurveGraph ftp={currentFtp ? Number(currentFtp) : 0} data={data} />
    );
  }, [powerAnalysis, currentFtp]);

  const hoverActMemo = React.useMemo(() => {
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
            {optionsMenu}
          </Box>
          {/* {children} */}
        </>
      </HoverAction>
    );
  }, [isOptionsOpen, powerAnalysis, currentFtp]);

  return hoverActMemo;
};

export default PowerGraph;
