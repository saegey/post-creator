import React from "react";
import { Box } from "theme-ui";

import { CrossResultsPreviewType } from "../../../../types/common";
import ResultsListHeader from "../shared/ResultsListHeader";
import ResultsListContainer from "../shared/ResultsListContainer";
import ResultsRow from "../shared/ResultsRow";

const CrossResultsList = (props: {
  raceResults: CrossResultsPreviewType | null | undefined;
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
                key={`crossresult-${i}`}
                place={String(row.Place)}
                isSelected={
                  `${row.FirstName} ${row.LastName}` ===
                  `${raceResults?.selected?.FirstName} ${raceResults?.selected?.LastName}`
                }
                racerName={`${row.FirstName} ${row.LastName}`}
                racerTeam={row.TeamName}
                racerTime={row.RaceTime}
              />
            );
          })}
        </ResultsListContainer>
      </Box>
    </Box>
  );
};

export default CrossResultsList;
