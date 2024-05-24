import { Box, Flex } from "theme-ui";
import React from "react";
import simplify from 'simplify-js';

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
}

const VisualOverview = ({
  activity,
  token,
  element,
  view,
  unitOfMeasure,
}: Vizprops) => {
  const { selection, setSelection, isSaved } = React.useContext(
    VisualOverviewContext
  );
  const [marker, setMarker] = React.useState<ActivityItem | undefined>();
  const [downsampleRate] = React.useState<number>(0);
  const [isZoomedOut, setIsZoomedOut] = React.useState(false);
  const coordinates =
    activity !== undefined ? activity.map((a) => a.c) : undefined;

  const graph = () => {
    const fixedActivity = activity.slice(0, activity.length - 1);
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

    return (
      <ElevationGraph
        data={fixedActivity}
        left={selectionStart ? activity[selectionStart].d : "dataMin"}
        right={selectionEnd ? activity[selectionEnd].d : "dataMax"}
        bottom={
          (element && element.selectionEnd) || selection !== undefined
            ? Math.min(
                ...activity.slice(selectionStart, selectionEnd).map((d) => d.e)
              )
            : "dataMin"
        }
        top={
          (element && element.selectionStart) || selection !== undefined
            ? Math.max(
                ...activity.slice(selectionStart, selectionEnd).map((d) => d.e)
              ) + 100
            : "dataMax"
        }
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
    );
  };

  return (
    <Box sx={{ marginY: "60px", borderRadius: [0, "5px", "5px"] }}>
      {coordinates !== undefined ? (
        <Map
          coordinates={coordinates}
          markerCoordinates={marker}
          token={token}
          // downsampleRate={downsampleRate}
          element={element}
        />
      ) : (
        <Box>Error</Box>
      )}

      <ElevationSlice
        marker={marker}
        selection={selection}
        downSampledData={activity}
        element={element}
        unitOfMeasure={unitOfMeasure}
      />
      {graph()}
    </Box>
  );
};

export default VisualOverview;
