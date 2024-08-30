import React from "react";

import { RaceResultRow } from "../../../../types/common";
import ResultsListContainer from "../shared/ResultsListContainer";
import ResultsListHeader from "../shared/ResultsListHeader";
import ResultsRow from "../shared/ResultsRow";

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
        {raceResults?.results?.map((row, i) => {
          return (
            <ResultsRow
              key={`raceresult-${i}`}
              place={row.CatPlace}
              isSelected={row.Name === raceResults?.selected?.Name}
              racerName={row.Name}
              racerTeam={row.Team}
              racerTime={row.Time}
            />
          );
        })}
      </ResultsListContainer>
    </>
  );
};

export default RaceResultsDotComList;
