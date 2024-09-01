import React from "react";
import { Box, Theme, ThemeUIStyleObject } from "theme-ui";
import { useSlateStatic, ReactEditor } from "slate-react";

import { PostContext } from "../../../PostContext";
import WebscorerList from "./WebscorerList";
import HoverAction from "../../Editor/HoverAction";
import { CustomElement } from "../../../../types/common";
import useOptionsMenu from "../../../../hooks/useSlateOptionsMenu";

const WebscorerListWrapper = ({ element }: { element: CustomElement }) => {
  const { webscorerResults, resultsUrl } = React.useContext(PostContext);
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);
  const { optionsMenu, isOptionsOpen } = useOptionsMenu(editor, path);

  const hoverAct = React.useMemo(() => {
    return (
      <HoverAction element={element}>
        <Box
          variant="boxes.componentCard"
          contentEditable={false}
          sx={{ backgroundColor: "background" }}
        >
          <Box sx={{ position: "relative" } as ThemeUIStyleObject<Theme>}>
            <WebscorerList
              raceResults={webscorerResults ? webscorerResults : undefined}
              resultsUrl={resultsUrl ? resultsUrl : ""}
            />
          </Box>
          {optionsMenu}
        </Box>
      </HoverAction>
    );
  }, [isOptionsOpen, webscorerResults]);

  return hoverAct;
};

export default WebscorerListWrapper;
