import { Box } from "theme-ui";
import React from "react";

import { PostContext } from "../../../PostContext";;
import OmniResultsList from './OmniResultsList';

const OmniResultsListViewWrapper = () => {
  const { omniResults, resultsUrl } = React.useContext(PostContext);

  return (
    <Box variant="boxes.componentCard" key="race-results">
      <OmniResultsList
        raceResults={omniResults}
        resultsUrl={resultsUrl ? resultsUrl : ""}
      />
    </Box>
  );
};

export default OmniResultsListViewWrapper;
