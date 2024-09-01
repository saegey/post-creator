// src/components/FooterSocialLinks.tsx
import React from "react";
import { Flex } from "theme-ui";
import FooterLink from "./FooterLink";

const FooterSocialLinks = () => (
  <Flex
    sx={{
      flexDirection: "row",
      gap: "20px",
    }}
  >
    <FooterLink href="/">Twitter</FooterLink>
    <FooterLink href="/">Instagram</FooterLink>
    <FooterLink href="/">Strava</FooterLink>
  </Flex>
);

export default FooterSocialLinks;
