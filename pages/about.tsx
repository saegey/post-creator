import Head from "next/head";
import React from "react";
import { Box, Flex, Grid, Link as ThemeLink, Text } from "theme-ui";
import Link from "next/link";
import { useRouter } from "next/router";

import PublicHeader from "../src/components/public/header";
import PublicFooter from "../src/components/public/footer";
import AboutUs from "../src/components/public/About";
import Team from "../src/components/public/Team";
import Timeline from "../src/components/public/Timeline";

const About = () => {
  const { query } = useRouter();

  const isAbout = query.section === "about" || query.section === undefined;
  const isTeam = query.section === "team";
  const isStory = query.section === "story";
  const isPress = query.section === "press";

  return (
    <>
      <Head>
        <title>Monopad - About</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box as="main" sx={{ width: "100vw", height: "fit-content" }}>
        <PublicHeader />
        <Flex
          sx={{
            height: "600px",
            justifyContent: "center",
            alignItems: "center",
            // zIndex: 1,
            position: "relative",
            backgroundColor: "skeletonDark",
          }}
        >
          <Flex
            as="section"
            sx={{
              justifyItems: "center",
              paddingTop: "264px",
              paddingBottom: "108px",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Text
              as="h1"
              sx={{
                color: "text",
                fontSize: ["40px", "56px", "56px"],
                lineHeight: "64px",
                fontWeight: 400,
                marginBottom: "24px",
                letterSpacing: "-2px",
              }}
            >
              About Monopad.
            </Text>
            <Text
              sx={{
                textTransform: "uppercase",
                fontSize: "14px",
                lineHeight: "20px",
                fontWeight: 400,
                marginBottom: "8px",
              }}
              as="div"
            >
              Discover Monopad
            </Text>
            <Text
              sx={{
                marginTop: "16px",
                marginBottom: "40px",
                textAlign: "center",
              }}
            >
              Curious about our services, team, or seeking foundational details?
              <br></br>You've found the right destination!
            </Text>
          </Flex>
        </Flex>
        <Flex
          sx={{ justifyContent: "center", backgroundColor: "skeletonDark" }}
        >
          <Link
            href="about?section=about"
            style={{ textDecoration: "none", color: "text" }}
          >
            <Box
              sx={{
                paddingX: "8px",
                paddingBottom: "22px",
                borderBottomStyle: isAbout ? "solid" : "none",
                borderBottomColor: "text",
                marginX: "14px",
              }}
            >
              <Text sx={{ color: "text" }}>About</Text>
            </Box>
          </Link>
          <Link
            href="about?section=team"
            style={{ textDecoration: "none", color: "text" }}
          >
            <Box
              sx={{
                paddingX: "8px",
                paddingBottom: "22px",
                borderBottomStyle: isTeam ? "solid" : "none",
                borderBottomColor: "text",
                marginX: "14px",
              }}
            >
              <Text sx={{ color: "text" }}>Team</Text>
            </Box>
          </Link>
          {/* <Link
            href="about?section=story"
            style={{ textDecoration: "none", color: "black" }}
          >
            <Box
              sx={{
                paddingX: "8px",
                paddingBottom: "22px",
                marginX: "14px",
                borderBottom: isStory ? "2px solid black" : "none",
              }}
            >
              Our Story
            </Box>
          </Link> */}
          {/* <Link
            href="about?section=press"
            style={{ textDecoration: "none", color: "black" }}
          >
            <Box
              sx={{
                paddingX: "8px",
                paddingBottom: "22px",
                marginX: "14px",
                borderBottom: isPress ? "2px solid black" : "none",
              }}
            >
              Press
            </Box>
          </Link> */}
        </Flex>
        <Flex sx={{ justifyContent: "center" }}>
          <AboutUs show={isAbout} />
          <Team show={isTeam} />
          <Box
            sx={{
              margin: "16px",
              // display: isAbout ? "" : "none",
              opacity: isPress ? 1 : 0,
              transition: "opacity 300ms ease 0s",
              display: isPress ? "inherit" : "none",
            }}
          >
            <Text as="h1">Press</Text>
          </Box>
          <Timeline show={isStory} />
        </Flex>
        <PublicFooter />
      </Box>
    </>
  );
};

export default About;
