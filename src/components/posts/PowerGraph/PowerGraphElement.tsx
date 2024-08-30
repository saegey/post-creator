import { useSlateStatic, ReactEditor } from "slate-react";
import { Box, ThemeUIStyleObject, Theme } from "theme-ui";
import React from "react";

import PowerCurveGraph from "./PowerCurveGraph";
import { PostContext } from "../../PostContext";
import { PowerGraphType } from "../../../types/common";
import HoverAction from "../Editor/HoverAction";
import useOptionsMenu from "../../../hooks/useSlateOptionsMenu";

const PowerGraph = ({ element }: { element: PowerGraphType }) => {
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);
  const { powerAnalysis, currentFtp } = React.useContext(PostContext);
  const { optionsMenu, isOptionsOpen } = useOptionsMenu(editor, path);

  const powerGraph = React.useMemo(() => {
    return (
      <PowerCurveGraph
        ftp={currentFtp ? Number(currentFtp) : 0}
        data={
          Object.keys(powerAnalysis ? powerAnalysis : [])
            .map((k, _) => {
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
