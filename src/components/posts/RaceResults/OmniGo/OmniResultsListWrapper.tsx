import React from "react";
import { Box } from "theme-ui";

import { PostContext } from "../../../PostContext";

import OmniResultsList from "./OmniResultsList";
import HoverAction from "../../Editor/HoverAction";
import { CustomElement } from "../../../../types/common";

const OmniResultsListWrapper = ({ element }: { element: CustomElement }) => {
  const { omniResults, resultsUrl } = React.useContext(PostContext);

  return (
    <HoverAction element={element}>
      <Box variant="boxes.componentCard" contentEditable={false}>
        <OmniResultsList
          raceResults={omniResults}
          resultsUrl={resultsUrl ? resultsUrl : ""}
        />
      </Box>
    </HoverAction>
  );
};

export default OmniResultsListWrapper;
