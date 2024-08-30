import React from "react";
import { Box, Theme, ThemeUIStyleObject } from "theme-ui";
import { Transforms } from "slate";
import { useSlateStatic, ReactEditor } from "slate-react";

import { PostContext } from "../../../PostContext";
import WebscorerList from "./WebscorerList";
import HoverAction from "../../Editor/HoverAction";
import OptionsMenu from "../../Editor/OptionsMenu";
import { CustomElement } from "../../../../types/common";

const WebscorerListWrapper = ({ element }: { element: CustomElement }) => {
  const { webscorerResults, resultsUrl } = React.useContext(PostContext);
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);
  const [isOptionsOpen, setIsOptionsOpen] = React.useState(false);

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
            <WebscorerList
              raceResults={webscorerResults ? webscorerResults : undefined}
              resultsUrl={resultsUrl ? resultsUrl : ""}
            />
            <OptionsMenu
              isOpen={isOptionsOpen}
              setIsOpen={setIsOptionsOpen}
              path={path}
            >
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
  }, [element]);

  return hoverAct;
};

export default WebscorerListWrapper;
