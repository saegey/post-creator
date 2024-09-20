import React from "react";
import { Box } from "theme-ui";

import { OmniResultType } from "../../../../types/common";
import ResultsListHeader from "../shared/ResultsListHeader";
import ResultsListContainer from "../shared/ResultsListContainer";
import ResultsRow from "../shared/ResultsRow";

const OmniResultsList = (props: {
  raceResults: OmniResultType | undefined;
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
          {raceResults &&
            raceResults?.results?.map((row, i) => {
              return (
                <ResultsRow
                  place={
                    row.totalTime && row.status !== "DNF"
                      ? String(i + 1)
                      : "DNF"
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
                />
              );
            })}
        </ResultsListContainer>
      </Box>
    </Box>
  );
};

export default OmniResultsList;
