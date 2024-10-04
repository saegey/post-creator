import React from "react";
import { Box, Flex, ThemeUIStyleObject } from "theme-ui";
import Logo from "../icons/Logo";

const LogoBlock = ({ sx }: { sx?: ThemeUIStyleObject }) => {
  return (
    <Flex sx={{ gap: "10px", alignItems: "center" }}>
      <Box sx={sx ? sx : { color: "primary", width: "120px" }}>
        <Logo />
      </Box>
    </Flex>
  );
};

export default LogoBlock;
