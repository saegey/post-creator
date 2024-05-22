import { useSlateStatic, ReactEditor } from "slate-react";
import { Transforms, Editor } from "slate";
import { Box } from "theme-ui";
import React from "react";
// import { useSlateStatic, ReactEditor } from "slate-react";

import { PowerCurveGraph } from "./PowerCurveGraph";
import { PostContext } from "../../PostContext";
import { PowerGraphType } from "../../../types/common";
import OptionsMenu from "../Editor/OptionsMenu";
import HoverAction from "../Editor/HoverAction";

const PowerGraph = ({ element }: { element: PowerGraphType }) => {
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);
  const { powerAnalysis, currentFtp } = React.useContext(PostContext);

  // const editor = useSlateStatic();
  // const path = ReactEditor.findPath(editor, element);

  // if (!powerAnalysis) {
  //   return <></>;
  // }

  const hoverAction = React.useMemo(() => {
    return (
      <HoverAction element={element}>
        <Box variant="boxes.componentCard" contentEditable={false}>
          <Box sx={{ width: "100%", height: ["250px", "450px", "450px"] }}>
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
          </Box>
          <Box sx={{ position: "absolute", top: "10px", right: "10px" }}>
            <OptionsMenu>
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
            </OptionsMenu>
          </Box>
        </Box>
      </HoverAction>
    );
  }, [element, powerAnalysis, currentFtp]);

  return hoverAction;
};

export default PowerGraph;
