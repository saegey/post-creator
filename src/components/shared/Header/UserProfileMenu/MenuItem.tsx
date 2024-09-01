import React from "react";
import {
  Flex,
  Link as ThemeLink,
  ThemeUIStyleObject,
  Theme,
  Text,
} from "theme-ui";
import Link from "next/link";

interface MenuItemProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
  href,
  onClick,
  children,
  variant = "profileMenuLink",
}) => (
  <Flex
    as="li"
    // variant="profileMenuItem"
    sx={
      {
        // padding: "5px",
        // margin: "5px",
        fontSize: "15px",
        fontWeight: 500,
      } as ThemeUIStyleObject<Theme>
    }
    onClick={href ? undefined : onClick}
  >
    {href ? (
      <ThemeLink as={Link} variant={variant} href={href}>
        {children}
      </ThemeLink>
    ) : (
      <Text as="span" variant={variant}>
        {children}
      </Text>
    )}
  </Flex>
);

export default MenuItem;
