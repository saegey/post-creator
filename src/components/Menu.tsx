// Menu.js
import React from "react";
import { useClickOutside } from "../utils/ux";
import { Box } from "theme-ui";
import GraphSelectorMenu from "./posts/Editor/NewComponentSelectorMenu";

const Menu = ({
  onClose,
  menuPosition,
}: {
  onClose: Function;
  menuPosition: { top: number; left: number };
}) => {
  const wrapperRef = React.useRef();
  useClickOutside(
    wrapperRef,
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      onClose();
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
        background: "white",
        border: "1px solid #ddd",
        zIndex: "200",
      }}
    >
      <GraphSelectorMenu size={"small"} />
    </Box>
  );
};

export default Menu;
