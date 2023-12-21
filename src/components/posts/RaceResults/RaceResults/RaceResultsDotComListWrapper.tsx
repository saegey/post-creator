import React from "react";
import { Box } from "theme-ui";

import { PostContext } from "../../../PostContext";
import RaceResultsDotComList from "./RaceResultsDotComList";

const RaceResultsDotComListWrapper = () => {
  const { raceResults, resultsUrl } = React.useContext(PostContext);

  return (
    <Box variant="boxes.componentCard" contentEditable={false}>
      {resultsUrl && (
        <RaceResultsDotComList
          raceResults={raceResults}
          resultsUrl={resultsUrl}
        />
      )}
    </Box>
  );
};

export default RaceResultsDotComListWrapper;
