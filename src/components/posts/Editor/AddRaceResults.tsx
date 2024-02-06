import { Flex, Text, Box, Button } from "theme-ui";
import React from "react";

import { EditorContext } from "./EditorContext";
import ResultsIcon from "../../icons/ResultsIcon";

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
            width: "16px",
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
            fontSize: "14px",
          }}
        >
          Race Results
        </Text>
      </Flex>
    </Box>
  );
};

export default AddRaceResults;
