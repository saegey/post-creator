import React from "react";
import { Box } from "theme-ui";

import { PostContext } from "../../../PostContext";
// import { ResultsContext } from "../ResultsContext";
import RunSignupList from './RunSignupList';

const RunSignupListWrapper = () => {
  const { runSignupResults, resultsUrl } = React.useContext(PostContext);

  return (
    <Box variant="boxes.componentCard" contentEditable={false}>
      <RunSignupList
        raceResults={runSignupResults}
        resultsUrl={resultsUrl ? resultsUrl : ""}
      />
    </Box>
  );
};

export default RunSignupListWrapper;
