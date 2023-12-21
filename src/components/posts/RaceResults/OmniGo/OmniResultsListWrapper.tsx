import React from "react";
import { Box } from "theme-ui";

import { PostContext } from "../../../PostContext";

import OmniResultsList from "./OmniResultsList";

const OmniResultsListWrapper = () => {
  const { omniResults, resultsUrl } = React.useContext(PostContext);

  return (
    <Box variant="boxes.componentCard" contentEditable={false}>
      <OmniResultsList
        raceResults={omniResults}
        resultsUrl={resultsUrl ? resultsUrl : ""}
      />
    </Box>
  );
};

export default OmniResultsListWrapper;
