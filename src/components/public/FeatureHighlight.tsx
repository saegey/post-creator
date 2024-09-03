import React from "react";
import { Box, Button, Flex, Grid, Text, Link as ThemeLink } from "theme-ui";
import Image from "next/image";

import FeatureHighlightItem from "./FeatureHighlightItem";

const FeatureHiglight = ({
  featureName,
  headline,
  imagePosition,
  subHeadline,
  highlights,
  imagePath,
}: {
  featureName: string;
  headline: JSX.Element;
  subHeadline: JSX.Element;
  imagePosition: "left" | "right";
  highlights?: Array<{
    icon: JSX.Element;
    content: JSX.Element;
  }>;
  imagePath: string;
}) => {
  const featureImage = (
    <Box
      sx={{
        position: "relative",
        gridColumnStart: [
          1,
          "inherit",
          imagePosition === "right" ? 2 : "inherit",
        ],
        gridRowStart: [2, "inherit", imagePosition === "right" ? 1 : "inherit"],
      }}
    >
      <Image
        src={imagePath}
        alt="text"
        style={{
          width: "100%",
          height: "auto",
          borderRadius: "5px",
        }}
        width={800}
        height={800}
      />
    </Box>
  );

  return (
    <Flex
      sx={{
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        marginBottom: ["120px", "130px", "130px"],
        paddingX: "16px",
      }}
    >
      <Grid
        sx={{
          gridColumnGap: "5rem",
          gridRowGap: "4rem",
          gridTemplateRows: "auto",
          gridTemplateColumns: ["1fr", "1fr 1fr", "1fr 1fr"],
          gridAutoColumns: "1fr",
          alignItems: "center",
          width: "1284px",
        }}
      >
        {featureImage}
        <Box>
          <Text
            sx={{
              fontWeight: 700,
              marginBottom: "16px",
              fontSize: "16px",
              lineHeight: "24px",
            }}
            as="div"
          >
            {featureName}
          </Text>
          <Text
            as="h2"
            sx={{
              fontSize: ["36px", "48px", "48px"],
              lineHeight: ["43px", "56px", "56px"],
              fontWeight: 400,
              marginBottom: "24px",
            }}
          >
            {headline}
          </Text>
          <Text
            as="p"
            sx={{
              fontSize: ["16px", "18px", "18px"],
              fontStyle: "italic",
              lineHeight: ["24px", "27px", "27px"],
              marginBottom: ["20px", "24px", "24px"],
            }}
          >
            {subHeadline}
          </Text>
          <Grid
            sx={{
              gridColumnGap: "16px",
              gridRowGap: "16px",
              gridTemplateRows: "auto",
              gridTemplateColumns: "1fr",
              gridAutoColumns: "1fr",
              paddingTop: "8px",
              paddingBottom: "8px",
            }}
          >
            {highlights &&
              highlights.map((highlight) => (
                <FeatureHighlightItem
                  icon={highlight.icon}
                  content={highlight.content}
                />
              ))}
          </Grid>
          <Box sx={{ marginTop: "32px" }}>
            <Button>Learn More</Button>
          </Box>
        </Box>
      </Grid>
    </Flex>
  );
};

export default FeatureHiglight;
