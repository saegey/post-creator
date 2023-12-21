import { Box } from "theme-ui";
import React from "react";

import RaceResultsDotComList from "./RaceResultsDotComList";
import { PostContext } from "../../../PostContext";

const RaceResultsDotComViewWrapper = () => {
  const { raceResults, resultsUrl } = React.useContext(PostContext);

  return (
    <Box variant="boxes.componentCard" key="race-results">
      <RaceResultsDotComList
        raceResults={raceResults}
        resultsUrl={resultsUrl ? resultsUrl : ""}
      />
    </Box>
  );
};

export default RaceResultsDotComViewWrapper;
