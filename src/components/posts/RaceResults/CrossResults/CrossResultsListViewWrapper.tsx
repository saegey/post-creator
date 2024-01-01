import { Box } from "theme-ui";
import React from "react";

import { PostContext } from "../../../PostContext";
import CrossResultsList from './CrossResultsList';

const CrossResultsListViewWrapper = () => {
  const { crossResults, resultsUrl } = React.useContext(PostContext);

  return (
    <Box variant="boxes.componentCard" key="race-results">
      <CrossResultsList
        raceResults={crossResults}
        resultsUrl={resultsUrl ? resultsUrl : ""}
      />
    </Box>
  );
};

export default CrossResultsListViewWrapper;
