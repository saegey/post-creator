import React from "react";

import { useClickOutside } from "../../../utils/ux";
import OptionsButton from "../../buttons/OptionsButton";
import Dropdown from "../../shared/Dropdown";
import { Box, Flex } from "theme-ui";
import { EditorContext } from "./EditorContext";

const OptionsMenu = ({ children }: { children: JSX.Element }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const wrapperRef = React.useRef();
  const { setMobileMenu } = React.useContext(EditorContext);

  useClickOutside(
    wrapperRef,
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      setIsMenuOpen(false);
      e.stopPropagation();
    }
  );

  return (
    <Box
      sx={{
        position: "absolute",
        right: "10px",
        top: "10px",
      }}
      ref={wrapperRef}
      onClick={() => {
        setMobileMenu({
          display: false,
          left: 0,
          top: 0,
          path: [0, 0],
          isFullScreen: false,
        });
      }}
    >
      <OptionsButton
        onClick={() => {
          if (isMenuOpen) {
            setIsMenuOpen(false);
          } else {
            setIsMenuOpen(true);
          }
        }}
      />
      <Dropdown isOpen={isMenuOpen}>
        <Flex sx={{ gap: "10px", flexDirection: "column" }}>{children}</Flex>
      </Dropdown>
    </Box>
  );
};

export default OptionsMenu;
