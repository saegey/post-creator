// src/components/FooterLink.tsx
import React from "react";
import { Link as ThemeLink } from "theme-ui";
import Link from "next/link";

type FooterLinkProps = {
  href: string;
  external?: boolean;
  children: React.ReactNode;
};

const FooterLink = ({ href, external = false, children }: FooterLinkProps) => {
  if (external) {
    return (
      <ThemeLink
        href={href}
        sx={{
          color: "link",
          textDecoration: "none",
          marginY: "5px",
          fontWeight: 500,
        }}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </ThemeLink>
    );
  }

  return (
    <ThemeLink
      as={Link}
      href={href}
      sx={{
        color: "link",
        textDecoration: "none",
        marginY: "5px",
        fontWeight: 500,
      }}
    >
      {children}
    </ThemeLink>
  );
};

export default FooterLink;
