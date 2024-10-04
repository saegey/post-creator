import React from "react";
import { Box, Flex } from "theme-ui";
import Logo from "../icons/Logo";

const LogoBlock = () => {
  return (
    <Flex sx={{ gap: "10px", alignItems: "center" }}>
      <Box sx={{ color: "primary", width: "120px" }}>
        <Logo />
      </Box>
    </Flex>
  );
};

export default LogoBlock;
