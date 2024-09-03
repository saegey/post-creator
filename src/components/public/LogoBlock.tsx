import React from "react";
import { Box, Link as ThemeLink, Text, Flex } from "theme-ui";
import Link from "next/link";

const LogoBlock = ({
  size,
  inheritColor = false,
}: {
  size?: "small";
  inheritColor?: boolean;
}) => {
  return (
    <Flex sx={{ gap: "10px", alignItems: "center" }}>
      <Box
        sx={{
          width: size === "small" ? "16px" : "20px",
          height: size === "small" ? "16px" : "20px",
          backgroundColor: inheritColor ? "currentColor" : "text",
        }}
      ></Box>
      <ThemeLink
        as={Link}
        href="/"
        sx={{
          color: inheritColor ? "inherit" : "text",
          textDecoration: "none",
        }}
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
