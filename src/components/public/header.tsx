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
} from "theme-ui";
import Link from "next/link";

import Logo from "../shared/Logo";
import CaretDown from "../icons/CaretDown";

const PublicHeader = () => {
  const [isProductMenuOpen, setIsProductMenuOpen] = React.useState(false);
  const [isResourcesMenuOpen, setIsResourcesMenuOpen] = React.useState(false);

  return (
    <>
      <Flex
        sx={{
          width: "100%",
          justifyContent: "center",
          zIndex: 1,
          position: "absolute",
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
            padding: "8px 8px 8px 16px",
            width: "100%",
            maxWidth: "1300px",
            // backgroundColor: "white",
            height: "60px",
            position: "absolute",
            zIndex: 2,
            backgroundColor: "white",
          }}
        >
          <Box sx={{ gridArea: "1/1/2/2" }}>
            <Flex sx={{ gap: "10px", alignItems: "center" }}>
              <Box
                sx={{ width: "20px", height: "20px", backgroundColor: "black" }}
              >
                <Logo />
              </Box>
              <ThemeLink
                as={Link}
                href="/"
                sx={{ color: "text", textDecoration: "none" }}
              >
                <Text
                  sx={{
                    fontSize: "22px",
                    fontWeight: "600",
                    letterSpacing: "-.5px",
                  }}
                >
                  Monopad
                </Text>
              </ThemeLink>
            </Flex>
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
                sx={{ fontWeight: "400" }}
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
                sx={{ fontWeight: "400" }}
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
                      // marginTop: isResourcesMenuOpen ? "5px" : "0px",
                      // position: 'absolut'
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
                as={Link}
                href={`http://app.localhost:3000/login`}
                sx={{
                  "&:hover": {
                    color: "gray",
                  },
                  textDecoration: "none",
                  color: "text",
                  // padding: "5px",
                  // width: "100%",
                  fontSize: ["17px", "15px", "15px"],
                }}
              >
                Login
              </ThemeLink>
              <Button>Sign Up</Button>
            </Flex>
          </Flex>
        </Grid>
      </Flex>
    </>
  );
};

export default PublicHeader;
