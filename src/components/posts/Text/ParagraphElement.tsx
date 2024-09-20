import React from "react";
import { Text, ThemeUIStyleObject, Theme } from "theme-ui";
import { useSlateStatic, ReactEditor } from "slate-react";

import HoverAction from "../../posts/Editor/HoverAction";
import { ParagraphElement as ParagraphElementType } from "../../../types/common";
import useOptionsMenu from "../../../hooks/useSlateOptionsMenu";
import ParagraphBase from "./ParagraphBase";

const ParagraphElement = ({
  children,
  element,
}: {
  children: JSX.Element;
  element: ParagraphElementType;
}) => {
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);
  const { optionsMenu, isOptionsOpen } = useOptionsMenu(editor, path);

  const textMemo = React.useMemo(() => {
    return (
      <>
        <ParagraphBase>{children}</ParagraphBase>
        {optionsMenu}
      </>
    );
  }, [isOptionsOpen, element]);

  return <HoverAction element={element}>{textMemo}</HoverAction>;
};

export default ParagraphElement;
