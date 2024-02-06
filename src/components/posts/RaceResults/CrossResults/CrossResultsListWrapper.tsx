import React from "react";
import { Box } from "theme-ui";

import { PostContext } from "../../../PostContext";
import CrossResultsList from "./CrossResultsList";
import { CustomElement } from "../../../../types/common";
import HoverAction from "../../Editor/HoverAction";

const CrossResultstListWrapper = ({ element }: { element: CustomElement }) => {
  const { crossResults, resultsUrl } = React.useContext(PostContext);

  return (
    <HoverAction element={element}>
      <Box variant="boxes.componentCard" contentEditable={false}>
        <CrossResultsList
          raceResults={crossResults}
          resultsUrl={resultsUrl ? resultsUrl : ""}
        />
      </Box>
    </HoverAction>
  );
};

export default CrossResultstListWrapper;
