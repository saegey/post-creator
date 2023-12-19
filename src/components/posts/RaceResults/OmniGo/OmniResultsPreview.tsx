import React from "react";
import { Text, Box, Flex, Button, Spinner } from "theme-ui";
import { API } from "aws-amplify";
import { Transforms } from "slate";

import { PostContext } from "../../../PostContext";
import { EditorContext } from "../../Editor/EditorContext";
import { updatePost } from "../../../../graphql/mutations";
import { CustomEditor } from "../../../../types/common";
import { formatMillisecondsToHHMM } from "../../../../utils/time";
import { saveOmniResults } from "../api";
import { ResultsContext } from "../ResultsContext";

const OmniResultsPreview = ({ editor }: { editor: CustomEditor }) => {
  const [selectedRow, setSelectedRow] = React.useState<number>();
  const [isLoading, setIsLoading] = React.useState(false);

  const { omniResults, id, setOmniResults } = React.useContext(PostContext);
  const { setIsRaceResultsModalOpen } = React.useContext(EditorContext);
  const { omniMeta, resultsUrl } = React.useContext(ResultsContext);

  return (
    <>
      <Text as="h3" sx={{ lineHeight: "40px" }}>
        {omniMeta.category}
      </Text>
      <Text>{resultsUrl}</Text>
      <Box
        sx={{
          overflowY: "auto",
          height: ["80%", "300px", "300px"],
          backgroundColor: "activityOverviewBackgroundColor",
          padding: "5px",
          borderRadius: "5px",
        }}
      >
        <Flex sx={{ width: "100%" }}>
          <Text
            as="span"
            sx={{
              width: ["30px", "60px", "60px"],
              visibility: ["hidden", "visible", "visible"],
            }}
          >
            Place
          </Text>
          <Text as="span" sx={{ width: "300px", flexGrow: "2" }}>
            Name
          </Text>
          <Text
            as="span"
            sx={{
              display: ["none", "inherit", "flex"],
              width: "100px",
              justifyContent: "right",
            }}
          >
            Time Behind
          </Text>
          <Text
            as="span"
            sx={{ width: "100px", display: "flex", justifyContent: "right" }}
          >
            Time
          </Text>
        </Flex>
        {omniResults &&
          omniResults.results &&
          omniResults.results.map((row, i) => {
            return (
              <Flex
                key={`race-result-row-${i}`}
                sx={{
                  backgroundColor:
                    selectedRow === i ? "selectedBackground" : null,
                  color: selectedRow === i ? "selectedBackgroundText" : null,
                  borderRadius: selectedRow === i ? "5px" : null,
                  width: "100%",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor:
                      selectedRow === i ? "selectedBackground" : "muted",
                    borderRadius: "5px",
                  },
                  // paddingX: "5px",
                  paddingY: "2px",
                }}
                onClick={() => {
                  if (selectedRow === i) {
                    setSelectedRow(undefined);
                    setOmniResults &&
                      setOmniResults({
                        ...omniResults,
                        selected: undefined,
                      });
                  } else {
                    setSelectedRow(i);
                    setOmniResults &&
                      setOmniResults({
                        ...omniResults,
                        selected:
                          omniResults && omniResults.results
                            ? omniResults.results[i]
                            : undefined,
                      });
                  }
                }}
              >
                <Text as="span" sx={{ width: ["30px", "60px", "60px"] }}>
                  {i + 1}
                </Text>
                <Box sx={{ width: "300px", flexGrow: "2" }}>
                  <Text as="div">
                    {row.firstName} {row.lastName}
                  </Text>
                  <Text as="div" sx={{ fontSize: "13px", minHeight: "13px" }}>
                    {row.team}
                  </Text>
                </Box>
                <Text
                  as="span"
                  sx={{ display: ["none", "inherit", "inherit"] }}
                >
                  {omniResults.results &&
                    formatMillisecondsToHHMM(
                      row.totalTime - omniResults.results[0].totalTime
                    )}
                </Text>
                <Text
                  as="span"
                  sx={{
                    display: "flex",
                    justifyContent: "right",
                    width: "100px",
                  }}
                >
                  {row.timeFormattted}
                </Text>
              </Flex>
            );
          })}
      </Box>
      <Box
        sx={{
          paddingTop: "15px",
          marginTop: "15px",
          borderTopColor: "divider",
          borderTopStyle: "solid",
          borderTopWidth: "1px",
        }}
      >
        <Flex>
          <Button
            title="Save"
            sx={{
              marginLeft: "auto",
              backgroundColor: selectedRow ? null : "gray",
            }}
            disabled={selectedRow ? false : true}
            onClick={() => {
              setIsLoading(true);
              saveOmniResults({
                omniResults,
                resultsUrl,
                category: omniMeta.category,
                id: id ? id : "",
              }).then(() => {
                Transforms.insertNodes(editor, [
                  {
                    type: "omniResults",
                    children: [{ text: "" }],
                  },
                  {
                    type: "paragraph",
                    children: [{ text: "" }],
                  },
                ]);

                setIsLoading(false);
                setIsRaceResultsModalOpen(false);
              });
            }}
          >
            <Flex sx={{ gap: "10px" }}>
              <Text as="span">Save</Text>
              {isLoading && <Spinner sx={{ size: "20px", color: "white" }} />}
            </Flex>
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default OmniResultsPreview;
