import Head from "next/head";
import React from "react";
import { Box, Flex, Text } from "theme-ui";

import PublicHeader from "../src/components/public/header";
import PublicFooter from "../src/components/public/Footer/Footer";

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
