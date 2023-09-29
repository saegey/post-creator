import React from 'react';
import { Box, Flex, Text } from 'theme-ui';
import { RaceResultRow } from './PostContext';

const RaceResultsDotComList = ({
  raceResults,
}: {
  raceResults: RaceResultRow | undefined;
}) => {
  return (
    <>
      <Text as='h2'>Race Results</Text>
      <Box sx={{ height: '500px', overflowY: 'scroll' }}>
        {raceResults &&
          raceResults?.results?.map((row) => {
            return (
              <Flex
                sx={{
                  paddingY: '2px',
                  paddingX: '5px',
                  backgroundColor:
                    row.Name === raceResults?.selected?.Name
                      ? 'selectedBackground'
                      : null,
                  color:
                    row.Name === raceResults?.selected?.Name
                      ? 'selectedBackgroundText'
                      : null,
                  borderRadius: '5px',
                }}
              >
                <Text as='span' sx={{ width: '60px' }}>
                  {row.CatPlace}
                </Text>
                <Text as='span' sx={{ width: '300px' }}>
                  {row.Name}
                </Text>
                <Text as='span'>{row.Speed}</Text>
                <Text as='span' sx={{ marginLeft: 'auto' }}>
                  {row.Time}
                </Text>
              </Flex>
            );
          })}
      </Box>
    </>
  );
};

export default RaceResultsDotComList;
