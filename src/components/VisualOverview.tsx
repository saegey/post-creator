import { Box } from 'theme-ui';
import React from 'react';

import Map from './CustomMap';
import ElevationGraph, { GradeGradientActivty } from './ElevationGraph';
import ElevationSlice, { gradeToColor } from './ElevationSlice';
import { useUnits } from './UnitProvider';

interface ActivityEvent {
  c: Array<number> | Array<null>;
  g: number;
  t: number | null;
  d: number;
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
      activity.map((activityRow, i) => {
        return {
          t: activityRow.t,
          c: activityRow.c,
          e:
            units.unitOfMeasure === 'metric'
              ? activityRow.e
              : activityRow && activityRow.e
              ? activityRow.e * 3.28084
              : 0,
          g: activityRow.g,
          d:
            units.unitOfMeasure === 'imperial'
              ? activityRow && activityRow.d
                ? Number((activityRow.d * 0.00062137121212121).toFixed(1))
                : 0
              : activityRow && activityRow.d
              ? Number((activityRow?.d / 1000).toFixed(1))
              : 0,
          color: gradeToColor(activityRow.g ? activityRow.g * 100 : 0),
        };
      }),
    [activity, units.unitOfMeasure]
  );

  const coordinates = React.useMemo(
    () => downSampledData.map((a) => a.c),
    [downSampledData]
  );

  return (
    <Box sx={{ marginTop: '60px', borderRadius: [0, '5px', '5px'] }}>
      <Map
        coordinates={coordinates}
        markerCoordinates={marker as any}
        token={token}
      />
      <ElevationSlice marker={marker} />
      <ElevationGraph
        downSampledData={downSampledData}
        setMarker={setMarker as any}
      />
    </Box>
  );
};

export default VisualOverview;
