import { Box } from "theme-ui";
import React from "react";

import { getWebscorerResults } from "../api";
import { ResultsContext } from "../ResultsContext";
import { usePost } from "../../../PostContext";
import Button from "../../../shared/Button";

const WebscorerSubmitButton = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { webScorerMeta, setPreviewWebscorerResults, resultsUrl } =
    React.useContext(ResultsContext);
  const { setPost } = usePost();

  const handleImportResults = async () => {
    setIsLoading(true);
    try {
      const results = await getWebscorerResults({
        url: resultsUrl,
        category: webScorerMeta.category,
      });

      setPost({
        webscorerResults: {
          results: results.data,
          selected: undefined,
          eventName: webScorerMeta.eventName,
          category: webScorerMeta.category,
        },
      });
      setPreviewWebscorerResults(true);
    } catch (error) {
      console.error("Error importing Webscorer results:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ marginLeft: "auto" }}>
      <Button
        disabled={isLoading}
        variant="primaryButton"
        loading={isLoading}
        onClick={handleImportResults}
      >
        Import
      </Button>
    </Box>
  );
};

export default WebscorerSubmitButton;
