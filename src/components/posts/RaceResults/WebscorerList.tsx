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
                }}
              >
                <Text as="span" sx={{ width: ["30px", "60px", "60px"] }}>
                  {row.Place}
                </Text>
                <Text as="span" sx={{ width: ["150px", "300px", "300px"] }}>
                  {row.Name}
                </Text>
                <Text as="span">{row.Difference}</Text>
                <Text as="span" sx={{ marginLeft: "auto" }}>
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
