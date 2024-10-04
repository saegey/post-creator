import Head from "next/head";
import React from "react";
import { Box, Flex, Text } from "theme-ui";

import PublicHeader from "../src/components/public/Header/PublicHeader";
import PublicFooter from "../src/components/public/Footer/Footer";

const Manifesto = () => {
  return (
    <>
      <Head>
        <title>Monopad - Manifesto</title>
      </Head>

      <Box as="main" sx={{ width: "100vw" }}>
        <PublicHeader />
        <Flex
          sx={{
            height: "600px",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Flex sx={{ justifyItems: "center" }}>
            <Text
              as="h1"
              sx={{ color: "text", fontSize: "62px", lineHeight: "60px" }}
            >
              The Manifesto.
            </Text>
          </Flex>
        </Flex>
        <PublicFooter />
      </Box>
    </>
  );
};

export default Manifesto;
