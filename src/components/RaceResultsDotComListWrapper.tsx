import React from 'react';
import { Box, Flex, Text } from 'theme-ui';
import { PostContext } from './PostContext';
import RaceResultsDotComList from './RaceResultsDotComList';

const RaceResultsDotComListWrapper = () => {
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
      contentEditable={false}
    >
      <RaceResultsDotComList raceResults={raceResults} />
    </Box>
  );
};

export default RaceResultsDotComListWrapper;
