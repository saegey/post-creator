import { Box, Spinner } from "theme-ui";
import React from "react";

import Map from "./CustomMap";
import ElevationGraph from "./ElevationGraph";
import ElevationSlice, { gradeToColor } from "./ElevationSlice";
import { useUnits } from "../../UnitProvider";
import { ActivityItem, VisualOverviewType } from "../../../types/common";
import { VisualOverviewContext } from "./VisualOverviewContext";

interface Vizprops {
  activity?: Array<ActivityItem> | undefined;
  token: string;
  element: VisualOverviewType;
  view: boolean;
}

const VisualOverview = ({ activity, token, element, view }: Vizprops) => {
  if (!activity || activity.length === 0) {
    return (
      <Box>
        <Spinner />
      </Box>
    );
  }

  const { selection, setSelection, isSaved } = React.useContext(
    VisualOverviewContext
  );
  const [marker, setMarker] = React.useState<ActivityItem | undefined>();
  const [downsampleRate, setDownsampleRate] = React.useState<number>(20);

  React.useEffect(() => {
    if (element.selectionStart && element.selectionEnd) {
      // setSelection([element.selectionStart, element.selectionEnd]);
    }
  }, [selection]);

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
        isSaved={isSaved}
        downsampleRate={downsampleRate}
        element={element}
        view={view}
      />
    );
  }, [downSampledData, downsampleRate, selection]) as React.ReactNode;

  return (
    <Box sx={{ marginTop: "60px", borderRadius: [0, "5px", "5px"] }}>
      <Map
        coordinates={coordinates}
        markerCoordinates={marker}
        token={token}
        downsampleRate={downsampleRate}
        element={element}
      />
      <ElevationSlice
        marker={marker}
        selection={selection}
        downSampledData={downSampledData}
        element={element}
      />
      {graph}
    </Box>
  );
};

export default VisualOverview;
