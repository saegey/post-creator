import { Box } from "theme-ui";
import { Transforms } from "slate";
import { useSlateStatic, ReactEditor } from "slate-react";
import React from "react";

import TimePowerZones from "./TimePowerZones";
import { usePost } from "../../PostContext";
import { CustomEditor, TimeInZonesType } from "../../../types/common";
import OptionsMenu from "../Editor/OptionsMenu";
import HoverAction from "../Editor/HoverAction";

const TimePowerZonesWrapper = ({ element }: { element: TimeInZonesType }) => {
  const editor = useSlateStatic() as CustomEditor;
  const path = ReactEditor.findPath(editor, element);
  const { powerZones, powerZoneBuckets } = usePost();

  const hoverAction = React.useMemo(() => {
    return (
      <HoverAction element={element}>
        <Box variant="boxes.componentCard" contentEditable={false}>
          <TimePowerZones
            powerZoneBuckets={powerZoneBuckets}
            powerZones={powerZones}
          />
          <Box sx={{ position: "absolute", top: "10px", right: "10px" }}>
            <OptionsMenu>
              <Box
                onClick={() => {
                  Transforms.removeNodes(editor, { at: path });
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
  }, [element]);

  return hoverAction;
};

export default TimePowerZonesWrapper;
