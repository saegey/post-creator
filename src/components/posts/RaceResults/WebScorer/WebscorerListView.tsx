import React from "react";
import { Box } from "theme-ui";

import { PostContext } from "../../../PostContext";
import WebscorerList from "./WebscorerList";
import { CustomElement } from "../../../../types/common";

const WebscorerListView = ({ element }: { element: CustomElement }) => {
  const { webscorerResults, resultsUrl } = React.useContext(PostContext);

  const resultsMemo = React.useMemo(() => {
    return (
      <WebscorerList
        raceResults={webscorerResults ? webscorerResults : undefined}
        resultsUrl={resultsUrl ? resultsUrl : ""}
      />
    );
  }, [webscorerResults]);

  return (
    <Box
      sx={{
        position: "relative",
        width: ["100%", "690px", "690px"],
        marginX: "auto",
        marginY: "20px",
      }}
    >
      {resultsMemo}
    </Box>
  );
};

export default WebscorerListView;
