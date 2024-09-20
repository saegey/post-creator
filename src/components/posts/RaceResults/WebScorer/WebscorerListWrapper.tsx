import React from "react";
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
      <WebscorerList
        raceResults={webscorerResults ? webscorerResults : undefined}
        resultsUrl={resultsUrl ? resultsUrl : ""}
      />
    );
  }, [isOptionsOpen, webscorerResults]);

  return (
    <HoverAction element={element}>
      <>
        {hoverAct}
        {optionsMenu}
      </>
    </HoverAction>
  );
};

export default WebscorerListWrapper;
