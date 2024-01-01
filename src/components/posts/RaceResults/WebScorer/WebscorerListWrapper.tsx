import React from "react";
import { Box } from "theme-ui";

import { PostContext } from "../../../PostContext";
import WebscorerList from "./WebscorerList";

const WebscorerListWrapper = () => {
  const { webscorerResults, resultsUrl } = React.useContext(PostContext);

  return (
    <Box variant="boxes.componentCard" contentEditable={false}>
      <WebscorerList
        raceResults={webscorerResults}
        resultsUrl={resultsUrl ? resultsUrl : ""}
      />
    </Box>
  );
};

export default WebscorerListWrapper;
