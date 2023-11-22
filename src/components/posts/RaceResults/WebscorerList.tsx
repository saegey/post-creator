import React from "react";
import { Box, Flex, Text } from "theme-ui";

import { RaceResultRow, WebscorerResultPreview } from "../../PostContext";
import { WebscorerResultsRow } from "./RaceResultsImport";

const WebscorerList = ({
  raceResults,
}: {
  raceResults: WebscorerResultPreview | undefined;
}) => {
  return (
    <>
      <Text
        as="h2"
        sx={{
          borderBottomColor: "dividerDark",
          borderBottomWidth: "1px",
          borderBottomStyle: "solid",
        }}
      >
        Results
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
