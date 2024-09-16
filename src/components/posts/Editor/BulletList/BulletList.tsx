import React from "react";
import { Box, Theme, ThemeUIStyleObject } from "theme-ui";
import { useSlateStatic, ReactEditor } from "slate-react";

import HoverAction from "../HoverAction";
import { BulletedListType } from "../../../../types/common";
import useOptionsMenu from "../../../../hooks/useSlateOptionsMenu";

const BulletList = ({
  attributes,
  children,
  element,
}: {
  attributes: object;
  children: JSX.Element;
  element: BulletedListType;
}) => {
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);
  const { optionsMenu, isOptionsOpen } = useOptionsMenu(editor, path);

  const bulletListMemo = React.useMemo(() => {
    return (
      <Box
        as="ul"
        sx={
          {
            lineHeight: "30px",
            paddingTop: ["0px", "0px", "0px"],
            paddingBottom: ["0px", "0px", "0px"],
            paddingLeft: ["40px", "25px", "28px"],
            paddingRight: ["20px", "20px", "20px"],
            marginX: "auto",
            marginTop: "10px",
            maxWidth: "690px",
            fontSize: "19px",
            li: {
              paddingRight: "5px",
              paddingLeft: "15px",
              marginBottom: "10px",
              paddingY: "5px",
            },
          } as unknown as ThemeUIStyleObject<Theme>
        }
        {...attributes}
      >
        {children}

        {optionsMenu}
      </Box>
    );
  }, [element, isOptionsOpen]);

  return <HoverAction element={element}>{bulletListMemo}</HoverAction>;
};

export default BulletList;
