import React from "react";
import {
  Box,
  Flex,
  Text,
  Badge,
  Link as ThemeLink,
  IconButton,
} from "theme-ui";
import Link from "next/link";
import NewWindowIcon from "../../icons/NewWindowIcon";

type MenuDropdownProps = {
  isOpen: boolean;
  items: Array<{
    title: string;
    description: string;
    href?: string;
    externalHref?: string;
    soon?: boolean;
    disabled?: boolean;
    openInNewTab?: boolean;
  }>;
  openInNewTab?: true;
  onItemClick?: () => void;
};

const MenuDropdown = ({ isOpen, items, onItemClick }: MenuDropdownProps) => {
  return isOpen ? (
    <Box variant="boxes.publicMenuDropdown">
      <Flex sx={{ flexDirection: "column", gap: "10px" }}>
        {items.map((item, index) => (
          <Flex sx={{ flexDirection: "column" }} key={index}>
            {item.href ? (
              <ThemeLink
                as={Link}
                href={item.href}
                target={item.openInNewTab ? "_blank" : ""}
                sx={{
                  textDecoration: "none",
                  padding: "5px",
                  "&:hover": {
                    backgroundColor: "surface",
                    borderRadius: "5px",
                  },
                }}
              >
                <Text
                  as="div"
                  sx={{
                    fontWeight: item.disabled ? "400" : "600",
                    color: item.disabled ? "disabledText" : "link",
                    marginBottom: "5px",
                    cursor: item.disabled ? "not-allowed" : "pointer",
                  }}
                  onClick={onItemClick}
                >
                  {item.title}
                </Text>
                <Text
                  sx={{
                    fontSize: "14px",
                    color: item.disabled ? "disabledText" : "link",
                  }}
                >
                  {item.description}
                </Text>
              </ThemeLink>
            ) : (
              <Flex sx={{ padding: "5px", flexDirection: "column" }}>
                <Flex>
                  <Text
                    sx={{
                      fontWeight: "600",
                      color: item.disabled ? "disabledText" : "link",
                      marginBottom: "5px",
                    }}
                  >
                    {item.title}
                  </Text>
                </Flex>
                <Text
                  sx={{
                    fontSize: "14px",
                    color: item.disabled ? "disabledText" : "link",
                  }}
                >
                  {item.description}
                </Text>
              </Flex>
            )}
            {item.openInNewTab ? (
              <Box
                sx={{
                  position: "absolute",
                  right: 0,
                  marginRight: "5px",
                  marginTop: "5px",
                }}
              >
                <IconButton
                  sx={{ width: "24px", marginRight: "5px", color: "textLight" }}
                >
                  <NewWindowIcon />
                </IconButton>
              </Box>
            ) : null}
          </Flex>
        ))}
      </Flex>
    </Box>
  ) : null;
};

export default MenuDropdown;
