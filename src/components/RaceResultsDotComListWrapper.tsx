import React from 'react';
import { Box, Flex, Text } from 'theme-ui';
import { PostContext } from './PostContext';
import RaceResultsDotComList from './RaceResultsDotComList';

const RaceResultsDotComListWrapper = () => {
  const { raceResults } = React.useContext(PostContext);

  return (
    <Box variant='boxes.componentCard' contentEditable={false}>
      <RaceResultsDotComList raceResults={raceResults} />
    </Box>
  );
};

export default RaceResultsDotComListWrapper;
