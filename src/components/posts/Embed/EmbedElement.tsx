import { useSlateStatic, ReactEditor } from "slate-react";
import React from "react";

import { useUnits } from "../../UnitProvider";
import { EmbedElementType } from "../../../types/common";
import HoverAction from "../Editor/HoverAction";
import useOptionsMenu from "../../../hooks/useSlateOptionsMenu";
import EmbedBase from "./EmbedBase";

const EmbedElement = ({ element }: { element: EmbedElementType }) => {
  const { unitOfMeasure } = useUnits();
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);
  const { optionsMenu, isOptionsOpen } = useOptionsMenu(editor, path);

  const url = `${element.url}{${
    unitOfMeasure === "metric" ? "&metricUnits=true" : ""
  }}`;

  const hoverActionMemo = React.useMemo(() => {
    return (
      <HoverAction element={element}>
        <>
          <EmbedBase url={url} />
          {optionsMenu}
        </>
      </HoverAction>
    );
  }, [isOptionsOpen]);

  return hoverActionMemo;
};

export default EmbedElement;
