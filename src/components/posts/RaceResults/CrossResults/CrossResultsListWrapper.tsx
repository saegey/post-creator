import React from "react";
import { Box } from "theme-ui";

import { PostContext } from "../../../PostContext";
import CrossResultsList from "./CrossResultsList";

const CrossResultstListWrapper = () => {
  const { crossResults, resultsUrl } = React.useContext(PostContext);

  return (
    <Box variant="boxes.componentCard" contentEditable={false}>
      <CrossResultsList
        raceResults={crossResults}
        resultsUrl={resultsUrl ? resultsUrl : ""}
      />
    </Box>
  );
};

export default CrossResultstListWrapper;
