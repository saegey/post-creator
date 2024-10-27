import Head from "next/head";
import React from "react";
import { Box, Flex, Text, Link as ThemeLink } from "theme-ui";
import Link from "next/link";

import PublicHeader from "../../src/components/public/Header/PublicHeader";
import PublicFooter from "../../src/components/public/Footer/Footer";
import FeatureHiglight from "../../src/components/public/FeatureHighlight";
import VideoModal from "../../src/components/VideoModal";
import ForwardIcon from "../../src/components/icons/ForwardIcon";
import Button from "../../src/components/shared/Button";

const Home = () => {
  const [isDemoVideo, setIsDemoVideo] = React.useState(false);
  return (
    <>
      <Head>
        <title>Monopad - Home</title>
      </Head>

      <VideoModal isOpen={isDemoVideo} setIsOpen={setIsDemoVideo} />
      <Box as="main" sx={{ width: "100vw", height: "fit-content" }}>
        <PublicHeader />
        <Flex
          sx={{
            height: ["calc(100vh - 48px)", "calc(100vh - 48px)", "calc(100vh)"],
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "50px",
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
                  fontWeight: 630,
                  fontSize: ["40px", "57px", "57px"],
                  lineHeight: ["48px", "60px", "60px"],
                  marginBottom: "20px",
                  letterSpacing: "-1px",
                  textAlign: "left",
                }}
              >
                Write, reflect, and achieve more with Monopad Journal.
              </Text>
              <Text
                as="p"
                sx={{
                  marginBottom: "20px",
                  lineHeight: ["24px", "27px", "27px"],
                  fontSize: ["16px", "18px", "18px"],
                  fontWeight: 530,
                  color: "textLight",
                }}
              >
                Effortlessly create a detailed activity recap with integrated
                photos, videos, and data analysis to highlight key moments and
                insights.
              </Text>
              <Flex
                sx={{
                  gap: "10px",
                  justifyContent: "center",
                  flexDirection: ["column", "row", "row"],
                }}
              >
                <ThemeLink
                  as={Link}
                  sx={{ textDecoration: "none" }}
                  href="/register"
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
                  <Button
                    sx={{
                      padding: "10px",
                      fontSize: "16px",
                      width: ["100%", "130px", "130px"],
                    }}
                    variant="secondaryButton"
                  >
                    Sign Up
                  </Button>
                </ThemeLink>
                <Button
                  onClick={() => {
                    setIsDemoVideo(true);
                  }}
                  variant="primaryButton"
                  sx={{
                    width: ["100%", "130px", "130px"],
                    padding: "10px",
                    fontSize: "16px",
                  }}
                >
                  Watch Demo
                </Button>
              </Flex>
            </Box>
          </Flex>
        </Flex>
        <Box sx={{ marginTop: ["80px", "0px", "0px"] }}>
          <FeatureHiglight
            key={`feature-1`}
            featureName="Activity Analytics"
            imagePath="/RaceResults-4.png"
            headline={<>Explore insightful analytics</>}
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
                icon: <ForwardIcon sx={{ color: "textLight" }} />,
                content: (
                  <>
                    Zones time breakdown in a race is essential for strategic
                    planning, enabling athletes to optimize pacing and energy
                    distribution for peak performance throughout the event.
                  </>
                ),
              },
              {
                icon: <ForwardIcon sx={{ color: "textLight" }} />,
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
                icon: <ForwardIcon sx={{ color: "textLight" }} />,
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
            key={`feature-2`}
            featureName="Race Results"
            imagePath="/RaceResults-7.png"
            subHeadline={
              <>
                Seamlessly integrate and showcase race results in each journal
                post, offering a complete hub for your racing history. Instantly
                accessible, it gives you a detailed snapshot of your performance
                journey.
              </>
            }
            headline={<>Embed race results</>}
            imagePosition="left"
            highlights={[
              {
                icon: <ForwardIcon sx={{ color: "textLight" }} />,
                content: (
                  <>
                    Automatically embed and display your race results within
                    each corresponding journal post.
                  </>
                ),
              },
              {
                icon: <ForwardIcon sx={{ color: "textLight" }} />,
                content: (
                  <>
                    Streamlined integration keeps your race history organized
                    and easily accessible in one centralized location.
                  </>
                ),
              },
              {
                icon: <ForwardIcon sx={{ color: "textLight" }} />,
                content: (
                  <>
                    Instantly view your performance metrics, rankings, and
                    achievements without navigating away from your journal
                    entry.
                  </>
                ),
              },
              {
                icon: <ForwardIcon sx={{ color: "textLight" }} />,
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
            key={`feature-3`}
            featureName="Journal Sharing"
            imagePath="https://placehold.co/800x800"
            subHeadline={
              <>
                Share your racing adventures externally with various sharing
                options.
              </>
            }
            headline={<>Share Your Story</>}
            imagePosition="right"
            highlights={[
              {
                icon: <ForwardIcon sx={{ color: "textLight" }} />,
                content: (
                  <>
                    Invite-Only Access. Control access by sharing through
                    invite-only or private links.
                  </>
                ),
              },
              {
                icon: <ForwardIcon sx={{ color: "textLight" }} />,
                content: (
                  <>
                    Public Visibility. Opt for public sharing to inspire and
                    connect with the broader community.
                  </>
                ),
              },
              {
                icon: <ForwardIcon sx={{ color: "textLight" }} />,
                content: (
                  <>
                    Effortlessly publish and share your journal entries from
                    within the app. Keep your audience engaged with instant,
                    real-time updates on your racing journey.
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
