import { Flex, Box, Button, Text, Spinner } from "theme-ui";
import React from "react";

import { getRunSignupResults, getWebscorerResults } from "../api";
import { ResultsContext } from "../ResultsContext";
import { PostContext } from "../../../PostContext";

const RunSignupSubmitButton = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const {
    runSignupMeta,
    setRunSignupMeta,
    resultsUrl,
    setPreviewRunSignupResults,
  } = React.useContext(ResultsContext);
  const { setRunSignupResults } = React.useContext(PostContext);

  return (
    <Box sx={{ marginLeft: "auto" }}>
      <Button
        disabled={isLoading ? true : false}
        variant="primaryButton"
        onClick={() => {
          console.log(runSignupMeta.category);
          setIsLoading(true);
          getRunSignupResults({
            url: resultsUrl,
            category: runSignupMeta.category,
          }).then((results) => {
            setRunSignupResults &&
              setRunSignupResults({
                results: results.data,
                selected: undefined,
                eventName: runSignupMeta.eventName,
                category: runSignupMeta.category,
                categoryName: runSignupMeta.categoryName,
              });
            setPreviewRunSignupResults(true);
            // setPreviewWebscorerResults(true);
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

export default RunSignupSubmitButton;
