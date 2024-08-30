import { Text, ThemeUIStyleObject, Theme } from "theme-ui";
import { useSlateStatic, ReactEditor } from "slate-react";
import React from "react";

import { HeadingElement } from "../../../types/common";
import HoverAction from "../Editor/HoverAction";
import useOptionsMenu from "../../../hooks/useSlateOptionsMenu";

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
          <Text
            as="h2"
            sx={
              {
                fontWeight: 700,
                maxWidth: "690px",
                width: ["100%", "690px", "690px"],
                marginLeft: "auto",
                marginRight: "auto",
                paddingX: ["10px", "0px", "0px"],
              } as ThemeUIStyleObject<Theme>
            }
          >
            {children}
          </Text>
          {optionsMenu}
        </>
      </HoverAction>
    );
  }, [isOptionsOpen, element]);

  return headingMemo;
};

export default Heading;
