import React from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  Link as ThemeLink,
  NavLink,
  Text,
  Badge,
  MenuButton,
  Close,
} from "theme-ui";
import Link from "next/link";

import CaretDown from "../icons/CaretDown";
import LogoBlock from "./LogoBlock";
import MenuHeadingItem from "./MenuHeadingItem";
import MenuListItem from "./MenuListItem";
import MenuWrapper from "./MenuWrapper";

const PublicHeader = () => {
  const [isProductMenuOpen, setIsProductMenuOpen] = React.useState(false);
  const [isResourcesMenuOpen, setIsResourcesMenuOpen] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  return (
    <Box sx={{ zIndex: 10, position: "sticky", top: 0 }}>
      <Flex
        sx={{
          width: "100%",
          justifyContent: "center",
          display: ["none", "none", "flex"],
          borderBottomColor: "#e8e8e8",
          borderBottomStyle: "solid",
          borderBottomWidth: "1px",
          backgroundColor: "white",
        }}
      >
        <Grid
          gap={2}
          columns={"1fr auto 1fr"}
          sx={{
            gridAutoColumns: "1fr",
            alignContent: "center",
            justifyContent: "space-between",
            alignItems: "center",
            marginY: "14px",
            marginX: "20px",
            // margin: "14px 20px 14px 20px",
            width: "calc(100% - 40px)",
            maxWidth: "1280px",
            // height: "60px",
          }}
        >
          <Box sx={{ gridArea: "1/1/2/2" }}>
            <LogoBlock />
          </Box>
          <Box
            sx={{
              flexFlow: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              display: "flex",
              position: "relative",
            }}
          >
            <Flex as="nav" sx={{ gap: "10px" }}>
              <NavLink
                sx={{ fontWeight: "400", cursor: "pointer" }}
                p={2}
                onMouseEnter={() => setIsProductMenuOpen(true)}
                onMouseLeave={() => setIsProductMenuOpen(false)}
              >
                <Flex sx={{ gap: "2px", alignItems: "center" }}>
                  Product
                  <Box
                    sx={{
                      width: "20px",
                      height: "20px",
                      transform: isProductMenuOpen ? "rotate(180deg)" : "none",
                      transitionDuration: isProductMenuOpen ? "500ms" : "unset",
                      // marginTop: isResourcesMenuOpen ? "5px" : "0px",
                      // position: 'absolut'
                    }}
                  >
                    <CaretDown />
                  </Box>
                </Flex>
                {isProductMenuOpen && (
                  <Box
                    sx={{
                      position: "absolute",
                      // height: "300px",
                      width: "300px",
                      backgroundColor: "white",
                      // top: "-20px",
                      paddingTop: "20px",
                      // left: "-20px",
                      marginLeft: "-10px",
                      borderRadius: "5px",
                      padding: "20px",
                      // display: isProductMenuOpen ? "absolute" : "none",
                      boxShadow:
                        "0 8px 8px rgba(23,22,24,.04), 0 4px 4px rgba(23,22,24,.04), 0 2px 2px rgba(23,22,24,.04)",
                    }}
                  >
                    <Flex sx={{ flexDirection: "column", gap: "20px" }}>
                      <Flex sx={{ flexDirection: "column" }}>
                        <ThemeLink
                          as={Link}
                          href={"/journal"}
                          sx={{
                            color: "text",
                            textDecoration: "none",
                            marginBottom: "5px",
                          }}
                        >
                          <Text as="div" sx={{ fontWeight: "600" }}>
                            Race Journal
                          </Text>
                          <Text sx={{ fontSize: "14px" }}>
                            Capture the experience of your competition
                          </Text>
                        </ThemeLink>
                      </Flex>

                      <Flex sx={{ flexDirection: "column" }}>
                        <Text
                          sx={{
                            fontWeight: "600",
                            color: "#969696",
                            marginBottom: "5px",
                          }}
                        >
                          Race Calendar{" "}
                          <Badge sx={{ backgroundColor: "#cccccc" }}>
                            Soon
                          </Badge>
                        </Text>
                        <Text sx={{ fontSize: "14px", color: "#969696" }}>
                          Publish your schedule and coordinate with fellow
                          racers
                        </Text>
                      </Flex>
                    </Flex>
                  </Box>
                )}
              </NavLink>
              <NavLink
                sx={{ fontWeight: "400" }}
                p={2}
                href="https://monopad.productlane.com/changelog"
              >
                Changelog
              </NavLink>
              <NavLink
                sx={{ fontWeight: "400", cursor: "pointer" }}
                p={2}
                onMouseEnter={() => setIsResourcesMenuOpen(true)}
                onMouseLeave={() => setIsResourcesMenuOpen(false)}
              >
                <Flex sx={{ gap: "2px", alignItems: "center" }}>
                  <Text>Resources</Text>
                  <Box
                    sx={{
                      width: "20px",
                      height: "20px",
                      transform: isResourcesMenuOpen
                        ? "rotate(180deg)"
                        : "none",
                      transitionDuration: isResourcesMenuOpen
                        ? "500ms"
                        : "unset",
                    }}
                  >
                    <CaretDown />
                  </Box>
                </Flex>
                {isResourcesMenuOpen && (
                  <Box
                    sx={{
                      position: "absolute",
                      // height: "300px",
                      width: "300px",
                      backgroundColor: "white",
                      // top: "-20px",
                      paddingTop: "20px",
                      // left: "-20px",
                      marginLeft: "-10px",
                      borderRadius: "5px",
                      padding: "20px",
                      // display: isProductMenuOpen ? "absolute" : "none",
                      boxShadow:
                        "0 8px 8px rgba(23,22,24,.04), 0 4px 4px rgba(23,22,24,.04), 0 2px 2px rgba(23,22,24,.04)",
                    }}
                  >
                    <Flex sx={{ flexDirection: "column", gap: "20px" }}>
                      <Flex sx={{ flexDirection: "column" }}>
                        <ThemeLink
                          as={Link}
                          href={"/blog"}
                          sx={{
                            color: "text",
                            textDecoration: "none",
                            marginBottom: "5px",
                          }}
                        >
                          <Text as="div" sx={{ fontWeight: "600" }}>
                            Blog
                          </Text>
                          <Text sx={{ fontSize: "14px" }}>
                            Posts by the Monopad team
                          </Text>
                        </ThemeLink>
                      </Flex>
                      <Flex sx={{ flexDirection: "column" }}>
                        <ThemeLink
                          // as={Link}
                          href={"https://monopad.gitbook.io/docs-1/v/1/"}
                          sx={{
                            color: "text",
                            textDecoration: "none",
                            marginBottom: "5px",
                          }}
                        >
                          <Text as="div" sx={{ fontWeight: "600" }}>
                            Docs
                          </Text>
                          <Text sx={{ fontSize: "14px" }}>
                            Become a Monopad expert
                          </Text>
                        </ThemeLink>
                      </Flex>
                      <Flex sx={{ flexDirection: "column" }}>
                        <Text
                          as="div"
                          sx={{
                            fontWeight: "600",
                            color: "#969696",
                            textDecoration: "none",
                            marginBottom: "5px",
                          }}
                        >
                          API{" "}
                          <Badge
                            sx={{
                              backgroundColor: "#cccccc",
                              color: "#969696",
                              textDecoration: "none",
                              marginBottom: "5px",
                            }}
                          >
                            Soon
                          </Badge>
                        </Text>
                        <Text sx={{ fontSize: "14px", color: "#969696" }}>
                          Build custom workflows
                        </Text>
                        {/* </ThemeLink> */}
                      </Flex>
                    </Flex>
                  </Box>
                )}
              </NavLink>
            </Flex>
          </Box>
          <Flex sx={{ justifyContent: "flex-end" }}>
            <Flex sx={{ alignItems: "center", gap: "10px" }}>
              <ThemeLink
                onClick={(e) => {
                  e.preventDefault();
                  //https://platform.d15noiwtuwwref/login
                  window.open(
                    location.protocol +
                      "//platform." +
                      (location.host.split(".")[1]
                        ? location.host
                            .split(".")
                            .slice(1, location.host.split(".").length)
                            .join(".")
                        : location.host) +
                      "/login"
                  );
                }}
                href={`/login`}
                sx={{
                  "&:hover": {
                    color: "gray",
                  },
                  textDecoration: "none",
                  color: "text",
                  fontSize: ["17px", "15px", "15px"],
                }}
              >
                Login
              </ThemeLink>
              <ThemeLink
                href={`/register`}
                onClick={(e) => {
                  e.preventDefault();
                  //https://platform.d15noiwtuwwref/login
                  window.open(
                    location.protocol +
                      "//platform." +
                      (location.host.split(".")[1]
                        ? location.host
                            .split(".")
                            .slice(1, location.host.split(".").length)
                            .join(".")
                        : location.host) +
                      "/register"
                  );
                }}
              >
                <Button variant="primaryButton">Sign Up</Button>
              </ThemeLink>
            </Flex>
          </Flex>
        </Grid>
      </Flex>
      <Flex
        sx={{
          paddingX: "16px",
          paddingY: "8px",
          position: "sticky",
          top: 0,
          backgroundColor: "white",
          zIndex: 99,
          display: ["flex", "flex", "none"],
        }}
      >
        <LogoBlock size="small" />
        <Flex sx={{ flexGrow: 1, justifyContent: "right" }}>
          <MenuButton
            onClick={() => setIsMenuOpen(true)}
            sx={{ display: isMenuOpen ? "none" : "inherit" }}
          />
          <Close
            onClick={() => {
              setIsMenuOpen(false);
              setIsProductMenuOpen(false);
            }}
            sx={{ display: isMenuOpen ? "inherit" : "none" }}
          />
        </Flex>
      </Flex>
      <Box
        sx={{
          position: "fixed",
          overflowX: "hidden",
          overflowY: "auto",
          display: [
            isMenuOpen ? "flex" : "none",
            isMenuOpen ? "flex" : "none",
            "none",
          ],
          top: "48px",
          bottom: "0px",
          left: "0px",
          right: "0px",
          height: [
            "calc(100dvh - 48px)",
            "calc(100vh - 48px)",
            "calc(100vh - 48px)",
          ],
          // width: "100vw",
          zIndex: 100,
          backgroundColor: "white",
        }}
      >
        <Flex
          as="nav"
          role="navigation"
          sx={{ width: "100%", flexDirection: "column" }}
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
                  title="Race Journal"
                  href="/journal"
                  textColor="text"
                />
                <MenuListItem
                  onClick={() => setIsMenuOpen(false)}
                  title="Race Calendar"
                  isVisible={isProductMenuOpen}
                  disabled={true}
                  // href="/journal"
                />
              </>
            </MenuWrapper>
            <Flex sx={{ paddingY: "16px" }}>
              <ThemeLink
                href="https://monopad.productlane.com/changelog"
                sx={{ textDecoration: "none", color: "black" }}
              >
                <Text sx={{ fontWeight: "500" }}>Changelog</Text>
                <Flex
                  sx={{
                    flexGrow: 1,
                    justifyContent: "right",
                  }}
                ></Flex>
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
            <ThemeLink as={Link} href={`/login`} sx={{ width: "100%" }}>
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
            <ThemeLink as={Link} href={`/register`} sx={{ width: "100%" }}>
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
    </Box>
  );
};

export default PublicHeader;
