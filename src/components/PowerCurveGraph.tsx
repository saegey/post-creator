// import { Box, Text } from 'theme-ui'
import { useThemeUI } from 'theme-ui';
import * as React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  YAxis,
  XAxis,
  Tooltip,
  ReferenceLine,
  Label,
} from 'recharts';
// import { scaleLog } from 'd3-scale'

// import { GraphProps } from '../../../common/types'
// import MaximizedContainer from '../common/MaximizedContainer'
// import ExpandableCard from '../common/ExpandableCard'
// import { formatSeconds, formatTime } from '../../../lib/formatters'
import { formatTime } from '../utils/time';
import { useViewport } from './ViewportProvider';

export interface Coordinate {
  x: number;
  y: number;
}

export const formatSeconds = (value: number) => {
  if (value < 60) {
    return `${value.toFixed(0)}s`;
  }
  if (value >= 3600) {
    return `${(value / 60 / 60).toFixed(0)}h`;
  }
  return `${(value / 60).toFixed(0)}m`;
};

// const scale = scaleLog().base(Math.E)

interface PowerCurveGraphProps {
  // yScaleMax: number
  data: Array<Coordinate>;
  ftp: number;
  // isMaximized: boolean
  // title: string
}

const PowerCurveGraph = ({
  data,
  ftp,
}: // isMaximized = false,
PowerCurveGraphProps) => {
  const ticks = [1, 2, 3, 4, 5, 10, 60, 300, 600, 1200, 3600, 7200, 14400];
  // const accentColor = 'black';
  // const mutedAccent = 'gray';
  const context = useThemeUI();
  const { theme } = context;
  const { width } = useViewport();
  const hideAxes = width < 400;

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <LineChart
        data={data}
        margin={{
          top: hideAxes ? 10 : 25,
          right: hideAxes ? 20 : 20,
          left: hideAxes ? -10 : 20,
          bottom: hideAxes ? 0 : 25,
        }}
      >
        <Line dataKey='y' dot={false} strokeWidth={2} />
        <YAxis
          type='number'
          tick={{
            fill: theme?.colors?.text as string,
            fontSize: '14px',
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
                  position: 'left',
                  fill: theme?.colors?.text as string,
                }
              : {
                  value: 'Watts',
                  angle: -90,
                  position: 'left',
                  fill: theme?.colors?.text as string,
                }
          }
        />
        <XAxis
          dataKey='x'
          scale='log'
          domain={[1, 'dataMax']}
          ticks={ticks}
          tickFormatter={formatSeconds}
          tick={{ fill: theme?.colors?.text as string, fontSize: '14px' }}
          tickLine={{ stroke: theme?.colors?.text as string }}
          axisLine={{ stroke: theme?.colors?.text as string }}
        >
          {!hideAxes && (
            <Label
              value='Time'
              offset={0}
              position='bottom'
              fill={theme?.colors?.text as string}
            />
          )}
        </XAxis>
        <Tooltip
          content={({ payload }) => {
            if (!payload || payload.length < 1) return <></>;
            return (
              <div
                style={{
                  backgroundColor: theme?.colors
                    ?.chartTooltipBackground as string,
                  padding: '5px',
                  borderRadius: '5px',
                }}
              >
                <p style={{ fontSize: '13px' }}>
                  {formatTime(payload[0].payload.x)}
                </p>
                <p style={{ fontSize: '13px' }}>{payload[0].payload.y} watts</p>
              </div>
            );
          }}
        />
        <ReferenceLine
          y={ftp}
          stroke={theme?.colors?.text as string}
          strokeDasharray='3 3'
        >
          <Label
            value={`FTP - ${ftp} watts`}
            offset={10}
            position='insideBottomLeft'
            fill={theme?.colors?.text as string}
            fontSize={'14px'}
          />
        </ReferenceLine>
      </LineChart>
    </ResponsiveContainer>
  );
};

export { PowerCurveGraph };
