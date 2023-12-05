import { Box, Grid, Text } from "theme-ui";
import React from "react";

import { useUnits } from "../../UnitProvider";
import { formatTime } from "../../../utils/time";
import { ActivityItem, VisualOverviewType } from "../../../types/common";
import { PostContext } from "../../PostContext";

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
  element,
  units,
}: {
  marker: ActivityItem | undefined;
  selection: [number, number] | undefined;
  downSampledData: any;
  element: VisualOverviewType;
  units: any;
}) => {
  const { powers, hearts } = React.useContext(PostContext);

  // const units = useUnits();
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
      : element && element.selectionEnd && element.selectionStart
      ? (
          (downSampledData[element.selectionEnd].e -
            downSampledData[element.selectionStart].e) /
          (units.unitOfMeasure === "metric"
            ? (downSampledData[element.selectionEnd].d -
                downSampledData[element.selectionStart].d) *
              1000
            : (downSampledData[element.selectionEnd].d -
                downSampledData[element.selectionStart].d) *
              5280)
        ).toFixed(4)
      : "";

  const distance =
    marker && marker.d
      ? marker.d.toFixed(2)
      : selection
      ? (
          downSampledData[selection[1]].d - downSampledData[selection[0]].d
        ).toFixed(2)
      : element && element.selectionEnd && element.selectionStart
      ? (
          downSampledData[element.selectionEnd].d -
          downSampledData[element.selectionStart].d
        ).toFixed(2)
      : "";

  const elevation =
    marker && marker.e
      ? marker.e.toFixed(0)
      : selection
      ? (
          downSampledData[selection[1]].e - downSampledData[selection[0]].e
        ).toFixed(2)
      : element && element.selectionEnd && element.selectionStart
      ? (
          downSampledData[element.selectionEnd].e -
          downSampledData[element.selectionStart].e
        ).toFixed(2)
      : "";

  const time =
    marker && marker.t
      ? marker.t
      : selection
      ? downSampledData[selection[1]].t - downSampledData[selection[0]].t
      : element && element.selectionEnd && element.selectionStart
      ? (
          downSampledData[element.selectionEnd].t -
          downSampledData[element.selectionStart].t
        ).toFixed(2)
      : "";

  let selectPowers;
  if (selection) {
    selectPowers = powers?.slice(selection[0], selection[1]);
  } else if (element && element.selectionStart && element.selectionEnd) {
    selectPowers = powers?.slice(element.selectionStart, element.selectionEnd);
  }

  const power =
    marker && marker.t && powers && time
      ? powers[time as keyof object]
      : selectPowers
      ? selectPowers.reduce((a, b) => a + b) / selectPowers.length
      : undefined;

  const selectHearts =
    hearts && selection
      ? hearts.slice(selection[0], selection[1])
      : element && element.selectionStart && element.selectionEnd
      ? hearts?.slice(element.selectionStart, element.selectionEnd)
      : undefined;

  const heartSummary =
    marker && marker.t && hearts && time
      ? hearts[time as keyof object]
      : selectHearts
      ? selectHearts.reduce((a, b) => a + b) / selectHearts.length
      : undefined;

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
          {grade ? `${(Number(grade) * 100).toFixed(1)}%` : "-"}
        </Text>
      </Box>
      <Box>
        <Text as="p">Distance</Text>
        <Text sx={{ fontSize: "20px" }}>
          {distance
            ? `${distance} ${units.unitOfMeasure === "metric" ? "km" : "mi"}`
            : ""}
        </Text>
      </Box>
      <Box>
        <Text as="p">Elevation</Text>
        <Text sx={{ fontSize: "20px" }}>
          {elevation
            ? `${elevation} ${units.unitOfMeasure === "metric" ? "m" : "ft"}`
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
          {heartSummary ? `${heartSummary.toFixed(0)}` : "-"}
        </Text>
      </Box>
    </Grid>
  );
};

export default ElevationSlice;
