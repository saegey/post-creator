import React from "react";
import { Box } from "theme-ui";

import { WebscorerResultPreview } from "../../../../types/common";
import ResultsListHeader from "../shared/ResultsListHeader";
import ResultsListContainer from "../shared/ResultsListContainer";
import ResultsRow from "../shared/ResultsRow";

const WebscorerList = (props: {
  raceResults: WebscorerResultPreview | undefined;
  resultsUrl: string;
}) => {
  const { raceResults, resultsUrl } = props;

  return (
    <Box
      variant="boxes.componentCard"
      contentEditable={false}
      sx={{ backgroundColor: "background" }}
    >
      <Box sx={{ position: "relative" }}>
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
      </Box>
    </Box>
  );
};

export default WebscorerList;
