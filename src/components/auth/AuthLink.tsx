import React from "react";
import { Box, Flex, Text, Link as ThemeLink } from "theme-ui";
import Link from "next/link";
import { darken } from "@theme-ui/color";

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
        maxWidth: ["100%", "400px", "400px"],
        width: ["100%", "400px", "400px"],
        padding: "20px",
        gap: "10px",
        backgroundColor: "background",
        alignItems: "center", // Ensure vertical alignment
      }}
    >
      <Text
        sx={{
          fontWeight: "400",
          fontSize: ["14px", "15px", "15px"],
          flexGrow: 1, // Allows it to take up remaining space
          overflow: "hidden", // Prevents overflow
          whiteSpace: "nowrap", // Prevents text from wrapping
          textOverflow: "ellipsis", // Adds ellipsis if needed
        }}
      >
        {text}
      </Text>
      <ThemeLink
        as={Link}
        href={href}
        sx={{
          textDecoration: "none",
          color: "text",
          "&:hover": { textDecoration: "underline" },
          flexShrink: 0, // Prevents shrinking of the link
        }}
      >
        <Text
          sx={{
            fontSize: ["14px", "15px", "15px"],
            fontWeight: "600",
            whiteSpace: "nowrap", // Prevents wrapping of the link text
          }}
        >
          {linkText}
        </Text>
      </ThemeLink>
    </Flex>
  );
};

export default AuthLink;
