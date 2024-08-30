import React from "react";

import { OmniResultType } from "../../../../types/common";
import ResultsListHeader from "../shared/ResultsListHeader";
import ResultsListContainer from "../shared/ResultsListContainer";
import ResultsRow from "../shared/ResultsRow";

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
              <ResultsRow
                // i={i}
                place={
                  row.totalTime && row.status !== "DNF" ? String(i + 1) : "DNF"
                }
                isSelected={
                  `${row.firstName} ${row.lastName}` ===
                  `${raceResults.selected?.firstName} ${raceResults.selected?.lastName}`
                }
                racerName={`${row.firstName} ${row.lastName}`}
                racerTeam={row.team ? row.team : " "}
                racerTime={
                  row.totalTime && row.status !== "DNF"
                    ? row.timeFormattted
                    : " "
                }
                key={`result-${i}`}
                // row={row}
              />
            );
          })}
      </ResultsListContainer>
    </>
  );
};

export default OmniResultsList;
