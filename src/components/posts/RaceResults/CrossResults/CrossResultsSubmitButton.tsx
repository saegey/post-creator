import { Flex, Box, Button, Text, Spinner } from "theme-ui";
import React from "react";
import { getCrossResults } from "../api";
import { ResultsContext } from "../ResultsContext";
import { PostContext } from "../../../PostContext";

const CrossResultsSubmitButton = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { resultsUrl, crossResultsMeta, setPreviewCrossResults } =
    React.useContext(ResultsContext);

  const { setCrossResults } = React.useContext(PostContext);
  const { category, eventName } = crossResultsMeta;

  return (
    <Box sx={{ marginLeft: "auto" }}>
      <Button
        disabled={isLoading ? true : false}
        variant="primaryButton"
        onClick={() => {
          setIsLoading(true);
          getCrossResults({ url: resultsUrl }).then((results) => {
            const catResults = results.data
              .filter((row) => row["RaceCategoryName"] === category)
              .sort((a, b) => (a["Place"] > b["Place"] ? 1 : -1));

            setCrossResults &&
              setCrossResults({
                results: catResults,
                selected: undefined,
                eventName: eventName,
              });
            setPreviewCrossResults(true);
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

export default CrossResultsSubmitButton;
