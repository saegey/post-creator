import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Box, Spinner, useThemeUI } from "theme-ui";
import React from "react";

import { useViewport } from "../../ViewportProvider";
import GradeGradient from "./GradeGradient";
import { useUnits } from "../../UnitProvider";
import { ActivityItem } from "../../../types/common";

type ActivityEvent = {
  c: Array<number> | Array<null>;
  g: number;
  d: number;
  t: number | null;
  e: number | null;
};

export interface GradeGradientActivty extends ActivityEvent {
  color: string;
  // grade: number;
}

interface NewLineGraphProps {
  downSampledData: Array<GradeGradientActivty>;
  setMarker?: React.Dispatch<React.SetStateAction<ActivityItem | undefined>>;
}

const ElevationGraph = ({ downSampledData, setMarker }: NewLineGraphProps) => {
  if (!downSampledData || downSampledData.length === 0) {
    return (
      <Box>
        <Spinner />
      </Box>
    );
  }
  const themeContext = useThemeUI();
  // const { width, height } = useViewport();
  const units = useUnits();
  const xMax = Number(downSampledData[downSampledData.length - 1].d);
  const divisor = Number(xMax) <= 30 ? 5 : 10;

  const calcTicks = (): Array<number> => {
    const preTickLen = xMax / 5;
    const calcVal = preTickLen / divisor;
    const interval = Math.trunc(calcVal > 1 ? calcVal : 1) * divisor;

    let ticks = Array.from({ length: 6 }, (_value, index) => {
      if (index === 0 || index * interval > xMax) {
        return;
      }
      return index * interval;
    }).filter((f) => f !== undefined) as Array<number>;

    return ticks;
  };

  const { width } = useViewport();
  const hideAxes = width < 400;

  return (
    <Box
      sx={{
        width: "100%",
        height: ["150px", "200px", "300px"],
        borderWidth: "1px",
        // paddingY: [0, '20px', '20px'],
        paddingX: 0,
        touchAction: "pan-x",
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={downSampledData}
          onMouseMove={(e) => {
            if (!e || !e.activePayload) {
              setMarker({ t: "" });
              return;
            }

            setMarker(e.activePayload[0].payload as { t: string });
          }}
          margin={{ top: 10, right: 0, left: hideAxes ? 0 : 20, bottom: 30 }}
        >
          {!hideAxes && (
            <CartesianGrid stroke={String(themeContext.theme.colors?.muted)} />
          )}

          <Tooltip
            content={
              <Box
                sx={{
                  display: "flex",
                  backgroundColor: "transparent",
                  width: "100vw",
                  height: "100px",
                }}
              ></Box>
            }
          />
          {/* <defs>
            <linearGradient id="splitColor" x1="0" y1="0" x2="1" y2="0">
              <GradeGradient data={downSampledData} xMax={xMax} />
            </linearGradient>
          </defs> */}
          {!hideAxes && (
            <XAxis
              dataKey="d"
              type="number"
              ticks={calcTicks()}
              domain={[0, xMax]}
              tickCount={5}
              interval={0}
              label={{
                value: `Distance (${units.distanceUnit})`,
                position: "bottom",
                fontSize: "14px",
              }}
              allowDecimals={true}
              tickFormatter={(t) => {
                return t;
              }}
              tick={{
                fill: themeContext?.theme?.colors?.text as string,
                fontSize: "14px",
              }}
              hide={hideAxes}
              stroke={themeContext?.theme?.colors?.chartAxes as string}
            />
          )}
          {!hideAxes && (
            <YAxis
              type="number"
              label={{
                value: `Elevation (${units.elevationUnit})`,
                angle: -90,
                position: "left",
                fontSize: "14px",
              }}
              dataKey="e"
              tick={{
                fill: themeContext?.theme?.colors?.text as string,
                fontSize: "14px",
              }}
              stroke={themeContext?.theme?.colors?.chartAxes as string}
              hide={hideAxes}
            />
          )}
          <Area
            type="basisOpen"
            dataKey="e"
            // stroke="url(#splitColor)"
            stroke="black"
            strokeWidth={0}
            fill="black"
            fillOpacity={0.2}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default ElevationGraph;
