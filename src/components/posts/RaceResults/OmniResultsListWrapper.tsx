import React from "react";
import { Box } from "theme-ui";

import { PostContext } from "../../PostContext";
import CrossResultsList from "./CrossResultsList";
import OmniResultsList from "./OmniResultsList";

const OmniResultsListWrapper = () => {
  const { omniResults } = React.useContext(PostContext);

  return (
    <Box variant="boxes.componentCard" contentEditable={false}>
      <OmniResultsList raceResults={omniResults} />
    </Box>
  );
};

export default OmniResultsListWrapper;
