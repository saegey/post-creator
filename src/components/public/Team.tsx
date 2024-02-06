import React from "react";
import { Box, Flex, Grid, Link as ThemeLink, Text } from "theme-ui";

import TeamMember from "./TeamMember";
import Image from "next/image";
import ValueCard from "./ValueCard";

const Team = ({ show } = { show: false }) => {
  return (
    <Box
      sx={{
        margin: "16px",
        opacity: show ? 1 : 0,
        transition: "opacity 300ms ease 0s",
        display: show ? "block" : "none",
        maxWidth: "1280px",
      }}
    >
      <Flex
        as="section"
        sx={{
          flexDirection: "column",
          gap: "80px",
          paddingTop: ["40px", "80px", "80px"],
        }}
      >
        <Flex sx={{ justifyContent: "center" }}>
          <Flex sx={{ flexDirection: "column" }}>
            <Text as="h1" variant="aboutHeader">
              Meet the Minds Behind Monopad Journal: A Collective Passion for
              Cycling Excellence
            </Text>
            <Grid columns={["1fr", "1fr 1fr", "1fr 1fr"]}>
              <Text as="p" variant="aboutParagraph">
                Step into the world of Monopad Journal and discover the
                brilliant minds steering our journey. Our team, fueled by a
                shared passion for cycling and technological innovation, is at
                the heart of creating an app that resonates with cyclists,
                triathletes, gravel and mountain bike enthusiasts alike. From
                seasoned racers to tech wizards, each member contributes a
                unique blend of expertise, creativity, and dedication.
              </Text>
              <Text as="p" variant="aboutParagraph">
                Together, we're weaving the fabric of an app that goes beyond
                tracking – it's a digital companion crafted by individuals
                committed to redefining how athletes experience and celebrate
                the thrill of the ride. Get to know the diverse talents that
                drive Monopad Journal's success.
              </Text>
            </Grid>
            <Text as="p" variant="aboutParagraph">
              We are looking for the best talent to help us build the future!
            </Text>
          </Flex>
        </Flex>
        <Box>
          <Box>
            <Text as="h2" variant="aboutHeader">
              Leadership
            </Text>
            <Box>
              <Text as="p" variant="aboutParagraph">
                Charting the Course: Our Leadership Team's Commitment to
                Excellence and Innovation.
              </Text>
            </Box>
          </Box>

          <Grid
            columns={["1fr", "1fr 1fr", "1fr 1fr 1fr"]}
            sx={{ gridColumnGap: "56px", gridRowGap: "80px" }}
          >
            <TeamMember
              photo="/assets/aboutt/0.jpeg"
              name="Adam Saegebarth"
              isCofounder={true}
              title="Chief Executive Officer"
              bio="An experienced full-stack software architect and entrepreneur celebrated for his adept crafting of sophisticated software solutions. A 42-year-old tech enthusiast, Adam's passions extend beyond the digital realm to conquering gravel roads and navigating cyclocross challenges. Notably, he holds the title of the former Washington Cat4 State Champion in Cyclocross.

							In the dynamic landscape of early-stage startups and maritime consulting, Adam's entrepreneurial journey unfolds, marked by a resilient spirit and a penchant for problem-solving. Renowned for his nuanced approach to software architecture, Adam embodies a humble yet impactful fusion of technological innovation and a genuine love for the open road. His story is one of pushing boundaries in technology and savoring the thrill of cycling pursuits."
            />
          </Grid>
        </Box>
        <Flex sx={{ flexDirection: "column" }}>
          <Text as="h2" variant="aboutHeader">
            Monopad's Values
          </Text>
          <Grid
            columns={["1fr", "1fr 1fr", "1fr 1fr"]}
            gap={["0px", "16px", "16px"]}
          >
            <Box>
              <Box sx={{ paddingTop: ["0px", "80px", "80px"] }}>
                <ValueCard
                  image="/assets/aboutt/human-graphics-svgrepo-com.svg"
                  header="Innovation"
                  body="We embrace continuous innovation, crafting cutting-edge solutions that redefine the cycling experience and set new standards in the tech landscape."
                />
                <ValueCard
                  image="/assets/aboutt/bullseye-svgrepo-com.svg"
                  header="Community"
                  body="Fostering a sense of community, we believe in the power of shared experiences and collaborative efforts, uniting cyclists and tech enthusiasts in a dynamic ecosystem."
                />
              </Box>
            </Box>
            <Box>
              <ValueCard
                image="/assets/aboutt/diamond-svgrepo-com.svg"
                header="Adaptability"
                body=" Our commitment to adaptability reflects in our versatile solutions, seamlessly adjusting to the evolving needs of cyclists, triathletes, and mountain biking enthusiasts."
              />
              <ValueCard
                image="/assets/aboutt/hourglass-half-svgrepo-com.svg"
                header="Excellence"
                body="Striving for excellence in every aspect, we uphold a standard of precision and quality, ensuring our software architecture and features meet the highest standards, elevating the user experience."
              />
            </Box>
          </Grid>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Team;
