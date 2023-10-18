import { Grid, Box, Text, Spinner } from 'theme-ui';
import React from 'react';

import { formatTime } from '../utils/time';

const PowerBreakdown = ({
  powerZoneBuckets,
  powerZones,
}: {
  powerZoneBuckets: Array<number> | undefined;
  powerZones:
    | Array<{
        powerLow: number;
        powerHigh: number;
        zone: number;
        title: string;
      }>
    | undefined;
}) => {
  if (!powerZones) {
    return (
      <Box>
        <Spinner />
      </Box>
    );
  }
  return (
    <>
      <Grid gap={2} columns={[3, 3, 3]}>
        {powerZones &&
          Array.isArray(powerZones) &&
          powerZones.map((z, index) => {
            return (
              <Box key={`breakdown-${index}`}>
                <Text
                  as='p'
                  sx={{
                    fontFamily: 'body',
                    fontWeight: '600',
                    fontSize: '14px',
                    textTransform: 'uppercase',
                  }}
                >
                  {z.title}
                </Text>
                <Text as='p' sx={{ fontFamily: 'body', fontSize: '13px' }}>
                  {z.powerLow !== 0 &&
                    z.powerHigh !== 0 &&
                    `${z.powerLow} - ${z.powerHigh} watts`}
                  {z.powerLow !== 0 &&
                    z.powerHigh === 0 &&
                    `${z.powerLow}+ watts`}
                  {z.powerLow === 0 &&
                    z.powerHigh === 0 &&
                    `${z.powerLow} watts`}
                </Text>
                <Text
                  as='p'
                  sx={{
                    marginY: '5px',
                    fontFamily: 'body',
                    fontSize: '20px',
                    fontWeight: '600',
                    lineHeight: '30px',
                  }}
                >
                  {powerZoneBuckets ? formatTime(powerZoneBuckets[index]) : ''}
                </Text>
              </Box>
            );
          })}
      </Grid>
    </>
  );
};

export default PowerBreakdown;
