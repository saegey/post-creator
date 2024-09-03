import { Box, Theme, ThemeUIStyleObject } from "theme-ui";
import React from "react";

import { PostContext } from "../../PostContext";
import PowerBreakdown from "./TimePowerZones";

const TimeInZonesViewWrapper = () => {
  const { id, powerZoneBuckets, powerZones } = React.useContext(PostContext);
  return (
    <Box
      sx={
        {
          marginY: ["20px", "60px", "60px"],
          marginX: "auto",
          maxWidth: "690px",
          backgroundColor: [null, "background", "background"],
          padding: ["10px", "30px", "30px"],
          borderRadius: "5px",
        } as ThemeUIStyleObject<Theme>
      }
      key={`{timeInZones-${id}}`}
    >
      <PowerBreakdown
        powerZoneBuckets={powerZoneBuckets ? powerZoneBuckets : []}
        powerZones={powerZones ? powerZones : []}
      />
    </Box>
  );
};

export default TimeInZonesViewWrapper;
