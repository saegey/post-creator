import { Box, Flex, Grid, Link as ThemeLink, Text } from "theme-ui";

const AboutUs = ({ show }: { show: boolean }) => {
  return (
    <Box
      sx={{
        margin: "16px",
        marginTop: "80px",
        // display: isAbout ? "" : "none",
        opacity: show ? 1 : 0,
        transition: "opacity 300ms ease 0s",
        display: show ? "block" : "none",
        maxWidth: "1280px",
      }}
    >
      <Text as="p" variant="aboutParagraph">
        Welcome to Monopad, the brainchild of a passionate cyclist based in the
        vibrant city of Seattle. Established in 2023, Monopad Journal is a
        testament to the fusion of technological innovation and a deep love for
        the diverse world of cycling and triathlon.
      </Text>
      <Text as="h2" variant="aboutHeaderSmall">
        Our Journey
      </Text>
      <Text as="p" variant="aboutParagraph">
        Our journey began as a solo venture, fueled by a racer's desire to
        redefine the way cyclists and triathletes engage with their experiences
        on roads, trails, and during multi-disciplinary events. Rooted in the
        picturesque landscapes of the Pacific Northwest, Monopad Journal was
        conceptualized to be more than just a tracking app – it's a companion on
        your journey to mastering various terrains and disciplines.
      </Text>
      <Text as="h2" variant="aboutHeaderSmall">
        Passion Meets Innovation
      </Text>
      <Text as="p" variant="aboutParagraph">
        Situated at the intersection of passion and innovation, our one-person
        team in Seattle has dedicated itself to creating a race journal app that
        resonates with the unique needs of cyclists, triathletes, gravel and
        mountain bike enthusiasts. Every feature, from meticulous data tracking
        to intuitive user interfaces, reflects our commitment to enhancing your
        athletic endeavors.
      </Text>
      <Text as="h2" variant="aboutHeaderSmall">
        What Sets Us Apart
      </Text>
      <Text as="p" variant="aboutParagraph">
        At Monopad Journal, we recognize that every ride, every race, and every
        athlete has a story waiting to be told. Our app transcends traditional
        tracking, offering a canvas for your journey. We pride ourselves on
        delivering a seamless, intuitive, and personalized experience that
        adapts to your individual aspirations and goals across various cycling
        disciplines.
      </Text>
      <Text as="h2" variant="aboutHeaderSmall">
        Our Commitment
      </Text>
      <Text as="p" variant="aboutParagraph">
        As a one-person team rooted in Seattle's dynamic cycling and triathlon
        community, our commitment goes beyond coding and technology. We are here
        to support your diverse athletic journey, celebrate your triumphs, and
        learn from your challenges. Your insights fuel our continuous
        improvement, ensuring that Monopad Journal evolves to meet the dynamic
        needs of cyclists, triathletes, gravel and mountain biking enthusiasts.
      </Text>
      <Text as="h2" variant="aboutHeaderSmall">
        Join Us in the Journey
      </Text>
      <Text as="p" variant="aboutParagraph">
        Whether you're conquering roads, trails, or participating in triathlons,
        Monopad Journal is your digital companion. Join us in this exciting
        journey where technology, passion, and community converge to redefine
        how we experience and celebrate the exhilaration of the ride.
      </Text>
    </Box>
  );
};

export default AboutUs;
