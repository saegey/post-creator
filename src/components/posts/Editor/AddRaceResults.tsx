import { Flex, Text, Box } from "theme-ui";
import React from "react";
import { Path } from "slate";

import { EditorContext } from "./EditorContext";
import ResultsIcon from "../../icons/ResultsIcon";
import RaceResultsImport from "../RaceResults/RaceResultsImport";
import { useSlateStatic } from "slate-react";

const AddRaceResults = ({ path }: { path: Path }) => {
  const {
    isRaceResultsModalOpen,
    setIsRaceResultsModalOpen,
    setIsNewComponentMenuOpen,
  } = React.useContext(EditorContext);
  const editor = useSlateStatic();

  const addResults = () => {
    setIsRaceResultsModalOpen(true);
    // setIsNewComponentMenuOpen(false);
  };

  return (
    <>
      {isRaceResultsModalOpen && (
        <RaceResultsImport path={path} />
      )}
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
    </>
  );
};

export default AddRaceResults;
