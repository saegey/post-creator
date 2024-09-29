import React from "react";
import { Box, Link as ThemeLink, Text, Flex } from "theme-ui";
import Link from "next/link";
import Logo from "../icons/Logo";

const LogoBlock = ({
  size,
  inheritColor = false,
}: {
  size?: "small";
  inheritColor?: boolean;
}) => {
  return (
    <Flex sx={{ gap: "10px", alignItems: "center" }}>
      <Box sx={{ color: "primary", width: "120px" }}>
        <Logo />
      </Box>
    </Flex>
  );
};

export default LogoBlock;
