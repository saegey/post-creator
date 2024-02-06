import Head from "next/head";
import React from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  Link as ThemeLink,
  NavLink,
  Text,
  Badge,
} from "theme-ui";
import Link from "next/link";

import Logo from "../src/components/shared/Logo";
import Image from "next/image";
import PublicHeader from "../src/components/public/header";
import PublicFooter from "../src/components/public/footer";

const Journal = () => {
  return (
    <>
      <Head>
        <title>Monopad - Journal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box as="main" sx={{ width: "100vw" }}>
        <PublicHeader />
        <Flex
          sx={{
            height: "600px",
            justifyContent: "center",
            alignItems: "center",
            // zIndex: 1,
            position: "relative",
          }}
        >
          <Flex sx={{ justifyItems: "center" }}>
            <Text
              as="h1"
              sx={{ color: "text", fontSize: "62px", lineHeight: "60px" }}
            >
              The journal.
            </Text>
          </Flex>
        </Flex>
        <PublicFooter />
      </Box>
    </>
  );
};

export default Journal;
