// src/components/FooterSection.tsx
import React from "react";
import { Flex, Text, ThemeUIStyleObject } from "theme-ui";

type FooterSectionProps = {
  title: string;
  children: React.ReactNode;
  sx?: ThemeUIStyleObject;
};

const FooterSection = ({ title, children, sx }: FooterSectionProps) => (
  <Flex sx={{ flexFlow: "column", alignItems: "flex-start", ...sx }}>
    <Text
      as="h4"
      sx={{ marginBottom: "20px", fontSize: "18px", fontWeight: 600 }}
    >
      {title}
    </Text>
    {children}
  </Flex>
);

export default FooterSection;
