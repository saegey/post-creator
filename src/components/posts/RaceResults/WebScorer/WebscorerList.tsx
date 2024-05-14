import React from "react";
import { Box, Button, Flex, Link, Text } from "theme-ui";

import { WebscorerResultPreview } from "../../../../types/common";

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
          <Text as="h2" sx={{ fontSize: ["16px", "20px", "20px"] }}>
            Results
          </Text>
        </Flex>
        {/* <Flex sx={{ justifyContent: "right" }}>
          <Link target="_blank" href={resultsUrl}>
            <Button variant="primaryButton">Link to results</Button>
          </Link>
        </Flex> */}
      </Flex>
      <Link href={resultsUrl} target="_blank" sx={{ color: "text" }}>
        <Text>{`${raceResults?.eventName} - ${raceResults?.category}`}</Text>
      </Link>
      <Box
        sx={{
          height: "500px",
          overflowY: "scroll",
          paddingTop: "10px",
          marginTop: "10px",
          borderTopWidth: "1px",
          borderTopStyle: "solid",
          borderTopColor: "postCardBorderDark",
        }}
      >
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
                  flexFlow: "row wrap",
                }}
              >
                <Text as="span" sx={{ width: ["30px", "60px", "60px"] }}>
                  {row.Place}
                </Text>
                <Box sx={{ flexGrow: 2, paddingY: "2px" }}>
                  <Text as="span">{row.Name}</Text>
                  <Text
                    as="span"
                    sx={{
                      display: ["none", "block", "block"],
                      fontSize: "12px",
                      height: "15px",
                      flexGrow: 2,
                    }}
                  >
                    {row.TeamName ? row.TeamName : " "}
                  </Text>
                </Box>
                <Text
                  as="span"
                  sx={{
                    display: ["none", "inherit", "inherit"],
                    marginLeft: "15px",
                  }}
                >
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
