import { Box } from "theme-ui";
import React from "react";

import Map from "./CustomMap";
import ElevationGraph from "./ElevationGraph";
import ElevationSlice from "./ElevationSlice";
import { ActivityItem, VisualOverviewType } from "../../../types/common";
import { VisualOverviewContext } from "./VisualOverviewContext";

interface Vizprops {
  activity: Array<ActivityItem>;
  token: string;
  element: VisualOverviewType;
  view: boolean;
  unitOfMeasure: string;
  elevations: Array<ActivityItem> | undefined;
}

const VisualOverview = ({
  activity,
  token,
  element,
  view,
  unitOfMeasure,
  elevations,
}: Vizprops) => {
  const { selection, setSelection, isSaved } = React.useContext(
    VisualOverviewContext
  );
  const [marker, setMarker] = React.useState<ActivityItem | undefined>();
  const [isZoomedOut, setIsZoomedOut] = React.useState(false);
  const coordinates =
    activity !== undefined ? activity.map((a) => a.c) : undefined;
  const elevationsSynthetic =
    elevations && elevations.length
      ? elevations.map((e) => ({
          ...e,
          e: unitOfMeasure === "metric" ? (e.e ?? 0) / 3.28084 : e.e,
          d:
            unitOfMeasure === "imperial"
              ? Number(((e.d ?? 0) * 0.00062137121212121).toFixed(5))
              : Number(((e.d ?? 0) / 1000).toFixed(5)),
          c: [],
        }))
      : ([] as ActivityItem[]);

  const selectionStart = isZoomedOut
    ? 0
    : selection
    ? selection[0]
    : element.selectionStart
    ? element.selectionStart
    : undefined;

  const selectionEnd = isZoomedOut
    ? activity.length - 2
    : selection
    ? selection[1]
    : element.selectionEnd
    ? element.selectionEnd
    : undefined;

  const graph = React.useMemo(
    () => (
      <ElevationGraph
        data={elevationsSynthetic}
        // left={selectionStart ? activity[selectionStart].d : "dataMin"}
        left={0}
        // right={
        //   elevationsSynthetic
        //     ? elevationsSynthetic[elevationsSynthetic.length - 1].d
        //     : "dataMax"
        // }
        right="dataMax"
        // bottom={
        //   (element && element.selectionEnd) || selection !== undefined
        //     ? Math.min(
        //         ...activity.slice(selectionStart, selectionEnd).map((d) => d.e)
        //       )
        //     : "dataMin"
        // }
        bottom={0}
        top="dataMax"
        setMarker={setMarker}
        selection={selection}
        setSelection={setSelection}
        isSaved={isSaved}
        element={element}
        view={view}
        showZoom={selection === undefined}
        showZoomOut={selection !== undefined}
        showSaveButton={selection ? true : false}
        setIsZoomedOut={setIsZoomedOut}
      />
    ),
    [selection, unitOfMeasure]
  );

  return (
    <Box sx={{ borderRadius: [0, "5px", "5px"] }}>
      {coordinates !== undefined ? (
        <Map
          coordinates={coordinates}
          markerCoordinates={marker}
          token={token}
          element={element}
        />
      ) : (
        <Box>Error</Box>
      )}

      <ElevationSlice
        marker={marker}
        selection={selection}
        data={elevationsSynthetic}
        element={element}
        unitOfMeasure={unitOfMeasure}
      />
      {graph}
    </Box>
  );
};

export default VisualOverview;
