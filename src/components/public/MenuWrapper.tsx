import React from "react";
import { Box } from "theme-ui";

const MenuWrapper = ({
  children,
  isOpen,
}: {
  children: JSX.Element;
  isOpen: boolean;
}) => {
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (menuRef.current === null || menuRef.current === undefined) {
      return;
    }

    if (isOpen === true) {
      const menuHeight = menuRef?.current?.scrollHeight;
      menuRef.current.style.height = `${menuHeight}px`;
    } else {
      menuRef.current.style.height = "0";
    }
  }, [isOpen]);

  return (
    <Box
      ref={menuRef}
      sx={{
        transition: "height .5s ease, opacity 1s ease",
        height: "auto",
        // overflow: "hidden",
        opacity: isOpen ? 1 : 0,
      }}
    >
      {children}
    </Box>
  );
};

export default MenuWrapper;
