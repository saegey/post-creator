import React from "react";
import { Box, Theme, ThemeUIStyleObject } from "theme-ui";
import { useSlateStatic, ReactEditor } from "slate-react";

import { PostContext } from "../../../PostContext";
import RaceResultsDotComList from "./RaceResultsDotComList";
import { CustomElement } from "../../../../types/common";
import HoverAction from "../../Editor/HoverAction";
import useOptionsMenu from "../../../../hooks/useSlateOptionsMenu";

const RaceResultsDotComListWrapper = ({
  element,
}: {
  element: CustomElement;
}) => {
  const { raceResults, resultsUrl } = React.useContext(PostContext);
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);

  const { optionsMenu, isOptionsOpen } = useOptionsMenu(editor, path);
  const hoverAct = React.useMemo(() => {
    return (
      <Box
        variant="boxes.componentCard"
        contentEditable={false}
        sx={{ backgroundColor: "background" }}
      >
        <Box sx={{ position: "relative" }}>
          <RaceResultsDotComList
            raceResults={raceResults ? raceResults : undefined}
            resultsUrl={resultsUrl ? resultsUrl : ""}
          />
        </Box>
        {/* {optionsMenu} */}
      </Box>
    );
  }, [raceResults, isOptionsOpen]);

  return (
    <HoverAction element={element}>
      <>
        {hoverAct}
        {optionsMenu}
      </>
    </HoverAction>
  );
};

export default RaceResultsDotComListWrapper;
