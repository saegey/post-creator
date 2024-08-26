import React from "react";
import { Box, Flex, Link as ThemeLink, Text, Badge } from "theme-ui";
import Link from "next/link";
import { keyframes } from "@emotion/react";

const fadeIn = keyframes({
  from: { height: "0px", opacity: "0" },
  to: { height: "auto", opacity: 1 },
});

const MenuListItem = ({
  onClick,
  title,
  href,
  externalHref,
  disabled = false,
  textColor,
  isVisible,
}: {
  onClick: () => void;
  title: string;
  href?: string;
  externalHref?: string;
  disabled?: boolean;
  textColor?: string;
  isVisible: boolean;
}) => {
  const titleText = !disabled ? (
    <Text sx={{ color: textColor, fontWeight: 300 }}>{title}</Text>
  ) : (
    <Flex sx={{ gap: "10px" }}>
      <Text sx={{ color: "textMuted", fontWeight: 300 }}>{title}</Text>
      <Badge sx={{ backgroundColor: "text" }}>
        <Text sx={{ color: "background" }}>Soon</Text>
      </Badge>
    </Flex>
  );

  return (
    <Flex
      sx={{
        paddingY: "16px",
        display: isVisible ? "flex" : "none",
      }}
    >
      <Box>
        {externalHref && (
          <ThemeLink
            href={externalHref}
            sx={{ textDecoration: "none" }}
            onClick={() => {
              onClick();
            }}
          >
            {titleText}
          </ThemeLink>
        )}
        {href && (
          <ThemeLink
            as={Link}
            href={href}
            sx={{ textDecoration: "none" }}
            onClick={() => {
              onClick();
            }}
          >
            {titleText}
          </ThemeLink>
        )}
        {disabled && titleText}
      </Box>
    </Flex>
  );
};

export default MenuListItem;
