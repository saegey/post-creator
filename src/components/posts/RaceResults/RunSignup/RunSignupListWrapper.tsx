import React from "react";
import { Box, Theme, ThemeUIStyleObject } from "theme-ui";
import { useSlateStatic, ReactEditor } from "slate-react";

import { PostContext } from "../../../PostContext";
import RunSignupList from "./RunSignupList";
import { CustomElement } from "../../../../types/common";
import HoverAction from "../../Editor/HoverAction";
import useOptionsMenu from "../../../../hooks/useSlateOptionsMenu";

const RunSignupListWrapper = ({ element }: { element: CustomElement }) => {
  const { runSignupResults, resultsUrl } = React.useContext(PostContext);
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);

  const { optionsMenu } = useOptionsMenu(editor, path);

  return (
    <HoverAction element={element}>
      <Box variant="boxes.componentCard" contentEditable={false}>
        <Box sx={{ position: "relative" } as ThemeUIStyleObject<Theme>}>
          <RunSignupList
            raceResults={runSignupResults ? runSignupResults : undefined}
            resultsUrl={resultsUrl ? resultsUrl : ""}
          />
        </Box>
        {optionsMenu}
      </Box>
    </HoverAction>
  );
};

export default RunSignupListWrapper;
