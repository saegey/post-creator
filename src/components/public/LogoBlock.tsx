import React from "react";
import { Box, Link as ThemeLink, Text, Flex } from "theme-ui";
import Link from "next/link";

import Logo from "../shared/Logo";

const LogoBlock = ({ size }: { size?: "small" }) => {
  return (
    <Flex sx={{ gap: "10px", alignItems: "center" }}>
      <Box
        sx={{
          width: size === "small" ? "16px" : "20px",
          height: size === "small" ? "16px" : "20px",
          backgroundColor: "text",
        }}
      ></Box>
      <ThemeLink
        as={Link}
        href="/"
        sx={{ color: "text", textDecoration: "none" }}
      >
        <Text
          sx={{
            fontSize: size === "small" ? "20px" : "22px",
            fontWeight: "600",
            letterSpacing: "-.5px",
          }}
        >
          Monopad
        </Text>
      </ThemeLink>
    </Flex>
  );
};

export default LogoBlock;
