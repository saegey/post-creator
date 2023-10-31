import { Box, Grid, Text } from "theme-ui";
import React from "react";

import { useUnits } from "../../UnitProvider";
import { formatTime } from "../../../utils/time";
import { ActivityItem } from "../../../types/common";

export const gradeToColor = (grade: number): string => {
  if (grade > 0 && grade < 4) return "green";
  if (grade >= 4 && grade < 7) return "orange";
  if (grade <= 0) return "#D3D3D3";
  if (grade >= 7) return "red";
  return "gray";
};

const ElevationSlice = ({ marker }: { marker: ActivityItem | undefined }) => {
  const units = useUnits();

  return (
    <Grid
      gap={2}
      columns={[2, 4, 4]}
      sx={{
        padding: "10px",
      }}
    >
      <Box>
        <Text as="p">Grade</Text>
        <Text
          sx={{
            fontSize: "20px",
            color: marker && marker.g ? gradeToColor(marker.g * 100) : "black",
          }}
        >
          {marker && marker.g ? `${(marker.g * 100).toFixed(1)}%` : "-"}
        </Text>
      </Box>
      <Box>
        <Text as="p">Distance</Text>
        <Text sx={{ fontSize: "20px" }}>
          {marker && marker.d ? `${marker.d} ${units.distanceUnit}` : "-"}
        </Text>
      </Box>
      <Box>
        <Text as="p">Elevation</Text>
        <Text sx={{ fontSize: "20px" }}>
          {marker && marker.e
            ? `${marker.e.toFixed(0)} ${units.elevationUnit}`
            : "-"}
        </Text>
      </Box>
      <Box>
        <Text as="p">Time</Text>
        <Text sx={{ fontSize: "20px" }}>
          {marker && marker.t ? `${formatTime(marker.t)}` : "-"}
        </Text>
      </Box>
    </Grid>
  );
};

export default ElevationSlice;
