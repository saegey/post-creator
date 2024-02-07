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
      sx={{ paddingY: "16px" }}
      onClick={() => {
        setIsOpen(!isOpen);
      }}
    >
      <Text sx={{ fontWeight: 500 }}>{name}</Text>
      <Flex
        sx={{
          flexGrow: 1,
          justifyContent: "right",
        }}
      >
        <Box
          sx={{
            width: "24px",
            height: "24px",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transitionDuration: isOpen ? "500ms" : "500ms",
          }}
        >
          <CaretDown />
        </Box>
      </Flex>
    </Flex>
  );
};

export default MenuHeadingItem;
