import React from "react";
import {
  Flex,
  Link as ThemeLink,
  ThemeUIStyleObject,
  Theme,
  Text,
  IconButton,
  Box,
} from "theme-ui";
import Link from "next/link";

interface MenuItemProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: string;
  icon?: React.ReactNode;
  openNewWindow?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
  href,
  onClick,
  children,
  variant = "profileMenuLink",
  icon,
  openNewWindow,
}) => (
  <Flex
    as="li"
    sx={
      {
        fontSize: "15px",
        fontWeight: 500,
      } as ThemeUIStyleObject<Theme>
    }
    onClick={href ? undefined : onClick}
  >
    {href ? (
      <>
        <ThemeLink
          as={Link}
          variant={variant}
          href={href}
          data-testid="profile-menu-link"
          target={openNewWindow ? "_blank" : ""}
        >
          <Flex sx={{ gap: "15px", height: "100%" }}>
            {icon ? (
              <Flex sx={{ height: "100%", alignItems: "center" }}>
                <IconButton
                  sx={{ padding: "0", width: "16px", height: "16px" }}
                >
                  {icon}
                </IconButton>
              </Flex>
            ) : null}
            <Flex sx={{ alignItems: "center" }}>
              <Box>{children}</Box>
            </Flex>
          </Flex>
        </ThemeLink>
      </>
    ) : (
      <>
        {icon ? <IconButton sx={{ padding: "5px" }}>{icon}</IconButton> : null}
        <Text as="span" variant={variant}>
          {children}
        </Text>
      </>
    )}
  </Flex>
);

export default MenuItem;
