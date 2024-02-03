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
  const { setIsNewComponentMenuOpen, isNewComponentMenuOpen } =
    React.useContext(EditorContext);

  useClickOutside(
    wrapperRef,
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      setIsNewComponentMenuOpen(false);
      e.stopPropagation();
    }
  );

  // React.useEffect(() => {
  //   if (isNewComponentMenuOpen) {
  //     document.body.style.overflow = "hidden";
  //   }

  //   return () => {
  //     document.body.style.overflow = "auto";
  //   };
  // }, [isNewComponentMenuOpen]);

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
        zIndex: "4",
      }}
    >
      <GraphSelectorMenu size={"small"} />
    </Box>
  );
};

export default Menu;
