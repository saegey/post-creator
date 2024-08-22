import React from "react";

import { useClickOutside } from "../../../utils/ux";
import OptionsButton from "../../buttons/OptionsButton";
import Dropdown from "../../shared/Dropdown";
import { Box, Flex } from "theme-ui";
import { EditorContext } from "./EditorContext";
import { Path, Transforms } from "slate";
import { useSlateStatic } from "slate-react";

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
  const { setMobileMenu } = React.useContext(EditorContext);
  const editor = useSlateStatic();

  useClickOutside(
    wrapperRef,
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      setIsOpen(false);
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
          setIsOpen(true);
          Transforms.select(editor, path);
          console.log("OptionsButton clicked");
          console.log(path);
        }}
      />
      <Dropdown isOpen={isOpen}>
        <Flex sx={{ gap: "10px", flexDirection: "column" }}>{children}</Flex>
      </Dropdown>
    </Box>
  );
};

export default OptionsMenu;
