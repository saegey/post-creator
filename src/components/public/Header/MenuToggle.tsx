import React from "react";
import { Flex, MenuButton, Close } from "theme-ui";

const MenuToggle = ({ isMenuOpen, toggleMenu }) => {
  return (
    <Flex sx={{ flexGrow: 1, justifyContent: "right" }}>
      <MenuButton
        onClick={() => toggleMenu(true)}
        sx={{ display: isMenuOpen ? "none" : "inherit" }}
      />
      <Close
        onClick={() => toggleMenu(false)}
        sx={{ display: isMenuOpen ? "inherit" : "none" }}
      />
    </Flex>
  );
};

export default MenuToggle;
