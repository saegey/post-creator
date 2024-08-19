import React from "react";
import { Box } from "theme-ui";
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

  const hoverAct = React.useMemo(() => {
    return (
      <HoverAction element={element}>
        <Box
          variant="boxes.componentCard"
          contentEditable={false}
          sx={{ backgroundColor: "activityOverviewBackgroundColor" }}
        >
          <Box sx={{ position: "relative" }}>
            <WebscorerList
              raceResults={webscorerResults}
              resultsUrl={resultsUrl ? resultsUrl : ""}
            />
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
  }, [element]);

  return hoverAct;
};

export default WebscorerListWrapper;
