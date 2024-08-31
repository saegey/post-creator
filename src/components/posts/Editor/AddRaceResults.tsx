import { Flex, Text, Box } from "theme-ui";
import React from "react";

import { EditorContext } from "./EditorContext";
import ResultsIcon from "../../icons/ResultsIcon";
import ComponentButton from "./ComponentButton";

const AddRaceResults = () => {
  const {
    isRaceResultsModalOpen,
    setIsRaceResultsModalOpen,
    menuPosition,
    setIsNewComponentMenuOpen,
  } = React.useContext(EditorContext);
  const { path } = menuPosition;

  if (!path) {
    return;
  }

  const addResults = () => {
    setIsRaceResultsModalOpen(true);
    setIsNewComponentMenuOpen(false);
  };

  return (
    <>
      <Box
        onClick={() => addResults()}
        variant="boxes.sidebarMenuItem"
        sx={{
          cursor: "pointer",
        }}
        id="add-race-results"
      >
        <ComponentButton
          label={"Race Results"}
          icon={
            <Box
              sx={{
                width: "16px",
                height: "auto",
              }}
            >
              <ResultsIcon />
            </Box>
          }
        />
      </Box>
    </>
  );
};

export default AddRaceResults;
