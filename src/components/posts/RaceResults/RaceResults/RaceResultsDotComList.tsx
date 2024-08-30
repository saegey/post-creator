import React from "react";
import { Box, Flex, Text } from "theme-ui";

import { RaceResultRow } from "../../../../types/common";
import ResultsListContainer from "../shared/ResultsListContainer";
import ResultsListHeader from "../shared/ResultsListHeader";

const RaceResultsDotComList = ({
  raceResults,
  resultsUrl,
}: {
  raceResults: RaceResultRow | undefined;
  resultsUrl: string;
}) => {
  return (
    <>
      <ResultsListHeader
        headerText={`${raceResults?.eventName}`}
        subText={`${raceResults?.category}`}
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
                }}
              >
                <Text as="span" sx={{ width: ["30px", "60px", "60px"] }}>
                  {row.CatPlace}
                </Text>
                <Box sx={{ flexGrow: "1" }}>
                  <Text as="div">{row.Name}</Text>
                  <Text as="div" sx={{ fontSize: "13px", minHeight: "13px" }}>
                    {row.Team ? row.Team : " "}
                  </Text>
                </Box>
                <Text as="span" sx={{ width: "fit-content" }}>
                  {row.Time}
                </Text>
              </Flex>
            );
          })}
      </ResultsListContainer>
    </>
  );
};

export default RaceResultsDotComList;
