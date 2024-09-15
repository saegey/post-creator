import { Box, Button, Flex, Text } from "theme-ui";
import React from "react";
import { useSlateStatic, ReactEditor } from "slate-react";

import ActivityOverview from "./ActivityOverview";
import { PostContext } from "../../PostContext";
import { EditorContext } from "../../posts/Editor/EditorContext";
import { ActivityOverviewType } from "../../../types/common";
import HoverAction from "../Editor/HoverAction";
import useOptionsMenu from "../../../hooks/useSlateOptionsMenu";
import PowerGraphIcon from "../../icons/PowerGraphIcon";
import ActivityOverviewIcon from "../../icons/ActivityOverviewIcon";

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
  const { optionsMenu, isOptionsOpen } = useOptionsMenu(editor, path);
  const { isSettingsModalOpen, setIsSettingsModalOpen } =
    React.useContext(EditorContext);

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
    return optionsMenu;
  }, [isOptionsOpen]);

  console.log(distance);
  if (distance === null || distance === 0) {
    return (
      <HoverAction element={element}>
        <>
          <Box variant="boxes.componentCard" contentEditable={false}>
            <Flex
              sx={{
                backgroundColor: "surface",
                borderRadius: "5px",
                width: "100%",
                height: ["250px", "250px", "250px"],
                alignItems: "center",
                justifyContent: "center",
                gap: "20px",
                flexDirection: "column",
              }}
            >
              <Flex sx={{ alignItems: "center", gap: "10px" }}>
                <ActivityOverviewIcon sx={{ color: "surfaceAccent" }} />
                <Text
                  sx={{
                    color: "surfaceAccent",
                    fontSize: "20px",
                    fontWeight: 610,
                  }}
                >
                  Metrics requires activity
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
