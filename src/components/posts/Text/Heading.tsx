import { Text, ThemeUIStyleObject, Theme } from "theme-ui";
import { useSlateStatic, ReactEditor } from "slate-react";
import React from "react";

import { HeadingElement } from "../../../types/common";
import HoverAction from "../Editor/HoverAction";
import useOptionsMenu from "../../../hooks/useSlateOptionsMenu";
import HeadingBase from "./HeadingBase";

const Heading = ({
  children,
  element,
}: {
  children: JSX.Element;
  element: HeadingElement;
}) => {
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);
  const { optionsMenu, isOptionsOpen } = useOptionsMenu(editor, path);

  const headingMemo = React.useMemo(() => {
    return (
      <HoverAction element={element}>
        <>
          <HeadingBase>{children}</HeadingBase>
          {optionsMenu}
        </>
      </HoverAction>
    );
  }, [isOptionsOpen, element]);

  return headingMemo;
};

export default Heading;
