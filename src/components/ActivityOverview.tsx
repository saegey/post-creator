import { Box, Text, Grid } from 'theme-ui';
import React from 'react';
// import { useUnits } from '../../../context/UnitProvider'
import { useUnits } from './UnitProvider';

interface Item {
  title: string;
  value: string;
}

type RaceStatsProps = {
  items: Item[];
};

const getTimeInRed = (timeInRed) => {
  if (timeInRed === 0 || timeInRed === null) {
    return 'no power data';
  }
  if (timeInRed === '....') {
    return '....';
  }
  return `${new Date(timeInRed * 1000).toISOString().substr(11, 8)}`;
};

const RaceStats = ({ items }: RaceStatsProps) => {
  return (
    <Grid
      gap={2}
      columns={[2, 2, 3]}
      sx={{
        borderRadius: '4px',
        gap: ['30px', '5px 100px', '5px'],
      }}
    >
      {items.map((item, index) => {
        return (
          <Box key={index}>
            <>
              <Text
                sx={{
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  fontSize: ['12px', '14px', '14px'],
                  color: 'text',
                }}
              >
                {item.title}
              </Text>
              <Text
                as='p'
                sx={{
                  fontFamily: 'body',
                  fontSize: ['20px', '30px', '30px'],
                  fontWeight: ['600', '600', '600'],
                  lineHeight: ['30px', '50px', '60px'],
                }}
              >
                {item.value}
              </Text>
            </>
          </Box>
        );
      })}
    </Grid>
  );
};

type Props = {
  data: {
    elevationGain: number;
    distance: number;
    normalizedPower: number;
    heartAnalysis: {
      entire: number;
    } | null;
    tempAnalysis: {
      entire: number;
    } | null;
    powerAnalysis: {
      entire: number;
    } | null;
    cadenceAnalysis: {
      entire: number;
    } | null;
    elapsedTime: {
      seconds: number;
    };
    stoppedTime: number;
    timeInRed: number | string | null;
  };
  selectedFields: string[];
};

const RaceOverview: React.FC<Props> = ({ data, selectedFields = [] }) => {
  const {
    normalizedPower,
    elevationGain,
    distance,
    heartAnalysis,
    elapsedTime,
    tempAnalysis,
    stoppedTime,
    powerAnalysis,
    cadenceAnalysis,
    timeInRed,
  } = data;
  const units = useUnits();

  const items = [
    {
      title: 'Normalized Power',
      value: `${normalizedPower ? normalizedPower.toFixed() : ''} watts`,
    },
    {
      title: 'Elevation Gain',
      value:
        units.unitOfMeasure === 'metric'
          ? `${elevationGain.toFixed(0)} meters`
          : `${(elevationGain * 3.280839895).toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })} ft`,
    },
    {
      title: 'Avg Heart Rate',
      value: heartAnalysis ? `${heartAnalysis.entire} bpm` : 'undfined',
    },
    {
      title: 'Distance',
      value:
        units.unitOfMeasure === 'metric'
          ? `${distance.toFixed(2)} km`
          : `${(distance * 0.621371).toFixed()} miles`,
    },
    {
      title: 'Elapsed Time',
      value: `${new Date(elapsedTime.seconds * 1000)
        .toISOString()
        .substr(11, 8)}`,
    },
    {
      title: 'Moving Time',
      value: `${new Date((elapsedTime.seconds - stoppedTime) * 1000)
        .toISOString()
        .substr(11, 8)}`,
    },
    {
      title: 'Avg Temperature',
      value:
        units.unitOfMeasure === 'metric'
          ? `${tempAnalysis?.entire.toFixed()} °C`
          : tempAnalysis && tempAnalysis.entire
          ? `${(tempAnalysis?.entire * (9 / 5) + 32).toFixed()} °F`
          : '',
    },
    {
      title: 'Avg Speed',
      value:
        units.unitOfMeasure === 'metric'
          ? `${(
              ((distance * 1000) / (elapsedTime.seconds - stoppedTime)) *
              3.6
            ).toFixed(2)} km/h`
          : `${(
              (distance / (elapsedTime.seconds - stoppedTime)) *
              2236.9362920544
            ).toFixed(2)} mph`,
    },
    {
      title: 'Avg Power',
      value: powerAnalysis ? `${powerAnalysis.entire} watts` : 'N/A',
    },
    {
      title: 'Time Stopped',
      value: new Date(stoppedTime * 1000).toISOString().substr(11, 8),
    },
    {
      title: 'Avg Cadence',
      value: cadenceAnalysis ? `${cadenceAnalysis.entire} rpm` : 'N/A',
    },
    {
      title: 'Time in Red',
      value: getTimeInRed(timeInRed),
    },
  ];

  return (
    <Box variant='boxes.figure'>
      <RaceStats
        items={items.filter((activity) =>
          selectedFields.includes(activity.title)
        )}
      />
    </Box>
  );
};

export default RaceOverview;
