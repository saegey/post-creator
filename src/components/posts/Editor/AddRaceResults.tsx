import { Box } from "theme-ui";
import React from "react";

import { EditorContext } from "./EditorContext";
import ResultsIcon from "../../icons/ResultsIcon";
import GenericMenuItem from "../../GenericMenuItem";

const AddRaceResults = () => {
  const {
    setIsRaceResultsModalOpen,
    menuPosition,
    setIsNewComponentMenuOpen,
    setNewComponentPath,
    setMobileMenu,
  } = React.useContext(EditorContext);
  const { path } = menuPosition;

  if (!path) {
    return;
  }

  const addResults = () => {
    setNewComponentPath(path);
    setIsRaceResultsModalOpen(true);
    setIsNewComponentMenuOpen(false);
    setMobileMenu({
      top: 0,
      left: 0,
      display: false,
      path: path,
      isFullScreen: false,
    });
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
        <GenericMenuItem
          label={"Results"}
          icon={<ResultsIcon sx={{ padding: "6px" }} />}
        />
      </Box>
    </>
  );
};

export default AddRaceResults;
