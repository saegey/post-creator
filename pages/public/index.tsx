import Head from "next/head";
import React from "react";
import { Box, Button, Flex, Text, Link as ThemeLink } from "theme-ui";

import PublicHeader from "../../src/components/public/header";
import PublicFooter from "../../src/components/public/footer";
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
                The journal that<br></br>redefines journaling.
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
                Write a full bike race recap in minutes. Add your photos and
                videos and analyze your numbers and discuss key points in the
                race.
              </Text>
              <Flex
                sx={{
                  gap: "20px",
                  justifyContent: "center",
                  flexDirection: ["column", "row", "row"],
                }}
              >
                <ThemeLink as={Link} href="/register">
                  <Button
                    sx={{
                      background: "white",
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
                <Button>Watch Demo</Button>
              </Flex>
            </Box>
          </Flex>
        </Flex>
        <Box sx={{ marginTop: ["80px", "0px", "0px"] }}>
          <FeatureHiglight
            featureName="Crypto fundraising"
            imagePath="/cryptop-1600.webp"
            headline={
              <>
                Delightful to use.<br></br>Heavy on features
              </>
            }
            subHeadline={
              <>
                Automate your fundraising securely and reliably without building
                your own platform. Create on-brand investment opportunities that
                will impress your investors.
              </>
            }
            imagePosition="right"
            highlights={[
              {
                icon: <ResultsIcon />,
                content: (
                  <>
                    Customize your campaign with flexible rules for investor
                    eligibility, variable fees, and allocation preferences—all
                    in one seamless setup.
                  </>
                ),
              },
              {
                icon: <PowerGraphIcon />,
                content: (
                  <>
                    Collect funds securely and direct them to your preferred
                    wallet. Transactions are authenticated and investor token
                    allocations are auto-calculated.
                  </>
                ),
              },
              {
                icon: <VideoIcon />,
                content: (
                  <>
                    Create custom forms to gather essential investor information
                    and enhance your pitch with social links, images, and
                    videos—all in one place.
                  </>
                ),
              },
            ]}
          />
          <FeatureHiglight
            featureName="Allocation management"
            imagePath="/p-1600.webp"
            subHeadline={
              <>
                Allocation management ensures full control over your investments
                and investor data. Swap manual tasks and scattered spreadsheets
                for a single, reliable source that benefits both you and your
                investors.
              </>
            }
            headline={<>Spread thin by spreadsheets? Retake control</>}
            imagePosition="left"
            highlights={[
              {
                icon: <TimePowerZonesIcon color="black" />,
                content: (
                  <>
                    Keep track of how much you have raised, who you have raised
                    it from, and how many tokens each individual is owed.
                    Everything is calculated for you and managed in one place.
                  </>
                ),
              },
              {
                icon: <ActivityOverviewIcon />,
                content: (
                  <>
                    Keep user data current with a unified platform that syncs
                    investor changes, refunds, and OTC transactions across all
                    deals.
                  </>
                ),
              },
              {
                icon: <StravaIcon color="black" />,
                content: (
                  <>
                    Offer investors a dedicated portal where they can log in to
                    monitor and assess their investments, and remain updated on
                    future distributions.
                  </>
                ),
              },
            ]}
          />
          <FeatureHiglight
            featureName="Token distributions"
            imagePath="/token_1.webp"
            subHeadline={
              <>
                Simplify operations and minimize errors with a secure platform
                that automates token distributions. Save time and keep investors
                updated on their progress.
              </>
            }
            headline={<>Effortlessly distribute tokens to investors</>}
            imagePosition="right"
            highlights={[
              {
                icon: <AvatarIcon />,
                content: (
                  <>
                    Effortlessly set up vesting schedules and get detailed batch
                    breakdowns for token distribution. Each investor's
                    allocation is automatically calculated.
                  </>
                ),
              },
              {
                icon: <HeroBannerIcon color="black" />,
                content: (
                  <>
                    Distribute tokens securely with our audited bulk-transfer
                    smart contract. Send tokens to thousands of investors in a
                    single transaction, no claiming portals needed.
                  </>
                ),
              },
              {
                icon: <EyeIcon />,
                content: (
                  <>
                    Keep investors informed. After each token distribution, they
                    receive an email confirmation and can see real-time progress
                    in their investor portal.
                  </>
                ),
              },
            ]}
          />
        </Box>
        {/* <Flex
          sx={{
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
            // zIndex: 1,
            position: "relative",
          }}
        >
          <Flex sx={{ justifyItems: "center" }}>
            <Text
              as="h1"
              sx={{ color: "text", fontSize: "62px", lineHeight: "60px" }}
            >
              This is the next generation mf.
            </Text>
          </Flex>
        </Flex> */}
        <PublicFooter />
      </Box>
    </>
  );
};

export default Home;
