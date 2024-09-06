import Head from "next/head";
import React from "react";
import { Box, Button, Flex, Text, Link as ThemeLink } from "theme-ui";

import PublicHeader from "../../src/components/public/Header/PublicHeader";
import PublicFooter from "../../src/components/public/Footer/Footer";
import VideoIcon from "../../src/components/icons/VideoIcon";
import ResultsIcon from "../../src/components/icons/ResultsIcon";
import PowerGraphIcon from "../../src/components/icons/PowerGraphIcon";
import FeatureHiglight from "../../src/components/public/FeatureHighlight";
import StravaIcon from "../../src/components/icons/StravaIcon";
import ActivityOverviewIcon from "../../src/components/icons/ActivityOverviewIcon";
import TimePowerZonesIcon from "../../src/components/icons/TimePowerZonesIcon";
import EyeIcon from "../../src/components/icons/EyeIcon";
import HeroBannerIcon from "../../src/components/icons/HeroBannerIcon";
import AvatarIcon from "../../src/components/icons/AvatarIcon";
import Link from "next/link";

const Home = () => {
  return (
    <>
      <Head>
        <title>Monopad - Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box as="main" sx={{ width: "100vw", height: "fit-content" }}>
        <PublicHeader />
        <Flex
          sx={{
            height: ["fit-content", "100vh", "100vh"],
            paddingTop: "64px",
            justifyContent: "center",
            alignItems: "center",
            // zIndex: 1,
            position: "relative",
          }}
        >
          <Flex sx={{ justifyItems: "center", flexDirection: "column" }}>
            <Box
              sx={{
                marginX: ["16px", "16px", "0px"],
                width: ["calc(100% - 32px)", "calc(100% - 32px)", "768px"],
                justifyContent: "center",
              }}
            >
              <Text
                as="h1"
                sx={{
                  color: "text",
                  fontWeight: 600,
                  fontSize: ["40px", "62px", "62px"],
                  lineHeight: ["48px", "60px", "60px"],
                  marginBottom: "20px",
                  textAlign: "center",
                }}
              >
                Track, Trek, Triumph: Your Journey, Your Journal..
              </Text>
              <Text
                as="p"
                sx={{
                  marginBottom: "20px",
                  lineHeight: ["24px", "27px", "27px"],
                  fontSize: ["16px", "18px", "18px"],
                  fontStyle: "italic",
                  textAlign: "center",
                }}
              >
                Effortlessly craft a comprehensive bike race recap within
                minutes. Enhance your narrative by seamlessly incorporating
                photos and videos. Dive into insightful data analysis,
                discussing pivotal moments and key highlights of the race.
              </Text>
              <Flex
                sx={{
                  gap: "20px",
                  justifyContent: "center",
                  flexDirection: ["column", "row", "row"],
                }}
              >
                <ThemeLink
                  as={Link}
                  href="/register"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log("themelink");
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
                  <Button
                    sx={{
                      background: "background",
                      borderColor: "text",
                      borderStyle: "solid",
                      borderWidth: "1px",
                      color: "text",
                      width: ["100%", "fit-content", "fit-content"],
                    }}
                  >
                    Sign Up
                  </Button>
                </ThemeLink>
                <Button variant="secondaryButton">Watch Demo</Button>
              </Flex>
            </Box>
          </Flex>
        </Flex>
        <Box sx={{ marginTop: ["80px", "0px", "0px"] }}>
          <FeatureHiglight
            featureName="Activity Analytics"
            imagePath="https://placehold.co/800x800"
            headline={<>Explore insightful analytics for your race activity.</>}
            subHeadline={
              <>
                Gain a competitive edge with detailed activity analytics.
                Elevate your understanding of performance metrics. Harness
                strategic insights for race excellence.
              </>
            }
            imagePosition="right"
            highlights={[
              {
                icon: <ResultsIcon />,
                content: (
                  <>
                    Zones time breakdown in a race is essential for strategic
                    planning, enabling athletes to optimize pacing and energy
                    distribution for peak performance throughout the event.
                  </>
                ),
              },
              {
                icon: <PowerGraphIcon />,
                content: (
                  <>
                    Explore your performance evolution with our app's power
                    curve feature, offering a dynamic graph that compares and
                    contrasts your power profiles from various races and
                    seasons, providing valuable insights into your athletic
                    progress.
                  </>
                ),
              },
              {
                icon: <VideoIcon />,
                content: (
                  <>
                    Analyze your race intensity with a feature showcasing a
                    breakdown of 'matches burned,' providing insights into
                    kilojoules expended during the event.
                  </>
                ),
              },
            ]}
          />
          <FeatureHiglight
            featureName="Race Results"
            imagePath="https://placehold.co/800x800"
            subHeadline={
              <>
                Effortlessly integrate and display race results within each
                journal post, creating a centralized hub for your complete
                racing history, instantly accessible and providing a
                comprehensive snapshot of your performance journey.
              </>
            }
            headline={<>Embed race results</>}
            imagePosition="left"
            highlights={[
              {
                icon: <TimePowerZonesIcon sx={{ color: "primary" }} />,
                content: (
                  <>
                    Automatically embed and display your race results within
                    each corresponding journal post.
                  </>
                ),
              },
              {
                icon: <ActivityOverviewIcon sx={{ color: "primary" }} />,
                content: (
                  <>
                    Streamlined integration keeps your race history organized
                    and easily accessible in one centralized location.
                  </>
                ),
              },
              {
                icon: <StravaIcon sx={{ color: "primary" }} />,
                content: (
                  <>
                    Instantly view your performance metrics, rankings, and
                    achievements without navigating away from your journal
                    entry.
                  </>
                ),
              },
              {
                icon: <StravaIcon sx={{ color: "primary" }} />,
                content: (
                  <>
                    Eliminates the need to search through external sources,
                    ensuring your complete race history is at your fingertips
                    within the app.
                  </>
                ),
              },
            ]}
          />
          <FeatureHiglight
            featureName="Journal Sharing"
            imagePath="https://placehold.co/800x800"
            subHeadline={
              <>
                Share your racing adventures externally with various sharing
                options.
              </>
            }
            headline={<>Share Your Racing Story with Precision and Control</>}
            imagePosition="right"
            highlights={[
              {
                icon: <AvatarIcon />,
                content: (
                  <>
                    Invite-Only Access. Control access by sharing through
                    invite-only or private links.
                  </>
                ),
              },
              {
                icon: <HeroBannerIcon sx={{ color: "primary" }} />,
                content: (
                  <>
                    Public Visibility. Opt for public sharing to inspire and
                    connect with the broader community.
                  </>
                ),
              },
              {
                icon: <EyeIcon sx={{ color: "primary" }} />,
                content: (
                  <>
                    Effortlessly publish and share your journal entries from
                    within the app. Keep your audience engaged with instant,
                    real-time updates on your racing journey.
                  </>
                ),
              },
              {
                icon: <EyeIcon sx={{ height: "auto", color: "primary" }} />,
                content: (
                  <>
                    Capture Moments Together. Collaboratively share experiences
                    by inviting others to contribute to your journal entries.
                  </>
                ),
              },
            ]}
          />
        </Box>
        <PublicFooter />
      </Box>
    </>
  );
};

export default Home;
