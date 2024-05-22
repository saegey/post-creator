import React from "react";
import { Box } from "theme-ui";
import { Transforms } from "slate";
import { useSlateStatic, ReactEditor } from "slate-react";

import { PostContext } from "../../../PostContext";
import RaceResultsDotComList from "./RaceResultsDotComList";
import OptionsMenu from "../../Editor/OptionsMenu";
import { CustomElement } from "../../../../types/common";
import HoverAction from "../../Editor/HoverAction";

const RaceResultsDotComListWrapper = ({
  element,
}: {
  element: CustomElement;
}) => {
  const { raceResults, resultsUrl } = React.useContext(PostContext);
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);

  return (
    <HoverAction element={element}>
      <Box
        variant="boxes.componentCard"
        contentEditable={false}
        sx={{ backgroundColor: "activityOverviewBackgroundColor" }}
      >
        <Box sx={{ position: "relative" }}>
          {resultsUrl && (
            <RaceResultsDotComList
              raceResults={raceResults}
              resultsUrl={resultsUrl}
            />
          )}
          <OptionsMenu>
            <>
              <Box
                onClick={(e) => {
                  Transforms.removeNodes(editor, { at: path });
                }}
                variant="boxes.dropdownMenuItem"
              >
                Delete
              </Box>
            </>
          </OptionsMenu>
        </Box>
      </Box>
    </HoverAction>
  );
};

export default RaceResultsDotComListWrapper;
