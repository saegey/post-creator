import React from "react";
import { Box, Flex, Text, Theme, ThemeUIStyleObject } from "theme-ui";

import { RunSignupResultType } from "./RunSignupResultsPreview";
import { RunSignupType } from "../../../../types/common";
import ResultsListHeader from "../shared/ResultsListHeader";
import ResultsRow from "../shared/ResultsRow";
import ResultsListContainer from "../shared/ResultsListContainer";

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
      <ResultsListContainer>
        {raceResults &&
          formatResults()?.results.map((row, i) => {
            // return <pre>{JSON.stringify(row)}</pre>;
            return (
              <ResultsRow
                place={String(row.race_placement)}
                isSelected={
                  row.name === raceResults?.selected?.name ? true : false
                }
                racerName={row.name}
                racerTeam={`${row.city} ${row.state}`}
                racerTime={String(row.clock_time)}
              />
            );
          })}
      </ResultsListContainer>
    </>
  );
};

export default RunSignupList;
