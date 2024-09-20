import React from "react";
import { Box } from "theme-ui";

import { RaceResultRow } from "../../../../types/common";
import ResultsListContainer from "../shared/ResultsListContainer";
import ResultsListHeader from "../shared/ResultsListHeader";
import ResultsRow from "../shared/ResultsRow";

const RaceResultsDotComList = (props: {
  raceResults: RaceResultRow | undefined;
  resultsUrl: string;
}) => {
  const { raceResults, resultsUrl } = props;

  return (
    <Box variant="boxes.componentCard" contentEditable={false}>
      <Box sx={{ position: "relative" }}>
        <ResultsListHeader
          headerText={`${raceResults?.eventName}`}
          subText={`${raceResults?.category}`}
          resultsUrl={resultsUrl}
        />
        <ResultsListContainer>
          {raceResults?.results?.map((row, i) => {
            return (
              <ResultsRow
                key={`raceresult-${i}`}
                place={row.CatRank}
                isSelected={row.Name === raceResults?.selected?.Name}
                racerName={row.Name}
                racerTeam={row.Team}
                racerTime={row.Time}
              />
            );
          })}
        </ResultsListContainer>
      </Box>
    </Box>
  );
};

export default RaceResultsDotComList;
