import { Flex, Box, Button, Text, Spinner } from "theme-ui";
import React from "react";

import { getWebscorerResults } from "../api";
import { ResultsContext } from "../ResultsContext";
import { usePost } from "../../../PostContext";

const WebscorerSubmitButton = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { webScorerMeta, setPreviewWebscorerResults, resultsUrl } =
    React.useContext(ResultsContext);
  const { setPost } = usePost();

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
            setPost({
              webscorerResults: {
                results: results.data,
                selected: undefined,
                eventName: webScorerMeta.eventName,
                category: webScorerMeta.category,
              },
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
