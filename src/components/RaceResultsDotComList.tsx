import React from 'react';
import { Box, Flex, Text } from 'theme-ui';
import { PostContext } from '../PostContext';

const RaceResultsDotComList = () => {
  const { raceResults } = React.useContext(PostContext);

  return (
    <Box
      sx={{
        backgroundColor: 'activityOverviewBackgroundColor',
        borderRadius: '5px',
        padding: ['10px', '30px', '30px'],
        position: 'relative',
        marginY: ['20px', '60px', '60px'],
        marginX: 'auto',
        maxWidth: '690px',
      }}
    >
      <Text as='h2'>Race Results</Text>
      {raceResults?.results?.map((row) => {
        return (
          <Flex
            sx={{
              paddingY: '2px',
              paddingX: '5px',
              backgroundColor:
                row.Name === raceResults?.selectedRow.Name
                  ? 'selectedBackground'
                  : null,
              color:
                row.Name === raceResults?.selectedRow.Name
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
  );
};

export default RaceResultsDotComList;
