import { Box } from "theme-ui";
import React from "react";

import { getRunSignupResults } from "../api";
import { ResultsContext } from "../ResultsContext";
import { usePost } from "../../../PostContext";
import { NotificationContext } from "../../../NotificationContext";
import Button from "../../../shared/Button";

const RunSignupSubmitButton = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { runSignupMeta, resultsUrl, setPreviewRunSignupResults } =
    React.useContext(ResultsContext);
  const { setPost } = usePost();
  const { setNotification } = React.useContext(NotificationContext);

  const getResults = async () => {
    setIsLoading(true);

    try {
      const results = await getRunSignupResults({
        url: resultsUrl,
        category: runSignupMeta.category,
      });

      setPost({
        runSignupResults: {
          results: results?.data,
          selected: undefined,
          eventName: runSignupMeta.eventName,
          category: runSignupMeta.category,
          categoryName: runSignupMeta.categoryName,
        },
      });
      setPreviewRunSignupResults(true);
    } catch (error) {
      setNotification({
        message: "Failed to get race results",
        type: "Error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ marginLeft: "auto" }}>
      <Button
        loading={isLoading}
        disabled={isLoading}
        variant="primaryButton"
        onClick={getResults}
      >
        Import
      </Button>
    </Box>
  );
};

export default RunSignupSubmitButton;
