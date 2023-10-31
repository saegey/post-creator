import { Box } from "theme-ui";
import React from "react";

import { PostContext } from "../../PostContext";
import ActivityOverview from "./ActivityOverview";

const ActivityOverviewViewWrapper = () => {
  const {
    powerAnalysis,
    elevationTotal,
    id,
    distance,
    normalizedPower,
    heartAnalysis,
    cadenceAnalysis,
    tempAnalysis,
    stoppedTime,
    elapsedTime,
    timeInRed,
  } = React.useContext(PostContext);

  return (
    <Box
      sx={{
        marginY: ["20px", "60px", "60px"],
        maxWidth: "690px",
        marginX: "auto",
        backgroundColor: [
          null,
          "activityOverviewBackgroundColor",
          "activityOverviewBackgroundColor",
        ],
        borderRadius: "5px",
        padding: ["20px", "30px", "30px"],
      }}
      key={`{activityOverview-${id}}`}
    >
      <ActivityOverview
        data={{
          elevationGain: elevationTotal,
          distance,
          normalizedPower,
          heartAnalysis,
          powerAnalysis,
          cadenceAnalysis,
          tempAnalysis,
          stoppedTime,
          elapsedTime: { seconds: elapsedTime ? elapsedTime : 0 },
          timeInRed: timeInRed,
        }}
        selectedFields={[
          "Normalized Power",
          "Avg Heart Rate",
          "Distance",
          "Elevation Gain",
          "Avg Temperature",
          "Avg Speed",
          "Elapsed Time",
          "Stopped Time",
          "Time in Red",
          "Avg Cadence",
          "Avg Power",
        ]}
      />
    </Box>
  );
};

export default ActivityOverviewViewWrapper;
