import { Box } from 'theme-ui';
import React from 'react';

import Map from './CustomMap';
import ElevationGraph from './ElevationGraph';
import ElevationSlice, { gradeToColor } from './ElevationSlice';
import { useUnits } from './UnitProvider';

interface ActivityEvent {
  c: Array<number> | Array<null>;
  g: number | null;
  t: number | null;
  d: number | null;
  e: number | null;
}

interface Vizprops {
  activity: Array<ActivityEvent>;
  token: string;
}

const VisualOverview = ({ activity, token }: Vizprops) => {
  const [marker, setMarker] = React.useState({
    t: null,
    g: null,
    e: null,
    c: [null, null],
    d: null,
  });
  const units = useUnits();

  const downSampledData = React.useMemo(
    () =>
      activity.map((activityRow) => {
        return {
          t: activityRow.t,
          c: activityRow.c,
          e: activityRow.e,
          g: activityRow.g,
          d: activityRow.d,
          distance:
            units.unitOfMeasure === 'imperial' && activityRow.d
              ? (activityRow.d * 0.00062137121212121).toFixed(1)
              : activityRow.d
              ? (activityRow.d / 1000).toFixed(1)
              : 0,
          color: gradeToColor(activityRow.g ? activityRow.g * 100 : 0),
        };
      }),
    [activity, units.unitOfMeasure]
  );

  const xMax = Number(activity[activity.length - 1].d);
  const coordinates = React.useMemo(
    () => downSampledData.map((a) => a.c),
    [downSampledData]
  );

  return (
    <Box>
      <Map
        coordinates={coordinates}
        markerCoordinates={marker as any}
        token={token}
      />
      <ElevationSlice marker={marker} />
      <ElevationGraph
        downSampledData={downSampledData}
        xMax={xMax}
        setMarker={setMarker as any}
        // elevationToAdd={100}
        // axisLeftTickValues={elevationData.axisLeftTickValues}
        // axisXTickValues={elevationData.axisXTickValues}
        // yMin={yMin}
      />
    </Box>
  );
};

export default VisualOverview;
