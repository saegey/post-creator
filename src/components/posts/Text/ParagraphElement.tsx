import React from "react";
import { Text, ThemeUIStyleObject, Theme } from "theme-ui";
import { useSlateStatic, ReactEditor } from "slate-react";

import HoverAction from "../../posts/Editor/HoverAction";
import { ParagraphElement as ParagraphElementType } from "../../../types/common";
import useOptionsMenu from "../../../hooks/useSlateOptionsMenu";

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
    console.log("ParagraphElementMemoo path:", path);
    return (
      <Text
        as="div"
        sx={
          {
            fontSize: ["16px", "19px", "19px"],
            marginX: ["10px", "0px", "0px"],
          } as ThemeUIStyleObject<Theme>
        }
      >
        {children}
        {optionsMenu}
      </Text>
    );
  }, [isOptionsOpen, element]);

  return <HoverAction element={element}>{textMemo}</HoverAction>;
};

export default ParagraphElement;
