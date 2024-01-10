import React from "react";
import { Box, Flex, Text } from "theme-ui";

import CaretDown from "../icons/CaretDown";

const MenuHeadingItem = ({
  name,
  isOpen,
  setIsOpen,
}: {
  name: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Flex
      sx={{ padding: "16px" }}
      onClick={() => {
        setIsOpen(!isOpen);
      }}
    >
      <Text sx={{ fontWeight: 500 }}>{name}</Text>
      <Flex
        sx={{
          flexGrow: 1,
          justifyContent: "right",
          // flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: "auto",
            height: "24px",
            // transform:
            //   "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
            // transformStyle: "preserve-3d",
            transform: isOpen ? "rotate(180deg)" : "none",
            transitionDuration: isOpen ? "500ms" : "unset",
          }}
        >
          <CaretDown />
        </Box>
      </Flex>
    </Flex>
  );
};

export default MenuHeadingItem;
