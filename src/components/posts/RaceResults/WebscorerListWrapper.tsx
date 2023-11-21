import React from "react";
import { Box } from "theme-ui";
import { PostContext } from "../../PostContext";
import RaceResultsDotComList from "./RaceResultsDotComList";
import WebscorerList from "./WebscorerList";

const WebscorerListWrapper = () => {
  const { webscorerResultPreview } = React.useContext(PostContext);

  return (
    <Box variant="boxes.componentCard" contentEditable={false}>
      <WebscorerList raceResults={webscorerResultPreview} />
    </Box>
  );
};

export default WebscorerListWrapper;
