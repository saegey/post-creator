import { Flex, Box, Button, Text, Spinner } from "theme-ui";
import React from "react";

import { getResults } from "./../api";
import { ResultsContext } from "./../ResultsContext";
import { PostContext } from "../../../PostContext";

const RaceResultsSubmitButton = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { raceResultsMeta, resultsUrl, setPreviewResults } =
    React.useContext(ResultsContext);
  const { setRaceResults } = React.useContext(PostContext);
  const { category, key, server, division } = raceResultsMeta;

  return (
    <Box sx={{ marginLeft: "auto" }}>
      <Button
        id="get-race-results"
        type="button"
        variant="primaryButton"
        onClick={() => {
          setIsLoading(true);
          getResults({
            category,
            key,
            server,
            division,
            url: resultsUrl,
          }).then((r) => {
            setRaceResults &&
              setRaceResults({
                results: r as any,
                selected: undefined,
              });
            setPreviewResults(true);
            setIsLoading(false);
          });
        }}
      >
        <Flex sx={{ gap: "10px" }}>
          <Text as="span">Import</Text>
          {isLoading && (
            <Spinner sx={{ size: "20px", color: "spinnerButton" }} />
          )}
        </Flex>
      </Button>
    </Box>
  );
};

export default RaceResultsSubmitButton;
