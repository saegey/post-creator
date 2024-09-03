import { Box } from "theme-ui";
import React from "react";

import { EditorContext } from "./EditorContext";
import ResultsIcon from "../../icons/ResultsIcon";
import GenericMenuItem from "../../GenericMenuItem";

const AddRaceResults = () => {
  const { setIsRaceResultsModalOpen, menuPosition, setIsNewComponentMenuOpen } =
    React.useContext(EditorContext);
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
        <GenericMenuItem label={"Race Results"} icon={<ResultsIcon />} />
      </Box>
    </>
  );
};

export default AddRaceResults;
