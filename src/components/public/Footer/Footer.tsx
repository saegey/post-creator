// src/components/PublicFooter.tsx
import React from "react";
import { Box, Flex, Grid, Text } from "theme-ui";
// import LogoBlock from "./LogoBlock";
import FooterSection from "./FooterSection";
import FooterLink from "./FooterLink";
import FooterSocialLinks from "./FooterSocialLinks";
import MenuHeadingItem from "../MenuHeadingItem";
import MenuWrapper from "../MenuWrapper";
import MenuListItem from "../MenuListItem";
import LogoBlock from "../LogoBlock";

const PublicFooter = () => {
  const [isExploreMenuOpen, setIsExploreMenuOpen] = React.useState(false);
  const [isCompanyMenuOpen, setIsCompanyMenuOpen] = React.useState(false);
  const [isLegalMenuOpen, setIsLegalMenuOpen] = React.useState(false);

  return (
    <>
      <Flex
        sx={{
          width: "100%",
          display: ["none", "flex", "flex"],
          flexDirection: "column",
          backgroundColor: "surface",
        }}
      >
        <Box
          sx={{
            maxWidth: "1280px",
            width: "calc(100% - 40px)",
            alignSelf: "center",
            marginTop: "30px",
            marginBottom: "30px",
            marginX: "20px",
          }}
        >
          <Box
            sx={{
              display: ["none", "inherit", "none"],
              paddingLeft: "60px",
              paddingTop: "60px",
            }}
          >
            <LogoBlock />
          </Box>
          <Grid
            columns={["2fr auto auto 2fr", "1fr 1fr 1fr", "2fr auto auto 2fr"]}
            sx={{
              gridTemplateRows: "auto",
              width: "100%",
              alignContent: "center",
              gridColumnGap: "80px",
              gridRowGap: "30px",
              justifyContent: "space-between",
              position: "relative",
              overflow: "hidden",
              borderRadius: "5px",
            }}
          >
            <FooterSection title="Explore">
              <FooterLink href="https://monopad.mintlify.app" external>
                Docs
              </FooterLink>
              <FooterLink
                href="https://monopad.productlane.com/changelog"
                external
              >
                Changelog
              </FooterLink>
              <FooterLink href="/blog">Blog</FooterLink>
            </FooterSection>

            <FooterSection title="Company">
              <FooterLink href="/about">About</FooterLink>
              {/* <FooterLink href="/manifesto">Manifesto</FooterLink>
              <FooterLink href="/status">Status</FooterLink> */}
            </FooterSection>

            <FooterSection title="Legal">
              <FooterLink href="/terms">Terms of Service</FooterLink>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
            </FooterSection>

            <FooterSocialLinks />

            <Text
              sx={{
                fontSize: "14px",
                gridArea: "span 1/span 3/span 1/span 3",
              }}
            >
              © Monopad. 2024 — All rights reserved.
            </Text>
          </Grid>
        </Box>
      </Flex>
      <Box
        as="footer"
        sx={{
          display: ["inherit", "none", "none"],
          paddingTop: "40px",
          paddingX: "24px",
          backgroundColor: "text",
          color: "background",
        }}
      >
        <Box sx={{ marginBottom: "16px" }}>
          <LogoBlock size="small" inheritColor={true} />
        </Box>
        <MenuHeadingItem
          name="Explore"
          isOpen={isExploreMenuOpen}
          setIsOpen={setIsExploreMenuOpen}
        />
        <MenuWrapper isOpen={isExploreMenuOpen}>
          <>
            <MenuListItem
              onClick={() => setIsExploreMenuOpen(false)}
              isVisible={isExploreMenuOpen}
              title="Docs"
              externalHref="https://monopad.mintlify.app"
              textColor="background"
            />
            <MenuListItem
              onClick={() => setIsExploreMenuOpen(false)}
              title="Changelog"
              isVisible={isExploreMenuOpen}
              externalHref="https://monopad.productlane.com/changelog"
              textColor="background"
            />
            <MenuListItem
              onClick={() => setIsExploreMenuOpen(false)}
              title="Blog"
              isVisible={isExploreMenuOpen}
              href="/blog"
              textColor="background"
            />
          </>
        </MenuWrapper>

        <MenuHeadingItem
          name="Company"
          isOpen={isCompanyMenuOpen}
          setIsOpen={setIsCompanyMenuOpen}
        />
        <MenuWrapper isOpen={isCompanyMenuOpen}>
          <>
            <MenuListItem
              onClick={() => setIsCompanyMenuOpen(false)}
              isVisible={isCompanyMenuOpen}
              title="About"
              href="/about"
              textColor="background"
            />
            <MenuListItem
              onClick={() => setIsCompanyMenuOpen(false)}
              isVisible={isCompanyMenuOpen}
              title="Manifesto"
              href="/manifesto"
              textColor="background"
            />
            <MenuListItem
              onClick={() => setIsCompanyMenuOpen(false)}
              isVisible={isCompanyMenuOpen}
              title="Status"
              href="/status"
              textColor="background"
            />
          </>
        </MenuWrapper>
        <MenuHeadingItem
          name="Legal"
          isOpen={isLegalMenuOpen}
          setIsOpen={setIsLegalMenuOpen}
        />
        <MenuWrapper isOpen={isLegalMenuOpen}>
          <>
            <MenuListItem
              isVisible={isLegalMenuOpen}
              onClick={() => setIsLegalMenuOpen(false)}
              title="Terms of Service"
              href="/terms"
              textColor="background"
            />
            <MenuListItem
              onClick={() => setIsLegalMenuOpen(false)}
              isVisible={isLegalMenuOpen}
              title="Privacy Policy"
              href="/privacy"
              textColor="background"
            />
          </>
        </MenuWrapper>
      </Box>
    </>
  );
};

export default PublicFooter;
