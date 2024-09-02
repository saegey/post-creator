// Menu.js
import React from "react";
import { Box } from "theme-ui";
import { useClickOutside } from "../utils/ux";

import GraphSelectorMenu from "./posts/Editor/NewComponentSelectorMenu";
import { EditorContext } from "./posts/Editor/EditorContext";

const Menu = ({
  menuPosition,
}: {
  menuPosition: { top: number; left: number };
}) => {
  const wrapperRef = React.useRef();
  const { setIsNewComponentMenuOpen } = React.useContext(EditorContext);
  console.log("Menu");

  useClickOutside(
    wrapperRef,
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      setIsNewComponentMenuOpen(false);
      e.stopPropagation();
    }
  );

  const menuMemo = React.useMemo(() => {
    return (
      <Box
        ref={wrapperRef}
        sx={{
          position: "absolute",
          top: menuPosition.top - 18,
          left: menuPosition.left,
          // backgroundColor: "yellow",
          width: "200px",
        }}
        variant="boxes.menuItem"
      >
        <GraphSelectorMenu />
      </Box>
    );
  }, [menuPosition.top, menuPosition.left]);

  return menuMemo;
};

export default Menu;
