import { Box, Spinner } from "theme-ui";
import React from "react";

import Map from "./CustomMap";
import ElevationGraph from "./ElevationGraph";
import ElevationSlice, { gradeToColor } from "./ElevationSlice";
import { useUnits } from "../../UnitProvider";
import { ActivityItem } from "../../../types/common";
import { PostContext } from "../../PostContext";

interface Vizprops {
  activity?: Array<ActivityItem> | undefined;
  token: string;
}

const VisualOverview = ({ activity, token }: Vizprops) => {
  if (!activity || activity.length === 0) {
    return (
      <Box>
        <Spinner />
      </Box>
    );
  }

  const { selection, setSelection } = React.useContext(PostContext);
  const [marker, setMarker] = React.useState<ActivityItem | undefined>();
  // const [selection, setSelection] = React.useState();
  // console.log(selection);
  const [downsampleRate, setDownsampleRate] = React.useState<number>(20);

  // console.log(selection);

  const units = useUnits();

  const downSampledData = React.useMemo(
    () =>
      activity
        ? activity.map((activityRow, i) => {
            return {
              t: activityRow.t,
              c: activityRow.c,
              e:
                units.unitOfMeasure === "metric"
                  ? activityRow.e
                  : activityRow && activityRow.e
                  ? activityRow.e * 3.28084
                  : 0,
              g: activityRow.g,
              d:
                units.unitOfMeasure === "imperial"
                  ? activityRow && activityRow.d
                    ? Number((activityRow.d * 0.00062137121212121).toFixed(5))
                    : 0
                  : activityRow && activityRow.d
                  ? Number((activityRow?.d / 1000).toFixed(5))
                  : 0,
              color: gradeToColor(activityRow.g ? activityRow.g * 100 : 0),
            };
          })
        : undefined,
    [activity, units.unitOfMeasure]
  ) as any;

  const coordinates = React.useMemo(
    () =>
      downSampledData
        ? downSampledData.map((a: ActivityItem) => a.c)
        : undefined,
    [downSampledData]
  ) as any;

  const graph = React.useMemo(() => {
    return (
      <ElevationGraph
        downSampledData={downSampledData}
        setMarker={setMarker}
        selection={selection}
        setSelection={setSelection}
        downsampleRate={downsampleRate}
        setDownsampleRate={setDownsampleRate}
      />
    );
  }, [downSampledData, downsampleRate, selection]) as React.ReactNode;

  return (
    <Box sx={{ marginTop: "60px", borderRadius: [0, "5px", "5px"] }}>
      <Map
        coordinates={coordinates}
        markerCoordinates={marker}
        token={token}
        selection={selection}
        downsampleRate={downsampleRate}
      />
      <ElevationSlice
        marker={marker}
        selection={selection}
        downSampledData={downSampledData}
        downsampleRate={downsampleRate}
      />
      {graph}
    </Box>
  );
};

export default VisualOverview;
