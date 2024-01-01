import { Box } from "theme-ui";
import React from "react";

import { PostContext } from "../../../PostContext";
import WebscorerList from "./WebscorerList";

const WebscorerViewWrapper = () => {
  const { webscorerResults, resultsUrl } = React.useContext(PostContext);

  return (
    <Box variant="boxes.componentCard" key="race-results">
      <WebscorerList
        raceResults={webscorerResults}
        resultsUrl={resultsUrl ? resultsUrl : ""}
      />
    </Box>
  );
};

export default WebscorerViewWrapper;
