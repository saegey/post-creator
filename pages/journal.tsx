import Head from "next/head";
import React from "react";
import { Box, Button, Flex, Text } from "theme-ui";

import PublicHeader from "../src/components/public/Header/PublicHeader";
import PublicFooter from "../src/components/public/Footer/Footer";
import FavIcon from "../src/components/shared/FavIcon";
import FeatureHiglight from "../src/components/public/FeatureHighlight";
import ResultsIcon from "../src/components/icons/ResultsIcon";
import PowerGraphIcon from "../src/components/icons/PowerGraphIcon";
import VideoIcon from "../src/components/icons/VideoIcon";
import TimePowerZonesIcon from "../src/components/icons/TimePowerZonesIcon";
import ActivityOverviewIcon from "../src/components/icons/ActivityOverviewIcon";
import StravaIcon from "../src/components/icons/StravaIcon";
import AvatarIcon from "../src/components/icons/AvatarIcon";
import HeroBannerIcon from "../src/components/icons/HeroBannerIcon";
import EyeIcon from "../src/components/icons/EyeIcon";
import VideoModal from "../src/components/VideoModal";
import ForwardIcon from "../src/components/icons/ForwardIcon";

const Journal = () => {
  const [isDemoVideo, setIsDemoVideo] = React.useState(false);

  return (
    <>
      <Head>
        <title>Monopad - Journal</title>
        <FavIcon />
      </Head>

      <VideoModal isOpen={isDemoVideo} setIsOpen={setIsDemoVideo} />

      <Box as="main" sx={{ width: "100vw", height: "fit-content" }}>
        <PublicHeader />

        <Box
          sx={{
            marginX: ["0px", "0px", "0px"],
            marginY: ["50px", "150px", "150px"],
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Flex
            sx={{
              width: ["calc(100% - 32px)", "calc(100% - 32px)", "768px"],
              flexDirection: "column",
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
              {/* Track, Trek, Triumph: Your Journey, Your Journal.. */}
              Monopad Journal
            </Text>
            <Text
              as="p"
              sx={{
                marginBottom: "20px",
                lineHeight: ["24px", "27px", "27px"],
                fontSize: ["16px", "18px", "18px"],
                // fontStyle: "italic",
                // textAlign: "center",
              }}
            >
              Effortlessly craft a comprehensive bike race recap within minutes.
              Enhance your narrative by seamlessly incorporating photos and
              videos. Dive into insightful data analysis, discussing pivotal
              moments and key highlights of the race.
            </Text>
            <Flex sx={{ width: "100%", justifyContent: "center" }}>
              <Button
                onClick={() => {
                  setIsDemoVideo(true);
                }}
                variant="primaryButton"
                sx={{
                  width: ["100%", "130px", "130px"],
                  padding: "10px",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                Watch Demo
              </Button>
            </Flex>
          </Flex>
        </Box>
        <Flex
          sx={{
            // height: ["calc(100vh - 48px)", "calc(100vh - 48px)", "calc(100vh)"],
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "background",
            // zIndex: 1,
            position: "relative",

            marginBottom: "50px",
          }}
        >
          <Flex
            sx={{
              justifyItems: "center",
              flexDirection: "column",
              // width: "100%",
              // alignItems: "center",
            }}
          >
            <Box sx={{ marginTop: ["80px", "0px", "0px"] }}>
              <FeatureHiglight
                featureName="Activity Analytics"
                imagePath="/RaceResults-4.png"
                headline={
                  <>Explore insightful analytics for your race activity.</>
                }
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
                    icon: <ForwardIcon />,
                    content: (
                      <>
                        Zones time breakdown in a race is essential for
                        strategic planning, enabling athletes to optimize pacing
                        and energy distribution for peak performance throughout
                        the event.
                      </>
                    ),
                  },
                  {
                    icon: <ForwardIcon />,
                    content: (
                      <>
                        Explore your performance evolution with our app's power
                        curve feature, offering a dynamic graph that compares
                        and contrasts your power profiles from various races and
                        seasons, providing valuable insights into your athletic
                        progress.
                      </>
                    ),
                  },
                  {
                    icon: <ForwardIcon />,
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
                imagePath="/RaceResults-7.png"
                subHeadline={
                  <>
                    Seamlessly integrate and showcase race results in each
                    journal post, offering a complete hub for your racing
                    history. Instantly accessible, it gives you a detailed
                    snapshot of your performance journey.
                  </>
                }
                headline={<>Embed race results</>}
                imagePosition="left"
                highlights={[
                  {
                    icon: <ForwardIcon sx={{ color: "primary" }} />,
                    content: (
                      <>
                        Automatically embed and display your race results within
                        each corresponding journal post.
                      </>
                    ),
                  },
                  {
                    icon: <ForwardIcon sx={{ color: "primary" }} />,
                    content: (
                      <>
                        Streamlined integration keeps your race history
                        organized and easily accessible in one centralized
                        location.
                      </>
                    ),
                  },
                  {
                    icon: <ForwardIcon sx={{ color: "primary" }} />,
                    content: (
                      <>
                        Instantly view your performance metrics, rankings, and
                        achievements without navigating away from your journal
                        entry.
                      </>
                    ),
                  },
                ]}
              />
              <FeatureHiglight
                featureName="Journal Sharing"
                imagePath="/RaceResults-2.png"
                subHeadline={
                  <>
                    Share your racing adventures externally with various sharing
                    options.
                  </>
                }
                headline={
                  <>Share Your Racing Story with Precision and Control</>
                }
                imagePosition="right"
                highlights={[
                  {
                    icon: <ForwardIcon />,
                    content: (
                      <>
                        Invite-Only Access. Control access by sharing through
                        invite-only or private links.
                      </>
                    ),
                  },
                  {
                    icon: <ForwardIcon sx={{ color: "primary" }} />,
                    content: (
                      <>
                        Public Visibility. Opt for public sharing to inspire and
                        connect with the broader community.
                      </>
                    ),
                  },
                  {
                    icon: <ForwardIcon sx={{ color: "primary" }} />,
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
          </Flex>
        </Flex>
        <PublicFooter />
      </Box>
    </>
  );
};

export default Journal;
