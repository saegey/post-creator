import React from "react";
import { Box, Flex, Button, Link as ThemeLink, Text } from "theme-ui";
import Link from "next/link";

import MenuHeadingItem from "../MenuHeadingItem";
import MenuWrapper from "../MenuWrapper";
import MenuListItem from "../MenuListItem";

const MobileNav = ({
  isMenuOpen,
  isProductMenuOpen,
  isResourcesMenuOpen,
  setIsMenuOpen,
  setIsProductMenuOpen,
  setIsResourcesMenuOpen,
}: {
  isMenuOpen: boolean;
  isProductMenuOpen: boolean;
  isResourcesMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsProductMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsResourcesMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Box
      sx={{
        position: "fixed",
        overflowX: "hidden",
        overflowY: "auto",
        display: isMenuOpen ? "flex" : "none",
        top: "48px",
        bottom: "0px",
        left: "0px",
        right: "0px",
        height: "calc(100vh - 48px)",
        zIndex: 100,
      }}
    >
      <Flex
        as="nav"
        role="navigation"
        sx={{
          width: "100%",
          flexDirection: "column",
          backgroundColor: "background",
        }}
      >
        <Box sx={{ marginX: "16px" }}>
          <MenuHeadingItem
            name="Product"
            isOpen={isProductMenuOpen}
            setIsOpen={setIsProductMenuOpen}
          />
          <MenuWrapper isOpen={isProductMenuOpen}>
            <>
              <MenuListItem
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsProductMenuOpen(false);
                }}
                isVisible={isProductMenuOpen}
                title="Journal"
                href="/journal"
                textColor="text"
              />
              <MenuListItem
                onClick={() => setIsMenuOpen(false)}
                title="Race Calendar"
                isVisible={isProductMenuOpen}
                disabled={true}
              />
            </>
          </MenuWrapper>
          <Flex sx={{ paddingY: "16px", lineHeight: "24px" }}>
            <ThemeLink
              href="https://monopad.productlane.com/changelog"
              sx={{ textDecoration: "none", color: "black" }}
            >
              <Text sx={{ fontWeight: "500", color: "text" }}>Changelog</Text>
            </ThemeLink>
          </Flex>
          <MenuHeadingItem
            name="Resources"
            isOpen={isResourcesMenuOpen}
            setIsOpen={setIsResourcesMenuOpen}
          />
          <MenuWrapper isOpen={isResourcesMenuOpen}>
            <>
              <MenuListItem
                onClick={() => setIsMenuOpen(false)}
                isVisible={isResourcesMenuOpen}
                title="Blog"
                href="/blog"
                textColor="text"
              />
              <MenuListItem
                onClick={() => setIsMenuOpen(false)}
                isVisible={isResourcesMenuOpen}
                title="Docs"
                externalHref="https://monopad.gitbook.io/docs-1/v/1/"
                textColor="text"
              />
              <MenuListItem
                onClick={() => setIsMenuOpen(false)}
                isVisible={isResourcesMenuOpen}
                title="API"
                disabled={true}
              />
            </>
          </MenuWrapper>
        </Box>
        <Flex
          sx={{
            flexGrow: "1",
            justifyContent: "flex-end",
            padding: "20px",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <ThemeLink
            as={Link}
            href={`/login`}
            sx={{ width: "100%" }}
            onClick={(e) => {
              e.preventDefault();
              window.open(
                `${location.protocol}//platform.${location.host
                  .split(".")
                  .slice(1)
                  .join(".")}/login`
              );
            }}
          >
            <Button
              variant="secondaryButton"
              sx={{
                width: "100%",
                paddingX: "16px",
                paddingY: "12px",
                fontSize: "16px",
                letterSpacing: "-0.08px",
              }}
            >
              Sign in
            </Button>
          </ThemeLink>
          <ThemeLink
            as={Link}
            href={`/register`}
            sx={{ width: "100%" }}
            onClick={(e) => {
              e.preventDefault();
              window.open(
                `${location.protocol}//platform.${location.host
                  .split(".")
                  .slice(1)
                  .join(".")}/register`
              );
            }}
          >
            <Button
              variant="primaryButton"
              sx={{
                width: "100%",
                paddingX: "16px",
                paddingY: "12px",
                fontSize: "16px",
                letterSpacing: "-0.08px",
              }}
            >
              Sign Up
            </Button>
          </ThemeLink>
        </Flex>
      </Flex>
    </Box>
  );
};

export default MobileNav;
