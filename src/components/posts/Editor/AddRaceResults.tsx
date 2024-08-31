import { Flex, Text, Box } from "theme-ui";
import React from "react";
import { Path } from "slate";

import { EditorContext } from "./EditorContext";
import ResultsIcon from "../../icons/ResultsIcon";
import RaceResultsImport from "../RaceResults/RaceResultsImport";
import { useSlateContext } from "../../SlateContext";

const AddRaceResults = ({ path }: { path: Path }) => {
  const {
    isRaceResultsModalOpen,
    setIsRaceResultsModalOpen,
    setIsNewComponentMenuOpen,
    setMobileMenu,
  } = React.useContext(EditorContext);

  // const { editor } = useSlateContext();

  const addResults = () => {
    setIsRaceResultsModalOpen(true);
    // setIsNewComponentMenuOpen(false);
    // setMobileMenu({
    //   top: 0,
    //   left: 0,
    //   display: false,
    //   path: path,
    //   isFullScreen: false,
    // });

    // const selection = window.getSelection();
    // console.log(selection)
    // selection && selection.removeAllRanges();
    // setIsNewComponentMenuOpen(false);
  };

  return (
    <>
      {isRaceResultsModalOpen && <RaceResultsImport path={path} />}
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
