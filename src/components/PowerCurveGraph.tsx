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

  return (
    // <Box
    //   sx={{
    //     height: isMaximized ? '90%' : ['200px', '250px', '300px'],
    //     maxWidth: isMaximized ? '100%' : '690px',
    //     marginRight: 'auto',
    //     marginLeft: 'auto',
    //   }}
    // >
    <ResponsiveContainer width='100%' height='100%'>
      <LineChart
        data={data}
        margin={{ top: 25, right: 20, left: 20, bottom: 25 }}
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
          label={{
            value: 'Watts',
            angle: -90,
            position: 'left',
            fill: theme?.colors?.text as string,
          }}
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
          <Label
            value='Time'
            offset={0}
            position='bottom'
            fill={theme?.colors?.text as string}
          />
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
            value='FTP'
            offset={10}
            position='insideBottomLeft'
            fill={theme?.colors?.text as string}
          />
        </ReferenceLine>
      </LineChart>
    </ResponsiveContainer>
    // </Box>/
  );
};

export { PowerCurveGraph };

// const PowerCurveGraphWrapper = (props: PowerCurveGraphProps) => {
//   const [isMax, setMax] = useState()

//   return (
//     <>
//       {isMax && (
//         <MaximizedContainer title={props.title} openModal={setMax}>
//           <PowerCurveGraph isMaximized={true} {...props} />
//         </MaximizedContainer>
//       )}
//       <ExpandableCard
//         title={props.title}
//         openModal={setMax}
//         expandableOnMobile={false}
//       >
//         <PowerCurveGraph {...props} />
//       </ExpandableCard>
//     </>
//   )
// }
// export default PowerCurveGraphWrapper
