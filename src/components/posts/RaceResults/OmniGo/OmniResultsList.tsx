import React from "react";
import { Box, Button, Flex, Link, Text } from "theme-ui";

import { OmniResultType } from "../../../PostContext";

const OmniResultsList = ({
  raceResults,
  resultsUrl,
}: {
  raceResults: OmniResultType | undefined;
  resultsUrl: string;
}) => {
  return (
    <>
      <Flex>
        <Flex sx={{ flexGrow: 1 }}>
          <Text as="h2">Results</Text>
        </Flex>
        <Flex sx={{ justifyContent: "right" }}>
          <Link target="_blank" href={resultsUrl}>
            <Button variant="primaryButton">Link to results</Button>
          </Link>
        </Flex>
      </Flex>
      <Text>
        {raceResults?.eventName} - {raceResults?.category}
      </Text>
      <Box sx={{ height: "500px", overflowY: "scroll", paddingTop: "10px" }}>
        {raceResults &&
          raceResults?.results?.map((row, i) => {
            return (
              <Flex
                key={`result-${i}`}
                sx={{
                  paddingY: "2px",
                  paddingX: "5px",
                  backgroundColor:
                    `${row.firstName} ${row.lastName}` ===
                    `${raceResults?.selected?.firstName} ${raceResults?.selected?.lastName}`
                      ? "selectedBackground"
                      : null,
                  color:
                    `${row.firstName} ${row.lastName}` ===
                    `${raceResults?.selected?.firstName} ${raceResults?.selected?.lastName}`
                      ? "selectedBackgroundText"
                      : null,
                  borderRadius: "5px",
                  fontSize: ["15px", "16px", "16px"],
                  // justifyContent: "space-around",
                  flexFlow: "row wrap",
                  // alignItems: "stretch",
                }}
              >
                <Text as="span" sx={{ width: "60px" }}>
                  {row.totalTime && row.status !== "DNF" ? i + 1 : "dnf"}
                </Text>
                <Box sx={{ flexGrow: 2 }}>
                  <Text as="span">
                    {row.firstName} {row.lastName}
                  </Text>
                  <Text
                    as="span"
                    sx={{
                      display: "block",
                      fontSize: "12px",
                      height: "15px",
                      flexGrow: 2,
                    }}
                  >
                    {row.team ? row.team : " "}
                  </Text>
                </Box>
                <Text as="span" sx={{ marginLeft: "15px" }}></Text>
                <Text as="span" sx={{ marginLeft: "15px" }}>
                  {row.totalTime && row.status !== "DNF"
                    ? row.timeFormattted
                    : " "}
                </Text>
              </Flex>
            );
          })}
      </Box>
    </>
  );
};

export default OmniResultsList;
