import React from "react";
import { Box } from "theme-ui";

import { PostContext } from "../../../PostContext";
import RunSignupList from "./RunSignupList";
import { CustomElement } from "../../../../types/common";
import HoverAction from "../../Editor/HoverAction";

const RunSignupListWrapper = ({ element }: { element: CustomElement }) => {
  const { runSignupResults, resultsUrl } = React.useContext(PostContext);

  return (
    <HoverAction element={element}>
      <Box variant="boxes.componentCard" contentEditable={false}>
        <RunSignupList
          raceResults={runSignupResults}
          resultsUrl={resultsUrl ? resultsUrl : ""}
        />
      </Box>
    </HoverAction>
  );
};

export default RunSignupListWrapper;
