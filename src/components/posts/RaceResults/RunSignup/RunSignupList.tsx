import React from "react";
import { Box, Flex, Text, Theme, ThemeUIStyleObject } from "theme-ui";

import { RunSignupResultType } from "./RunSignupResultsPreview";
import { RunSignupType } from "../../../../types/common";
import ResultsListHeader from "../shared/ResultsListHeader";

const RunSignupList = ({
  raceResults,
  resultsUrl,
}: {
  raceResults?: RunSignupType;
  resultsUrl: string;
}) => {
  const formatResults = () => {
    if (raceResults === undefined) {
      return;
    }
    const { results } = raceResults;
    const divisionId = results?.divisions[0].race_division_id;
    return {
      divisionId: divisionId,
      results: results?.resultSet.results.map((r, i) => {
        const resultObj: RunSignupResultType = {
          race_placement: null,
          name: "",
          city: "",
          state: "",
          chip_time: "",
        };
        results.headings.map((h, i1) => {
          resultObj[h.key as keyof RunSignupResultType] = r[i1];
        });
        return resultObj;
      }) as Array<RunSignupResultType>,
    };
  };

  return (
    <>
      <ResultsListHeader
        headerText={`${raceResults?.eventName}`}
        subText={`${raceResults?.categoryName}`}
        resultsUrl={resultsUrl}
      />
      <Box
        sx={
          {
            maxHeight: "500px",
            overflowY: "scroll",
            paddingTop: "10px",
          } as ThemeUIStyleObject<Theme>
        }
      >
        {raceResults &&
          formatResults()?.results.map((row, i) => {
            return (
              <Flex
                key={`result-${i}`}
                sx={
                  {
                    paddingY: "2px",
                    paddingX: "5px",
                    backgroundColor:
                      row.name === raceResults?.selected?.name
                        ? "selectedBackground"
                        : null,
                    color:
                      row.name === raceResults?.selected?.name
                        ? "selectedBackgroundText"
                        : null,
                    borderRadius: "5px",
                    fontSize: ["15px", "16px", "16px"],
                    // justifyContent: "space-around",
                    flexFlow: "row wrap",
                    // alignItems: "stretch",
                  } as ThemeUIStyleObject<Theme>
                }
              >
                <Text
                  as="span"
                  sx={{ width: "60px" } as ThemeUIStyleObject<Theme>}
                >
                  {row.race_placement}
                </Text>
                <Box sx={{ flexGrow: 2 }}>
                  <Text as="span">{row.name}</Text>
                  <Text
                    as="span"
                    sx={{
                      display: "block",
                      fontSize: "12px",
                      height: "15px",
                      flexGrow: 2,
                    }}
                  >
                    {row.city} {row.state}
                  </Text>
                </Box>
                {/* <Text as="span" sx={{ marginLeft: "15px" }}>
                  {row.Difference}
                </Text> */}
                <Text as="span" sx={{ marginLeft: "15px" }}>
                  {row.chip_time}
                </Text>
              </Flex>
            );
          })}
      </Box>
    </>
  );
};

export default RunSignupList;
