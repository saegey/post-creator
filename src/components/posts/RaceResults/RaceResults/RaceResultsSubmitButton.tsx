import { Box } from "theme-ui";
import React from "react";

import { getResults } from "./../api";
import { ResultsContext } from "./../ResultsContext";
import { usePost } from "../../../PostContext";
import { NotificationContext } from "../../../NotificationContext";
import Button from "../../../shared/Button";

const RaceResultsSubmitButton = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { raceResultsMeta, resultsUrl, setPreviewResults } =
    React.useContext(ResultsContext);
  const { setPost, raceResults } = usePost();
  const { setNotification } = React.useContext(NotificationContext);

  const { category, key, server, division, eventName } = raceResultsMeta;

  const handleImportResults = async () => {
    setIsLoading(true);
    try {
      const res = await getResults({
        category,
        key,
        server,
        division,
        url: resultsUrl,
      });

      setPost({
        raceResults: {
          ...raceResults,
          results: res,
          selected: undefined,
          category,
          division,
          eventName,
        },
      });
      setPreviewResults(true);
    } catch (error) {
      setNotification({
        message: "Failed to get race info",
        type: "Error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ marginLeft: "auto" }}>
      <Button
        id="get-race-results"
        type="button"
        variant="primaryButton"
        loading={isLoading}
        onClick={handleImportResults}
      >
        Import
      </Button>
    </Box>
  );
};

export default RaceResultsSubmitButton;
