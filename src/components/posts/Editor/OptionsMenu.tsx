import React from "react";
import { Path } from "slate";

import useClickOutside from "../../../hooks/useClickOutside";
import Dropdown from "../../shared/Dropdown";
import { Box, Flex, Theme, ThemeUIStyleObject } from "theme-ui";
import { EditorContext } from "./EditorContext";

const OptionsMenu = ({
  children,
  isOpen,
  setIsOpen,
  path,
}: {
  children: JSX.Element;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  path: Path;
}) => {
  const wrapperRef = React.useRef();
  const { setMobileMenu, menuPosition } = React.useContext(EditorContext);

  useClickOutside(
    wrapperRef,
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      setIsOpen(false);
      e.stopPropagation();
    }
  );

  return (
    <Box
      sx={
        {
          position: "absolute",
          zIndex: 3,
          top: menuPosition.top - 20,
          left: menuPosition.left - 40,
        } as ThemeUIStyleObject<Theme>
      }
      ref={wrapperRef}
      onClick={() => {
        setMobileMenu({
          display: false,
          left: 0,
          top: 0,
          path: path,
          isFullScreen: false,
        });
      }}
    >
      <Dropdown isOpen={isOpen}>
        <Flex
          sx={
            {
              gap: "10px",
              flexDirection: "column",
            } as ThemeUIStyleObject<Theme>
          }
        >
          {children}
        </Flex>
      </Dropdown>
    </Box>
  );
};

export default OptionsMenu;
