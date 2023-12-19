import React from "react";
import { Box, Button, Flex, Link, Text } from "theme-ui";

import { WebscorerResultPreview } from "../../../PostContext";

const WebscorerList = ({
  raceResults,
  resultsUrl,
}: {
  raceResults: WebscorerResultPreview | undefined;
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
      <Text>{`${raceResults?.category}`}</Text>
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
                    row.Name === raceResults?.selected?.Name
                      ? "selectedBackground"
                      : null,
                  color:
                    row.Name === raceResults?.selected?.Name
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
                  {row.Place}
                </Text>
                <Box sx={{ flexGrow: 2 }}>
                  <Text as="span">{row.Name}</Text>
                  <Text
                    as="span"
                    sx={{
                      display: "block",
                      fontSize: "12px",
                      height: "15px",
                      flexGrow: 2,
                    }}
                  >
                    {row.TeamName ? row.TeamName : " "}
                  </Text>
                </Box>
                <Text as="span" sx={{ marginLeft: "15px" }}>
                  {row.Difference}
                </Text>
                <Text as="span" sx={{ marginLeft: "15px" }}>
                  {row.Time}
                </Text>
              </Flex>
            );
          })}
      </Box>
    </>
  );
};

export default WebscorerList;
