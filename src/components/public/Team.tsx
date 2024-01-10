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
              Building a European banking platform to last
            </Text>
            <Grid columns={["1fr", "1fr 1fr", "1fr 1fr"]}>
              <Text as="p" variant="aboutParagraph">
                At Swan, our dream is to be the first thing people think of when
                they want to add banking features to any product. Our founders,
                all fintech veterans and seasoned entrepreneurs, experienced
                first-hand the pain of embedding finance: long meetings, piles
                of paperwork, convoluted APIs. There had to be an easier way. So
                they teamed up to launch Swan in 2019.
              </Text>
              <Text as="p" variant="aboutParagraph">
                Since then, we’ve earned 58€m funding and became a licensed
                financial institution. Our platform is getting more powerful and
                more elegant by the day. Now we're expanding in Europe:
                localizing our product, internationalizing our team and our
                partner portfolio. With partners in 8 EU countries and product
                coverage across 30, we are on track to take Swan much, much
                further!
              </Text>
            </Grid>
            <Text as="p" variant="aboutParagraph">
              We are looking for the best talent to help us build the future of
              banking services!
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
                An international team of experts in banking, fraud, payments,
                product development, and more.
              </Text>
            </Box>
          </Box>

          <Grid
            columns={["1fr", "1fr 1fr", "1fr 1fr 1fr"]}
            sx={{ gridColumnGap: "56px", gridRowGap: "80px" }}
          >
            <TeamMember
              photo="/assets/aboutt/633340290358c30aeaa698e5_nb-p-500.png"
              name="Nicolas Benady"
              isCofounder={true}
              title="Chief Executive Officer"
              bio="A serial entrepreneur and payments expert, Nicolas has already cofounded two successful startups, Limonetik and Antelop, both acquired in 2021. Swan is his biggest venture yet, and his ambition is to make it a major European Banking platform for years to come. Nicolas is an avid cyclist, and one of the things that keep him up at night is how to build a more ecologically responsible company."
            />
            <TeamMember
              photo="/assets/aboutt/609a39f33751ff5ad4c6114b_nicolas-s.png"
              name="Nicolas Saison"
              isCofounder={true}
              title="Chief operations Officer"
              bio="Nicolas integrated 40+ payment methods at Limonetik and went on to manage payments and a B2C Finance Management app at Veolia. He leads daily operations with a sharp product vision and unbreakable positivity. Once upon a time, Nicolas Saison was actually CEO Nicolas Benady's apprentice. The two later joined forces as partners to make Swan take flight."
            />
            <TeamMember
              photo="/assets/aboutt/609a39f33751ff07a8c61148_mathieu-b.png"
              name="Mathieu Breton"
              isCofounder={true}
              title="CHIEF TECHNICAL OFFICER"
              bio="Mathieu pilots super complex projects with admirable tech prowess. Passionate and altruistic, he's as comfortable sharing at a conference as he is huddled around a beer. Ex-lead dev at Xebia, then technical director, Breton has already launched his first tech company, JS-Republic, and now brings his savoir faire to Swan."
            />
            <TeamMember
              photo="/assets/aboutt/609a39f33751ff081ac611cd_stephie.png"
              name="Stéphie Ndinga"
              isCofounder={false}
              title="CHIEF COMPLIANCE OFFICER"
              bio="Before joining Swan as Chief Compliance Officer, Stéphie was at Leetchi, European leader in online money pots (12 million+ users), where she created a powerful scoring engine and built a compliance department from the ground up. An expert in fraud, regulation, and client services, Stéphie is just the powerhouse Swan needed to help us earn our coveted e-money license, and to provide the most robust possible compliance processes."
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
                  header="Be human"
                  body="We do the right thing and go the extra mile to help people — colleagues, partners, or clients. Be human, straightforward, transparent, and sincerely care."
                />
                <ValueCard
                  image="/assets/aboutt/bullseye-svgrepo-com.svg"
                  header="Move fast, don't break things"
                  body="If we must choose between security and going fast, we choose security. We are in banking, after all."
                />
              </Box>
            </Box>
            <Box>
              <ValueCard
                image="/assets/aboutt/diamond-svgrepo-com.svg"
                header="Be ambitious"
                body="We’re in this for the long game. To transform the entire financial services market, we constantly seek to do better, to do more."
              />
              <ValueCard
                image="/assets/aboutt/hourglass-half-svgrepo-com.svg"
                header="Make everything simple"
                body="If something is confusing, we break it down. Making complex things simple is what we do."
              />
            </Box>
          </Grid>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Team;
