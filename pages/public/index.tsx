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

import Logo from "../../src/components/shared/Logo";
import Image from "next/image";
import PublicHeader from "../../src/components/public/header";

const Home = () => {
  const [isProductMenuOpen, setIsProductMenuOpen] = React.useState(false);

  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box as="main" sx={{ width: "100vw" }}>
        <PublicHeader />
        <Flex
          sx={{
            height: "100vh",
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
              The journal that<br></br>redefines journaling.
            </Text>
          </Flex>
        </Flex>
        <Flex
          sx={{
            height: "100vh",
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
              This is the next generation mf.
            </Text>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default Home;
