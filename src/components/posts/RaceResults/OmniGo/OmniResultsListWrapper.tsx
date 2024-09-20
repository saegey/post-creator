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
      <OmniResultsList
        raceResults={omniResults ? omniResults : undefined}
        resultsUrl={resultsUrl ? resultsUrl : ""}
      />
    );
  }, [isOptionsOpen, omniResults]);

  return (
    <HoverAction element={element}>
      <>
        {hoverAct}
        {optionsMenu}
      </>
    </HoverAction>
  );
};

export default OmniResultsListWrapper;
