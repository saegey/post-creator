// Menu.js
import React from "react";
import { Box } from "theme-ui";
import { useClickOutside } from "../utils/ux";

import GraphSelectorMenu from "./posts/Editor/NewComponentSelectorMenu";
import { EditorContext } from "./posts/Editor/EditorContext";

const Menu = ({
  onClose,
  menuPosition,
}: {
  onClose: Function;
  menuPosition: { top: number; left: number };
}) => {
  const wrapperRef = React.useRef();
  const { setIsNewComponentMenuOpen } = React.useContext(EditorContext);

  useClickOutside(
    wrapperRef,
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      setIsNewComponentMenuOpen(false);
      e.stopPropagation();
    }
  );

  return (
    <Box
      ref={wrapperRef}
      sx={{
        position: "absolute",
        top: menuPosition.top - 50,
        left: menuPosition.left,
        padding: "10px",
        background: "background",
        borderColor: "text",
        borderWidth: "1px",
        borderStyle: "solid",
        // border: "1px solid #ddd",
        borderRadius: "5px",
        zIndex: "200",
      }}
    >
      <GraphSelectorMenu size={"small"} />
    </Box>
  );
};

export default Menu;
