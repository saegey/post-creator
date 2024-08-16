import { Flex, Box, Button, Text, Spinner } from "theme-ui";
import React from "react";

import { getResults } from "./../api";
import { ResultsContext } from "./../ResultsContext";
import { usePost } from "../../../PostContext";
import { NotificationContext } from "../../../NotificationContext";

const RaceResultsSubmitButton = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { raceResultsMeta, resultsUrl, setPreviewResults } =
    React.useContext(ResultsContext);
  const { setPost, raceResults } = usePost();
  const { setNotification } = React.useContext(NotificationContext);

  const { category, key, server, division, eventName } = raceResultsMeta;

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
          })
            .then((res) => {
              setPost({
                raceResults: {
                  ...raceResults,
                  results: res,
                  selected: undefined,
                  category: raceResultsMeta.category,
                  division: raceResultsMeta.division,
                  eventName,
                },
              });
              setPreviewResults(true);
              setIsLoading(false);
            })
            .catch((e) => {
              setNotification({
                message: "Failed to get race info",
                type: "Error",
              });
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
