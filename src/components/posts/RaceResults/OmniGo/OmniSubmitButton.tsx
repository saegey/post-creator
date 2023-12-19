import { Flex, Box, Button, Text, Spinner } from "theme-ui";
import React from "react";

import { getOmniResults } from "./../api";
import { PostContext } from "../../../PostContext";
import { ResultsContext } from "./../ResultsContext";

const OmniSubmitButton = () => {
  const { resultsUrl, omniMeta, setPreviewOmniResults } =
    React.useContext(ResultsContext);
  const { setOmniResults } = React.useContext(PostContext);
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

          getOmniResults({ url: resultsUrl, category }).then((r: any) => {
            console.log(r);
            setOmniResults &&
              setOmniResults({
                results: r.data as any,
                selected: undefined,
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
