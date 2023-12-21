import React from "react";
import { Box } from "theme-ui";

import { PostContext } from "../../../PostContext";
import WebscorerList from "./WebscorerList";
import { ResultsContext } from "../ResultsContext";

const WebscorerListWrapper = () => {
  const { webscorerResultPreview, resultsUrl } = React.useContext(PostContext);

  return (
    <Box variant="boxes.componentCard" contentEditable={false}>
      <WebscorerList
        raceResults={webscorerResultPreview}
        resultsUrl={resultsUrl ? resultsUrl : ""}
      />
    </Box>
  );
};

export default WebscorerListWrapper;
