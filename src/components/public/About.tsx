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
        Swan is the easiest way to embed banking features into your product. Via
        its simple APIs, European companies can integrate banking services
        (accounts, cards and payments) quickly and easily into their own
        product.
      </Text>
      <Text as="p" variant="aboutParagraph">
        Founded in 2019, Swan processes around 300 million euros of transactions
        per month, for 100+ companies across ten European countries. The company
        was founded with the startup studio eFounders, and has received growth
        capital from leading VC investors such as Lakestar, Accel, Creandum, and
        Bpifrance. Swan is a Mastercard principal member and a licensed
        financial institution, regulated by the ACPR.
      </Text>
      <Text as="h2" variant="aboutHeaderSmall">
        What we do: embedded banking
      </Text>
      <Text as="p" variant="aboutParagraph">
        Embedded finance is the contextualized integration of financial services
        into digital products. Tech companies of all kinds can benefit from
        embedding banking features like accounts, cards, and payments.
      </Text>
      <Text as="h2" variant="aboutHeaderSmall">
        Why embedded banking?
      </Text>
      <Text as="p" variant="aboutParagraph">
        We believe banking operations are at their best when you barely notice
        them. Think about your favorite chauffeur app: you order a car, you're
        driven, and you get out. You don't have to worry about the payment, it
        just happens. All types of digital businesses can make this kind of
        super-smooth user experience by embedding banking features.
      </Text>
      ‍
      <Text as="p" variant="aboutParagraph">
        There are countless processes involving money movement that can be
        improved: welcoming a new employee, paying a supplier, getting a new
        tenant moved in. Specialized software already handles these things, but
        they’re often still lacking the required banking feature integrations to
        offer a unified user journey.
      </Text>
      <Text as="p" variant="aboutParagraph">
        Swan’s easy integration lets companies put banking services right where
        the end-user might need them, and it’s all white-labeled so the user
        experience continues to match the companies own branding and colors.
      </Text>
    </Box>
  );
};

export default AboutUs;
