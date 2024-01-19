import { Flex, Text, Box, Button } from "theme-ui";
import React from "react";
import { Transforms } from "slate";
import { useSlateStatic } from "slate-react";

import { EditorContext } from "./EditorContext";
import { PostContext } from "../../PostContext";
import EmbedIcon from "../../icons/EmbedIcon";
import StandardModal from "../../shared/StandardModal";
import EmbedSettings from "../Embed/EmbedSettings";
import ResultsIcon from "../../icons/ResultsIcon";
import VideoUploader from "../VideoEmbed/VideoUploader";
import VideoIcon from "../../icons/VideoIcon";
import AddPowerCurve from "./PowerCurve";
import AddStravaLink from "./AddStravaLink";
import AddActivityOverview from "./AddActivityOverview";
import AddTimeZones from "./AddTimeZones";
import AddVideo from "./AddVideo";

const AddRaceResults = () => {
  const { setIsRaceResultsModalOpen, setIsNewComponentMenuOpen } =
    React.useContext(EditorContext);

  const addResults = () => {
    setIsRaceResultsModalOpen(true);
    setIsNewComponentMenuOpen(false);
  };

  return (
    <Box
      onClick={() => addResults()}
      variant="boxes.sidebarMenuItem"
      sx={{
        cursor: "pointer",
      }}
      id="add-race-results"
    >
      <Flex sx={{ alignItems: "center", gap: "20px" }}>
        <Box
          sx={{
            width: "25px",
            height: "auto",
            // marginRight: "10px",
          }}
        >
          <ResultsIcon />
        </Box>
        <Text
          as="span"
          sx={{
            color: "text",
          }}
        >
          Race Results
        </Text>
      </Flex>
    </Box>
  );
};

export default AddRaceResults;
