import React from "react";
import { Box, Flex, Grid, Link as ThemeLink, Text } from "theme-ui";
import Image from "next/image";

const TeamMember = ({
  photo,
  name,
  title,
  isCofounder,
  bio,
}: {
  photo: string;
  name: string;
  title: string;
  isCofounder: boolean;
  bio: string;
}) => {
  return (
    <Flex sx={{ flexDirection: "column" }}>
      <Image
        src={photo}
        alt="headshot"
        width={500}
        height={500}
        style={{
          width: "156px",
          height: "auto",
          marginBottom: "24px",
        }}
      />
      <Text
        as="h3"
        sx={{ fontSize: "26px", lineHeight: "34px", fontWeight: 400 }}
      >
        {name}
      </Text>

      {isCofounder && (
        <Text as="div" sx={{ fontSize: "16px", lineHeight: "24px" }}>
          Co-Founder
        </Text>
      )}

      <Text as="div" sx={{ marginY: "16px", textTransform: "uppercase" }}>
        {title}
      </Text>
      <Text
        as="p"
        sx={{ fontSize: "14px", lineHeight: "24px", fontWeight: 300 }}
      >
        {bio}
      </Text>
    </Flex>
  );
};

export default TeamMember;
