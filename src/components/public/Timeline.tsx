import React from "react";
import { Box, Flex, Grid, Link as ThemeLink, Text } from "theme-ui";

import TimelineSection from "./TimelineSection";

const Timeline = ({ show }: { show: boolean }) => {
  return (
    <Box
      sx={{
        margin: "16px",
        opacity: show ? 1 : 0,
        transition: "opacity 300ms ease 0s",
        display: show ? "inherit" : "none",
        maxWidth: "1280px",
        marginBottom: "200px",
      }}
    >
      <Flex
        as="section"
        sx={{
          flexDirection: "column",
          gap: ["10px", "80px", "80px"],
          paddingTop: "80px",
        }}
      >
        <Text as="h1" variant="aboutHeader">
          Our Story
        </Text>
        <Grid columns={["1fr", "1fr 1fr", "1fr 1fr"]}>
          <Text as="p" variant="aboutParagraph">
            We believe it should be super easy for tech companies of all kinds
            to innovate around the money movement in their apps. That’s the type
            of innovation that Swan enables. We’re the engine behind fintech
            builders all across Europe.
          </Text>
          <Text as="p" variant="aboutParagraph">
            We recently raised a €37m Series B round and we are rapidly scaling.
            Swan is a strong contender in several countries, and we’re working
            hard to become a leader across the continent. To get there we rely
            on the collective intelligence of our people.
          </Text>
        </Grid>
        <Flex
          sx={{
            paddingY: "120px",
            alignItems: "center",
            borderRadius: "10px",
            backgroundImage:
              "url(https://assets-global.website-files.com/609a39f33751ff4530c610e2/62b2f894cd84578643134773_about-blur.png)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "auto",
            backgroundPosition: "0 150px",
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: "#14191a",
            paddingX: ["24px", "64px", "64px"],
            // backgroundColor: "red",
          }}
        >
          <Text
            as="h2"
            variant="aboutHeaderSmall"
            sx={{ color: "#ffffff", marginBottom: "16px", textAlign: "center" }}
          >
            Timeline
          </Text>
          <Text
            as="div"
            sx={{
              flex: "0 auto",
              marginBottom: "30px",
              paddingTop: "16px",
              fontSize: "16px",
              lineHeight: "28px",
              color: "#ffffff",
              fontWeight: 300,
              textAlign: "center",
            }}
          >
            Company history and important events.
          </Text>
          <Flex
            sx={{
              marginTop: "80px",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <TimelineSection
              year={2019}
              items={[
                "Founded in Paris by Nicolas Benady (CEO) Mathieu Breton (CTO) and Nicolas Saison (COO), in collaboration with startup studio eFounders",
              ]}
            />
            <TimelineSection
              year={2020}
              items={[
                "5M€ raised with Creandum (Spotify, Klarna, iZettle, Pleo) and BPI France",
                "E-money license obtained to provide banking services across EEA",
                "Principal member of the Mastercard Network",
                <>
                  <Text sx={{ fontWeight: 500 }}>Feature launch: </Text>
                  Accounts & IBANs
                </>,
                "18 employees by end of year",
              ]}
            />
            <TimelineSection
              year={2021}
              items={[
                "16M€ Series A raised with Accel",
                "Public Sandbox - open across the EU",
                <Flex sx={{ flexDirection: "column" }}>
                  <Text as="div" sx={{ fontWeight: 500, marginBottom: "30px" }}>
                    Features launched:
                  </Text>
                  <Text sx={{ marginBottom: "30px" }}>Cards </Text>
                  <Text sx={{ marginBottom: "30px" }}>Apple Pay</Text>
                  <Text sx={{ marginBottom: "30px" }}>Google Pay</Text>
                  <Text>Web SCA</Text>
                </Flex>,
                "500M€ processed",
              ]}
            />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Timeline;
