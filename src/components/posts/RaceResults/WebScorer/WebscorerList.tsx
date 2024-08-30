import React from "react";
import { Box, Button, Flex, Link, Text } from "theme-ui";

import { WebscorerResultPreview } from "../../../../types/common";
import ResultsListHeader from "../shared/ResultsListHeader";
import ResultsListContainer from "../shared/ResultsListContainer";

const WebscorerList = ({
  raceResults,
  resultsUrl,
}: {
  raceResults: WebscorerResultPreview | undefined;
  resultsUrl: string;
}) => {
  return (
    <>
      <ResultsListHeader
        headerText={raceResults?.eventName}
        subText={raceResults?.category}
        resultsUrl={resultsUrl}
      />
      <ResultsListContainer>
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
      </ResultsListContainer>
    </>
  );
};

export default WebscorerList;
