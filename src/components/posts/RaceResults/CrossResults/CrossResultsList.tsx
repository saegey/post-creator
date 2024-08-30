import React from "react";

import { CrossResultsPreviewType } from "../../../../types/common";
import ResultsListHeader from "../shared/ResultsListHeader";
import ResultsListContainer from "../shared/ResultsListContainer";
import ResultsRow from "../shared/ResultsRow";

const CrossResultsList = ({
  raceResults,
  resultsUrl,
}: {
  raceResults: CrossResultsPreviewType | null | undefined;
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
    </>
  );
};

export default CrossResultsList;
