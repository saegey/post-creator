import { Box } from "theme-ui";
import React from "react";

import { getOmniResults } from "./../api";
import { usePost } from "../../../PostContext";
import { ResultsContext } from "./../ResultsContext";
import Button from "../../../shared/Button";

const OmniSubmitButton = () => {
  const { resultsUrl, omniMeta, setPreviewOmniResults } =
    React.useContext(ResultsContext);
  const { setPost, omniResults } = usePost();
  const { category } = omniMeta;

  const [isLoading, setIsLoading] = React.useState(false);

  const handleImportResults = async () => {
    setIsLoading(true);
    try {
      const result = await getOmniResults({ url: resultsUrl, category });

      setPost({
        omniResults: {
          ...omniResults,
          results: result.data,
          selected: undefined,
          category: omniMeta.category,
          eventName: omniMeta.eventName,
        },
      });

      setPreviewOmniResults(true);
    } catch (error) {
      console.error("Error importing omni results:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ marginLeft: "auto" }}>
      <Button
        id="get-race-results-omni"
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

export default OmniSubmitButton;
