import React from "react";
import { Box } from "theme-ui";

import { PostContext } from "../../PostContext";
import CrossResultsList from './CrossResultsList';

const CrossResultstListWrapper = () => {
  const { crossResults } = React.useContext(PostContext);

  return (
    <Box variant="boxes.componentCard" contentEditable={false}>
      <CrossResultsList raceResults={crossResults} />
    </Box>
  );
};

export default CrossResultstListWrapper;
