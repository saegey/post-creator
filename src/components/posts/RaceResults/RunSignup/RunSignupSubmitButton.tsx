import { Flex, Box, Button, Text, Spinner } from "theme-ui";
import React from "react";

import { getRunSignupResults } from "../api";
import { ResultsContext } from "../ResultsContext";
import { usePost } from "../../../PostContext";
import { NotificationContext } from "../../../NotificationContext";

const RunSignupSubmitButton = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { runSignupMeta, resultsUrl, setPreviewRunSignupResults } =
    React.useContext(ResultsContext);
  const { setPost } = usePost();
  const { setNotification } = React.useContext(NotificationContext);

  const getResults = async () => {
    console.log(runSignupMeta.category);
    setIsLoading(true);

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
    setIsLoading(false);
  };

  return (
    <Box sx={{ marginLeft: "auto" }}>
      <Button
        disabled={isLoading ? true : false}
        variant="primaryButton"
        onClick={() => {
          getResults()
            .catch((e) => {
              setNotification({
                message: "Failed to get race results",
                type: "Error",
              });
            })
            .then(() => setIsLoading(false));
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
