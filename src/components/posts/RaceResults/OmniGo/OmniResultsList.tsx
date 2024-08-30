import React from "react";
import { Box, Flex, Text, Theme, ThemeUIStyleObject } from "theme-ui";

import { OmniResultType } from "../../../../types/common";
import ResultsListHeader from "../shared/ResultsListHeader";
import ResultsListContainer from "../shared/ResultsListContainer";

const OmniResultsList = ({
  raceResults,
  resultsUrl,
}: {
  raceResults: OmniResultType | undefined;
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
                sx={
                  {
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
                    flexFlow: "row wrap",
                  } as ThemeUIStyleObject<Theme>
                }
              >
                <Text
                  as="span"
                  sx={{ width: "60px" } as ThemeUIStyleObject<Theme>}
                >
                  {row.totalTime && row.status !== "DNF" ? i + 1 : "dnf"}
                </Text>
                <Box sx={{ flexGrow: 2 } as ThemeUIStyleObject<Theme>}>
                  <Text as="span">
                    {row.firstName} {row.lastName}
                  </Text>
                  <Text
                    as="span"
                    sx={
                      {
                        display: "block",
                        fontSize: "12px",
                        height: "15px",
                        flexGrow: 2,
                      } as ThemeUIStyleObject<Theme>
                    }
                  >
                    {row.team ? row.team : " "}
                  </Text>
                </Box>
                <Text
                  as="span"
                  sx={{ marginLeft: "15px" } as ThemeUIStyleObject<Theme>}
                ></Text>
                <Text
                  as="span"
                  sx={{ marginLeft: "15px" } as ThemeUIStyleObject<Theme>}
                >
                  {row.totalTime && row.status !== "DNF"
                    ? row.timeFormattted
                    : " "}
                </Text>
              </Flex>
            );
          })}
      </ResultsListContainer>
    </>
  );
};

export default OmniResultsList;
