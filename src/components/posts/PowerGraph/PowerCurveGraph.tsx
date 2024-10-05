import { Box, Text, useThemeUI } from "theme-ui";
import * as React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  YAxis,
  XAxis,
  Tooltip,
  ReferenceLine,
  Label,
} from "recharts";
import { formatTime, formatSeconds } from "./utils/timeUtils";
import { PowerCurveGraphProps } from "./types";
import { useViewport } from "../../ViewportProvider";

const PowerCurveGraph = ({ data, ftp }: PowerCurveGraphProps) => {
  const ticks = [1, 2, 3, 4, 5, 10, 60, 300, 600, 1200, 3600, 7200, 14400];
  const context = useThemeUI();
  const { theme } = context;
  const { width } = useViewport();
  const hideAxes = width < 500;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: hideAxes ? 10 : 25,
          right: hideAxes ? 20 : 20,
          left: hideAxes ? -10 : 20,
          bottom: hideAxes ? 0 : 25,
        }}
      >
        <Line dataKey="y" dot={false} strokeWidth={2} />
        <YAxis
          type="number"
          tick={{
            fill: theme?.colors?.text as string,
            fontSize: "14px",
          }}
          tickLine={{
            stroke: theme?.colors?.text as string,
          }}
          axisLine={{
            stroke: theme?.colors?.text as string,
          }}
          padding={{ top: 0, bottom: 0 }}
          label={
            hideAxes
              ? {
                  angle: -90,
                  position: "left",
                  fill: theme?.colors?.text as string,
                }
              : {
                  value: "Watts",
                  angle: -90,
                  position: "left",
                  fill: theme?.colors?.text as string,
                }
          }
        />
        <XAxis
          dataKey="x"
          scale="log"
          domain={[1, "dataMax"]}
          ticks={ticks}
          tickFormatter={formatSeconds}
          tick={{ fill: theme?.colors?.text as string, fontSize: "14px" }}
          tickLine={{ stroke: theme?.colors?.text as string }}
          axisLine={{ stroke: theme?.colors?.text as string }}
        >
          {!hideAxes && (
            <Label
              value="Time"
              offset={0}
              position="bottom"
              fill={theme?.colors?.text as string}
            />
          )}
        </XAxis>
        <Tooltip
          content={({ payload }) => {
            if (!payload || payload.length < 1) return <></>;
            return (
              <Box
                sx={{
                  backgroundColor: "surface",
                  padding: "5px",
                  borderRadius: "5px",
                  color: "text",
                }}
              >
                <Text as="p" sx={{ fontSize: "13px" }}>
                  {formatTime(payload[0].payload.x)}
                </Text>
                <p style={{ fontSize: "13px" }}>{payload[0].payload.y} watts</p>
              </Box>
            );
          }}
        />
        <ReferenceLine
          y={ftp}
          stroke={theme?.colors?.text as string}
          strokeDasharray="3 3"
        >
          {ftp > 0 && (
            <Label
              value={`FTP - ${ftp} watts`}
              offset={10}
              position="insideBottomLeft"
              fill={theme?.colors?.text as string}
              fontSize={"14px"}
            />
          )}
        </ReferenceLine>
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PowerCurveGraph;
