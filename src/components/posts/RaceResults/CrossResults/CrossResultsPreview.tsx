import React from "react";
import { Text, Box, Flex, Button, Spinner } from "theme-ui";
import { Transforms } from "slate";

import { PostContext } from "../../../PostContext";
import { EditorContext } from "../../Editor/EditorContext";
import { CustomEditor, CustomElement } from "../../../../types/common";
import { saveCrossResults } from "../api";
import { ResultsContext } from "../ResultsContext";

const CrossResultsPreview = ({ editor }: { editor: CustomEditor }) => {
  const [selectedRow, setSelectedRow] = React.useState<number>();
  const [isLoading, setIsLoading] = React.useState(false);

  const { crossResults, id, setCrossResults } = React.useContext(PostContext);
  const { setIsRaceResultsModalOpen } = React.useContext(EditorContext);
  const { crossResultsMeta, resultsUrl } = React.useContext(ResultsContext);

  return (
    <>
      <Text as="h3" sx={{ lineHeight: "40px" }}>
        {crossResultsMeta.category}
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
              width: ["30px", "60px", "100px"],
              visibility: ["hidden", "visible", "visible"],
            }}
          >
            Place
          </Text>
          <Text as="span" sx={{ width: "300px" }}>
            Name
          </Text>
          <Flex sx={{ width: "100%", justifyContent: "right" }}>
            <Text as="span">Time</Text>
          </Flex>
        </Flex>
        {crossResults &&
          crossResults.results &&
          crossResults.results.map((row, i) => {
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
                    setCrossResults &&
                      setCrossResults({
                        ...crossResults,
                        selected: undefined,
                      });
                  } else {
                    setSelectedRow(i);
                    setCrossResults &&
                      setCrossResults({
                        ...crossResults,
                        selected:
                          crossResults && crossResults.results
                            ? crossResults.results[i]
                            : undefined,
                      });
                  }
                }}
              >
                <Text as="span" sx={{ width: ["30px", "60px", "60px"] }}>
                  {row.Place}
                </Text>
                <Box sx={{ width: "300px", flexGrow: "2" }}>
                  <Text as="div">
                    {row.FirstName} {row.LastName}
                  </Text>
                  <Text as="div" sx={{ fontSize: "13px", minHeight: "13px" }}>
                    {row.TeamName}
                  </Text>
                </Box>
                <Text
                  as="span"
                  sx={{ display: ["none", "inherit", "inherit"] }}
                >
                  {/* {row.TeamName} */}
                </Text>
                <Text
                  as="span"
                  sx={{
                    display: "flex",
                    justifyContent: "right",
                    width: "100px",
                  }}
                >
                  {row.RaceTime}
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
              saveCrossResults({
                crossResults,
                id,
                resultsUrl,
                category: crossResultsMeta.category,
              }).then((r) => {
                Transforms.insertNodes(editor, [
                  {
                    type: "crossResults",
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

export default CrossResultsPreview;
