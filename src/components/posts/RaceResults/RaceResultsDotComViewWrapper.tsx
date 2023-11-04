import { Box } from "theme-ui";
import React from "react";

import RaceResultsDotComList from "./RaceResultsDotComList";
import { PostContext } from "../../PostContext";

const RaceResultsDotComViewWrapper = () => {
  const { raceResults } = React.useContext(PostContext);

  return (
    <Box variant="boxes.componentCard">
      <RaceResultsDotComList raceResults={raceResults} />
    </Box>
  );
};

export default RaceResultsDotComViewWrapper;
