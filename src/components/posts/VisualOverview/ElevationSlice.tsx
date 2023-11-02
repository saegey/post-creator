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

const ElevationSlice = ({
  marker,
  selection,
  downSampledData,
  downsampleRate,
}: {
  marker: ActivityItem | undefined;
  selection: [number, number];
  downSampledData: any;
  downsampleRate: number;
}) => {
  const units = useUnits();
  const grade =
    marker && marker.g
      ? marker.g
      : selection
      ? (
          (downSampledData[selection[1]].e - downSampledData[selection[0]].e) /
          (units.unitOfMeasure === "metric"
            ? (downSampledData[selection[1]].d -
                downSampledData[selection[0]].d) *
              1000
            : (downSampledData[selection[1]].d -
                downSampledData[selection[0]].d) *
              5280)
        ).toFixed(4)
      : undefined;
  const distance =
    marker && marker.d
      ? marker.d.toFixed(2)
      : selection
      ? (
          downSampledData[selection[1]].d - downSampledData[selection[0]].d
        ).toFixed(2)
      : undefined;

  const elevation =
    marker && marker.e
      ? marker.e.toFixed(0)
      : selection
      ? (
          downSampledData[selection[1]].e - downSampledData[selection[0]].e
        ).toFixed(2)
      : undefined;

  const time =
    marker && marker.t
      ? marker.t
      : selection
      ? downSampledData[selection[1]].t - downSampledData[selection[0]].t
      : undefined;

  // console.log(elevation);

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
            color: grade ? gradeToColor(grade * 100) : "black",
          }}
        >
          {grade ? `${(grade * 100).toFixed(1)}%` : "-"}
        </Text>
      </Box>
      <Box>
        <Text as="p">Distance</Text>
        <Text sx={{ fontSize: "20px" }}>
          {distance ? `${distance} ${units.distanceUnit}` : "-"}
        </Text>
      </Box>
      <Box>
        <Text as="p">Elevation</Text>
        <Text sx={{ fontSize: "20px" }}>
          {elevation ? `${elevation} ${units.elevationUnit}` : "-"}
        </Text>
      </Box>
      <Box>
        <Text as="p">Time</Text>
        <Text sx={{ fontSize: "20px" }}>
          {time ? `${formatTime(time)}` : "-"}
        </Text>
      </Box>
    </Grid>
  );
};

export default ElevationSlice;
