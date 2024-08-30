import React from "react";
import { Box, Theme, ThemeUIStyleObject } from "theme-ui";
import { useSlateStatic, ReactEditor } from "slate-react";

import { PostContext } from "../../../PostContext";
import CrossResultsList from "./CrossResultsList";
import { CustomElement } from "../../../../types/common";
import HoverAction from "../../Editor/HoverAction";
import useOptionsMenu from "../../../../hooks/useSlateOptionsMenu";

const CrossResultstListWrapper = ({ element }: { element: CustomElement }) => {
  const { crossResults, resultsUrl } = React.useContext(PostContext);
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);

  const { optionsMenu, isOptionsOpen } = useOptionsMenu(editor, path);

  const hoverAct = React.useMemo(() => {
    return (
      <HoverAction element={element}>
        <Box variant="boxes.componentCard" contentEditable={false}>
          <Box sx={{ position: "relative" } as ThemeUIStyleObject<Theme>}>
            <CrossResultsList
              raceResults={crossResults}
              resultsUrl={resultsUrl ? resultsUrl : ""}
            />
          </Box>
          {optionsMenu}
        </Box>
      </HoverAction>
    );
  }, [crossResults, isOptionsOpen]);

  return hoverAct;
};

export default CrossResultstListWrapper;
