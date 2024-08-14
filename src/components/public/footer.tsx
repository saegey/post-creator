import React from "react";
import { Box, Flex, Grid, Text, Link as ThemeLink } from "theme-ui";

import Link from "next/link";
import LogoBlock from "./LogoBlock";
import MenuHeadingItem from "./MenuHeadingItem";
import MenuListItem from "./MenuListItem";
import MenuWrapper from "./MenuWrapper";

const PublicFooter = () => {
  const [isExploreMenuOpen, setIsExploreMenuOpen] = React.useState(false);
  const [isCompanyMenuOpen, setIsCompanyMenuOpen] = React.useState(false);
  const [isLegalMenuOpen, setIsLegalMenuOpen] = React.useState(false);

  return (
    <>
      <Flex
        sx={{
          width: "100%",
          // justifyContent: "center",
          display: ["none", "flex", "flex"],
          flexDirection: "column",
          backgroundColor: "skeletonDark",
          // justifyContent: "center",
          // zIndex: 1,
          // position: "absolute",
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
            // marginX: "16px",
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
              // padding: "60px",
              borderRadius: "5px",
            }}
          >
            <Flex
              sx={{
                alignSelf: "start",
                justifySelf: "start",
                justifyContent: "flex-start",
                alignItems: "center",
                marginBottom: "0.7rem",
                display: ["inherit", "none", "inherit"],
              }}
            >
              <Flex sx={{ gap: "10px", alignItems: "center" }}>
                <LogoBlock />
              </Flex>
            </Flex>
            <Flex
              sx={{
                gridArea: "span 1/span 1/span 1/span 1",
                flexFlow: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                position: "relative",
                // display: "flex",
                flexDirection: "column",
              }}
            >
              <Text
                as="h4"
                sx={{
                  marginBottom: "20px",
                  fontSize: "18px",
                  fontWeight: 600,
                }}
              >
                Explore
              </Text>
              <ThemeLink
                // as={Link}
                href="https://monopad.gitbook.io/docs-1/v/1/"
                sx={{
                  color: "#616161",
                  textDecoration: "none",
                  marginY: "5px",
                  fontWeight: 500,
                }}
              >
                Docs
              </ThemeLink>
              <ThemeLink
                // as={Link}
                href="https://monopad.productlane.com/changelog"
                sx={{
                  color: "#616161",
                  textDecoration: "none",
                  marginY: "5px",
                  fontWeight: 500,
                }}
              >
                Changelog
              </ThemeLink>
              <ThemeLink
                as={Link}
                href="/blog"
                sx={{
                  color: "#616161",
                  textDecoration: "none",
                  marginY: "5px",
                  fontWeight: 500,
                }}
              >
                Blog
              </ThemeLink>
            </Flex>
            <Flex
              sx={{
                gridArea: "span 1/span 1/span 1/span 1",
                flexFlow: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                position: "relative",
              }}
            >
              <Text
                as="h4"
                sx={{ marginBottom: "20px", fontSize: "18px", fontWeight: 600 }}
              >
                Company
              </Text>
              <ThemeLink
                as={Link}
                href="/about"
                sx={{
                  color: "#616161",
                  textDecoration: "none",
                  marginY: "5px",
                  fontWeight: 500,
                }}
              >
                About
              </ThemeLink>
              <ThemeLink
                as={Link}
                href="/manifesto"
                sx={{
                  color: "#616161",
                  textDecoration: "none",
                  marginY: "5px",
                  fontWeight: 500,
                }}
              >
                Manifesto
              </ThemeLink>
              <ThemeLink
                as={Link}
                href="/"
                sx={{
                  color: "#616161",
                  textDecoration: "none",
                  marginY: "5px",
                  fontWeight: 500,
                }}
              >
                Status
              </ThemeLink>
            </Flex>
            <Flex
              sx={{
                gridArea: "span 1/span 1/span 1/span 1",
                flexFlow: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                position: "relative",
              }}
            >
              <Text
                as="h4"
                sx={{ marginBottom: "20px", fontSize: "18px", fontWeight: 600 }}
              >
                Legal
              </Text>
              <ThemeLink
                as={Link}
                href="/terms"
                sx={{
                  color: "#616161",
                  textDecoration: "none",
                  marginY: "5px",
                  fontWeight: 500,
                }}
              >
                Terms of Service
              </ThemeLink>
              <ThemeLink
                as={Link}
                href="/"
                sx={{
                  color: "#616161",
                  textDecoration: "none",
                  marginY: "5px",
                  fontWeight: 500,
                }}
              >
                Privacy Policy
              </ThemeLink>
            </Flex>
            {/* <Flex
            sx={{
              gridArea: "span 1/span 1/span 1/span 1",
              flexFlow: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              position: "relative",
            }}
          ></Flex> */}
            <Flex
              sx={{
                gridArea: "span 1/span 3/span 1/span 3",
                flexFlow: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                position: "relative",
                flexDirection: "row",
                gap: "20px",
                // display: ["inherit", "none", "flex"],
              }}
            >
              <ThemeLink
                as={Link}
                href="/"
                sx={{ textDecoration: "none", color: "text", fontSize: "14px" }}
              >
                Twitter
              </ThemeLink>
              <ThemeLink
                as={Link}
                href="/"
                sx={{ textDecoration: "none", color: "text", fontSize: "14px" }}
              >
                Instagram
              </ThemeLink>
              <ThemeLink
                as={Link}
                href="/"
                sx={{ textDecoration: "none", color: "text", fontSize: "14px" }}
              >
                Strava
              </ThemeLink>
            </Flex>
            <Text
              sx={{ fontSize: "14px", gridArea: "span 1/span 3/span 1/span 3" }}
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
              externalHref="https://monopad.gitbook.io/docs-1/v/1/"
              textColor="background"
            />
            <MenuListItem
              onClick={() => setIsExploreMenuOpen(false)}
              title="Changelog"
              isVisible={isExploreMenuOpen}
              externalHref="https://monopad.gitbook.io/docs-1/v/1/"
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
