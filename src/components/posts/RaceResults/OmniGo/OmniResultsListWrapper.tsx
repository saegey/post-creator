import React from "react";
import { Box, Theme, ThemeUIStyleObject } from "theme-ui";
import { useSlateStatic, ReactEditor } from "slate-react";

import { PostContext } from "../../../PostContext";
import OmniResultsList from "./OmniResultsList";
import HoverAction from "../../Editor/HoverAction";
import { CustomElement } from "../../../../types/common";
import useOptionsMenu from "../../../../hooks/useSlateOptionsMenu";

const OmniResultsListWrapper = ({ element }: { element: CustomElement }) => {
  const { omniResults, resultsUrl } = React.useContext(PostContext);
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);

  const { optionsMenu, isOptionsOpen } = useOptionsMenu(editor, path);

  const hoverAct = React.useMemo(() => {
    return (
      <HoverAction element={element}>
        <Box
          variant="boxes.componentCard"
          contentEditable={false}
          sx={
            {
              backgroundColor: "activityOverviewBackgroundColor",
            } as ThemeUIStyleObject<Theme>
          }
        >
          <Box sx={{ position: "relative" } as ThemeUIStyleObject<Theme>}>
            <OmniResultsList
              raceResults={omniResults ? omniResults : undefined}
              resultsUrl={resultsUrl ? resultsUrl : ""}
            />
          </Box>
          {optionsMenu}
        </Box>
      </HoverAction>
    );
  }, [isOptionsOpen, omniResults]);

  return hoverAct;
};

export default OmniResultsListWrapper;
