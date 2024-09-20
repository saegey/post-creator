import React from "react";
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
      <CrossResultsList
        raceResults={crossResults}
        resultsUrl={resultsUrl ? resultsUrl : ""}
      />
    );
  }, [crossResults, isOptionsOpen]);

  return (
    <HoverAction element={element}>
      <>
        {hoverAct}
        {optionsMenu}
      </>
    </HoverAction>
  );
};

export default CrossResultstListWrapper;
