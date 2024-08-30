import React from "react";

import { WebscorerResultPreview } from "../../../../types/common";
import ResultsListHeader from "../shared/ResultsListHeader";
import ResultsListContainer from "../shared/ResultsListContainer";
import ResultsRow from "../shared/ResultsRow";

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
        {raceResults?.results?.map((row, i) => {
          return (
            <ResultsRow
              key={`${i}-webscorer`}
              place={`${row.Place == "-" ? "DNF" : row.Place}`}
              isSelected={row.Name === raceResults?.selected?.Name}
              racerName={row.Name}
              racerTeam={row.TeamName}
              racerTime={row.Time === "DNF" ? "" : row.Time}
            />
          );
        })}
      </ResultsListContainer>
    </>
  );
};

export default WebscorerList;
