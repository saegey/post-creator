import { Box } from "theme-ui";
import React from "react";

import { PostContext } from "../../../PostContext";
import RunSignupList from './RunSignupList';

const RunSignUpVieweWrapper = () => {
  const { runSignupResults, resultsUrl } = React.useContext(PostContext);

  return (
    <Box variant="boxes.componentCard" key="race-results">
      <RunSignupList
        raceResults={runSignupResults}
        resultsUrl={resultsUrl ? resultsUrl : ""}
      />
    </Box>
  );
};

export default RunSignUpVieweWrapper;
