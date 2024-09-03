import React from "react";
import { Box, Flex, Text, Badge, Link as ThemeLink } from "theme-ui";
import Link from "next/link";

type MenuDropdownProps = {
  isOpen: boolean;
  items: Array<{
    title: string;
    description: string;
    href?: string;
    externalHref?: string;
    soon?: boolean;
    disabled?: boolean;
  }>;
  onItemClick?: () => void;
};

const MenuDropdown = ({ isOpen, items, onItemClick }: MenuDropdownProps) => {
  return isOpen ? (
    <Box variant="boxes.publicMenuDropdown">
      <Flex sx={{ flexDirection: "column", gap: "20px" }}>
        {items.map((item, index) => (
          <Flex sx={{ flexDirection: "column" }} key={index}>
            {item.href ? (
              <ThemeLink
                as={Link}
                href={item.href}
                sx={{ textDecoration: "none" }}
              >
                <Text
                  as="div"
                  sx={{
                    fontWeight: item.disabled ? "400" : "600",
                    color: item.disabled
                      ? "publicMenuItemTitleDisabled"
                      : "publicMenuItemTitle",
                    marginBottom: "5px",
                    cursor: item.disabled ? "not-allowed" : "pointer",
                  }}
                  onClick={onItemClick}
                >
                  {item.title}{" "}
                  {item.soon && (
                    <Badge sx={{ backgroundColor: "publicMenuItemBadge" }}>
                      Soon
                    </Badge>
                  )}
                </Text>
                <Text
                  sx={{
                    fontSize: "14px",
                    color: item.disabled
                      ? "publicMenuItemTitleDisabled"
                      : "publicMenuItemTitle",
                  }}
                >
                  {item.description}
                </Text>
              </ThemeLink>
            ) : (
              <Text
                sx={{
                  fontWeight: "600",
                  color: item.disabled
                    ? "publicMenuItemTitleDisabled"
                    : "publicMenuItemTitle",
                  marginBottom: "5px",
                }}
              >
                {item.title}{" "}
                {item.soon && (
                  <Badge sx={{ backgroundColor: "publicMenuItemBadge" }}>
                    Soon
                  </Badge>
                )}
              </Text>
            )}
          </Flex>
        ))}
      </Flex>
    </Box>
  ) : null;
};

export default MenuDropdown;
