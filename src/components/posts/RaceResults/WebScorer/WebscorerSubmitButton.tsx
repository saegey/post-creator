import { Flex, Box, Button, Text, Spinner } from "theme-ui";
import React from "react";

import { getWebscorerResults } from "../api";
import { ResultsContext } from "../ResultsContext";
import { PostContext } from "../../../PostContext";

const WebscorerSubmitButton = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { webScorerMeta, setPreviewWebscorerResults, resultsUrl } =
    React.useContext(ResultsContext);
  const { setWebscorerResultPreview } = React.useContext(PostContext);

  return (
    <Box sx={{ marginLeft: "auto" }}>
      <Button
        disabled={isLoading ? true : false}
        variant="primaryButton"
        onClick={() => {
          setIsLoading(true);
          getWebscorerResults({
            url: resultsUrl,
            category: webScorerMeta.category,
          }).then((results) => {
            setWebscorerResultPreview &&
              setWebscorerResultPreview({
                results: results.data,
                selected: undefined,
                eventName: webScorerMeta.eventName,
                category: webScorerMeta.category,
              });
            setPreviewWebscorerResults(true);
          });
          setIsLoading(false);
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

export default WebscorerSubmitButton;
