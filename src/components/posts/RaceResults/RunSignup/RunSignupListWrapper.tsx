import React from "react";
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

  const resultsList = React.useMemo(
    () => (
      <RunSignupList
        raceResults={runSignupResults ? runSignupResults : undefined}
        resultsUrl={resultsUrl ? resultsUrl : ""}
      />
    ),
    [runSignupResults]
  );

  return (
    <HoverAction element={element}>
      <>
        {resultsList}
        {optionsMenu}
      </>
    </HoverAction>
  );
};

export default RunSignupListWrapper;
