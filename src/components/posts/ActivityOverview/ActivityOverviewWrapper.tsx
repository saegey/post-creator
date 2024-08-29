import { Box, Text, ThemeUIStyleObject, Theme } from "theme-ui";
import { Transforms } from "slate";
import React from "react";
import { useSlateStatic, ReactEditor } from "slate-react";

import ActivityOverview from "./ActivityOverview";
import { PostContext } from "../../PostContext";
import { EditorContext } from "../../posts/Editor/EditorContext";
import { ActivityOverviewType } from "../../../types/common";
import OptionsMenu from "../Editor/OptionsMenu";
import HoverAction from "../Editor/HoverAction";
import { moveNodeDown, moveNodeUp } from "../../../utils/SlateUtilityFunctions";

const ActivityOverviewWrapper = ({
  element,
  children,
}: {
  element: ActivityOverviewType;
  children: JSX.Element;
}) => {
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);
  const {
    elevationTotal,
    normalizedPower,
    heartAnalysis,
    distance,
    elapsedTime,
    stoppedTime,
    timeInRed,
    powerAnalysis,
    cadenceAnalysis,
    tempAnalysis,
    currentFtp,
  } = React.useContext(PostContext);
  const { isFtpUpdating } = React.useContext(EditorContext);
  const [isOptionsOpen, setIsOptionsOpen] = React.useState(false);

  const activityData = React.useMemo(() => {
    return {
      elevationGain: elevationTotal ? elevationTotal : 0,
      distance: distance ? distance : 0,
      normalizedPower: normalizedPower ? normalizedPower : 0,
      heartAnalysis: heartAnalysis ? heartAnalysis : null,
      powerAnalysis: powerAnalysis ? powerAnalysis : null,
      cadenceAnalysis: cadenceAnalysis ? cadenceAnalysis : null,
      tempAnalysis: tempAnalysis ? tempAnalysis : null,
      stoppedTime: stoppedTime ? stoppedTime : 0,
      elapsedTime: { seconds: elapsedTime ? elapsedTime : 0 },
      timeInRed: isFtpUpdating
        ? "...."
        : timeInRed
        ? timeInRed
        : currentFtp !== null
        ? timeInRed
        : 0,
    };
  }, [
    elevationTotal,
    normalizedPower,
    heartAnalysis,
    distance,
    elapsedTime,
    stoppedTime,
    timeInRed,
    powerAnalysis,
    cadenceAnalysis,
    tempAnalysis,
    currentFtp,
  ]);

  const menuMemo = React.useMemo(() => {
    return (
      <Box
        sx={
          {
            position: "absolute",
            top: "10px",
            right: "10px",
          } as ThemeUIStyleObject<Theme>
        }
      >
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
                setIsOptionsOpen(false);
              }}
              variant="boxes.dropdownMenuItem"
            >
              Remove
            </Box>
          </>
        </OptionsMenu>
      </Box>
    );
  }, [isOptionsOpen, setIsOptionsOpen, path]);

  return (
    <HoverAction element={element}>
      <Box variant="boxes.componentCard" contentEditable={false}>
        <ActivityOverview
          data={activityData}
          selectedFields={[
            "Normalized Power",
            "Avg Heart Rate",
            "Distance",
            "Elevation Gain",
            "Avg Temperature",
            "Avg Speed",
            "Elapsed Time",
            "Stopped Time",
            "Avg Cadence",
            "Avg Power",
          ]}
        />
        {menuMemo}
        {children}
      </Box>
    </HoverAction>
  );
};

export default ActivityOverviewWrapper;
