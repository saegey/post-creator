import React from "react";
import { Box, Flex, Grid, Link as ThemeLink, Text } from "theme-ui";
import Image from "next/image";

const ValueCard = ({
  image,
  header,
  body,
}: {
  image: string;
  header: string;
  body: string;
}) => {
  return (
    <Box
      sx={{
        padding: "40px",
        boxShadow: "-2px 24px 64px rgba(20,25,26,.04)",
        marginBottom: "24px",
        backgroundColor: "skeletonDark",
      }}
    >
      <Image
        loading="eager"
        src={image}
        alt="value image"
        width={40}
        height={40}
        style={{ marginBottom: "24px" }}
      />

      <Text
        as="h5"
        sx={{
          marginTop: 0,
          marginBottom: "8px",
          fontSize: "26px",
          fontWeight: 400,
          lineHeight: "34px",
        }}
      >
        {header}
      </Text>
      <Text
        as="p"
        sx={{ fontSize: "14px", lineHeight: "24px", fontWeight: 300 }}
      >
        {body}
      </Text>
    </Box>
  );
};

export default ValueCard;
