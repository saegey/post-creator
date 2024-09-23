import { Box } from "theme-ui";
import React from "react";

import ActivityOverview from "./ActivityOverview";
import { PostContext } from "../../PostContext";
import { ActivityOverviewType } from "../../../types/common";

const ActivityOverviewView = ({
  element,
}: {
  element: ActivityOverviewType;
}) => {
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
    gpxFile,
  } = React.useContext(PostContext);

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
      timeInRed: 0,
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

  return (
    <Box
      sx={{
        position: "relative",
        width: ["100%", "690px", "690px"],
        marginX: "auto",
        marginY: "20px",
      }}
    >
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
      </Box>
    </Box>
  );
};

export default ActivityOverviewView;
