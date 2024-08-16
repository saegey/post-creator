import { Flex, Box, Button, Text, Spinner } from "theme-ui";
import React from "react";

import { getOmniResults } from "./../api";
import { usePost } from "../../../PostContext";
import { ResultsContext } from "./../ResultsContext";

const OmniSubmitButton = () => {
  const { resultsUrl, omniMeta, setPreviewOmniResults } =
    React.useContext(ResultsContext);
  const { setPost, omniResults } = usePost();
  const { category } = omniMeta;

  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <Box sx={{ marginLeft: "auto" }}>
      <Button
        id="get-race-results-omni"
        type="button"
        variant="primaryButton"
        onClick={() => {
          setIsLoading(true);

          getOmniResults({ url: resultsUrl, category }).then((r) => {
            console.log(r);
            setPost({
              omniResults: {
                ...omniResults,
                results: r.data,
                selected: undefined,
                category: omniMeta.category,
                eventName: omniMeta.eventName,
              },
            });

            setPreviewOmniResults(true);
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

export default OmniSubmitButton;
