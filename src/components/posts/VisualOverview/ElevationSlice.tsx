import { Box, Grid, Text } from "theme-ui";
import React from "react";

import { formatTime } from "../../../utils/time";
import { ActivityItem, VisualOverviewType } from "../../../types/common";
import { usePost } from "../../PostContext";

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
  data,
  element,
  unitOfMeasure,
}: {
  marker: ActivityItem | undefined;
  selection: [number, number] | undefined;
  data: Array<ActivityItem> | undefined;
  element: VisualOverviewType;
  unitOfMeasure: string;
}) => {
  if (!data) return null;
  const grade = marker && marker.i ? data[marker.i].g : "-";

  const distance =
    marker && marker.i && data && data[marker.i] && data[marker.i].d
      ? data[marker.i].d?.toFixed(2)
      : "-";

  const elevation =
    marker && marker.i && data && data[marker.i] && data[marker.i].e
      ? data[marker.i].e?.toFixed(0)
      : "-";

  const time = marker && marker.i ? data[marker.i].t.toFixed(0) : "";

  const power = marker && marker.i ? data[marker.i].p : undefined;

  const heartSummary = marker && marker.i ? data[marker.i].h : undefined;

  return (
    <Grid
      gap={2}
      columns={[2, 6, 6]}
      sx={{
        padding: "10px",
      }}
    >
      <Box>
        <Text as="p">Grade</Text>
        <Text
          sx={{
            fontSize: "20px",
            color: grade ? gradeToColor(Number(grade) * 100) : "black",
          }}
        >
          {grade && grade !== "-"
            ? `${(Number(grade) * 100).toFixed(1)}%`
            : "-"}
        </Text>
      </Box>
      <Box>
        <Text as="p">Distance</Text>
        <Text sx={{ fontSize: "20px" }}>
          {distance && distance !== "-"
            ? `${distance} ${unitOfMeasure === "metric" ? "km" : "mi"}`
            : "-"}
        </Text>
      </Box>
      <Box>
        <Text as="p">Elevation</Text>
        <Text sx={{ fontSize: "20px" }}>
          {elevation && elevation !== "-"
            ? `${elevation} ${unitOfMeasure === "metric" ? "m" : "ft"}`
            : "-"}
        </Text>
      </Box>
      <Box>
        <Text as="p">Time</Text>
        <Text sx={{ fontSize: "20px" }}>
          {time ? `${formatTime(Number(time))}` : "-"}
        </Text>
      </Box>
      <Box>
        <Text as="p">Power</Text>
        <Text sx={{ fontSize: "20px" }}>
          {power ? `${power.toFixed(0)}` : "-"}
        </Text>
      </Box>
      <Box>
        <Text as="p">Heart Rate</Text>
        <Text sx={{ fontSize: "20px" }}>
          {heartSummary
            ? `${heartSummary ? heartSummary.toFixed(0) : "-"}`
            : "-"}
        </Text>
      </Box>
    </Grid>
  );
};

export default ElevationSlice;
