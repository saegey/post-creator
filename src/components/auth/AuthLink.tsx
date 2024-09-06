import React from "react";
import { Box, Flex, Text, Link as ThemeLink } from "theme-ui";
import Link from "next/link";

const AuthLink = ({
  text,
  linkText,
  href,
}: {
  text: string;
  linkText: string;
  href: string;
}) => {
  return (
    <Flex
      sx={{
        borderColor: "border",
        borderWidth: "1px",
        borderStyle: "solid",
        borderRadius: "5px",
        maxWidth: "400px",
        width: ["calc(100% - 40px)", "400px", "400px"],
        margin: "20px",
        padding: "20px",
        gap: "10px",
      }}
    >
      <Text sx={{ fontWeight: "400", fontSize: "15px" }}>
        {/* Already have an account? */}
        {text}
      </Text>
      <ThemeLink
        as={Link}
        href={href}
        sx={{
          textDecoration: "none",
          color: "text",
          "&:hover": { textDecoration: "underline" },
        }}
      >
        <Text sx={{ fontSize: "16px", fontWeight: "600" }}>{linkText}</Text>
      </ThemeLink>
    </Flex>
  );
};

export default AuthLink;
