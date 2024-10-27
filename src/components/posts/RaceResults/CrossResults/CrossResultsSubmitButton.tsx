import { Box } from "theme-ui";
import React from "react";

import { getCrossResults } from "../api";
import { ResultsContext } from "../ResultsContext";
import { usePost } from "../../../PostContext";
import Button from "../../../shared/Button";

const CrossResultsSubmitButton = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { resultsUrl, crossResultsMeta, setPreviewCrossResults } =
    React.useContext(ResultsContext);
  const { setPost } = usePost();
  const { category, eventName } = crossResultsMeta;

  // Handler function for the Import action
  const handleImportResults = async () => {
    setIsLoading(true);
    try {
      const results = await getCrossResults({ url: resultsUrl });
      const catResults = results.data
        .filter((row) => row["RaceCategoryName"] === category)
        .sort((a, b) => (a["Place"] > b["Place"] ? 1 : -1));

      setPost({
        crossResults: {
          results: catResults,
          selected: undefined,
          eventName: eventName,
        },
      });
      setPreviewCrossResults(true);
    } catch (error) {
      console.error("Error importing cross results:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ marginLeft: "auto" }}>
      <Button
        disabled={isLoading}
        loading={isLoading}
        variant="primaryButton"
        onClick={handleImportResults}
      >
        Import
      </Button>
    </Box>
  );
};

export default CrossResultsSubmitButton;
