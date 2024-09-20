import React from "react";
import { useSlateStatic, ReactEditor } from "slate-react";

import HoverAction from "../HoverAction";
import { BulletedListType } from "../../../../types/common";
import useOptionsMenu from "../../../../hooks/useSlateOptionsMenu";
import BulletListBase from "./BulletListBase";

const BulletList = ({
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
    return <BulletListBase>{children}</BulletListBase>;
  }, [element, isOptionsOpen]);

  return (
    <HoverAction element={element}>
      <>
        {bulletListMemo}
        {optionsMenu}
      </>
    </HoverAction>
  );
};

export default BulletList;
