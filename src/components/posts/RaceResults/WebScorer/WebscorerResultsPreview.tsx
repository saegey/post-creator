import React from "react";
import { Text, Box, Flex, Button, Spinner } from "theme-ui";
import { Transforms } from "slate";

import { PostContext } from "../../../PostContext";
import { EditorContext } from "../../Editor/EditorContext";
import { CustomEditor } from "../../../../types/common";
import { ResultsContext } from "../ResultsContext";
import { saveWebscorerResults } from "../api";
import ResultsBox from "../shared/ResultsBox";

const WebscorerResultsPreview = ({ editor }: { editor: CustomEditor }) => {
  const [selectedRow, setSelectedRow] = React.useState<number>();
  const [isLoading, setIsLoading] = React.useState(false);

  const { webscorerResultPreview, id, setWebscorerResultPreview } =
    React.useContext(PostContext);
  const { setIsRaceResultsModalOpen } = React.useContext(EditorContext);
  const { webScorerMeta, resultsUrl } = React.useContext(ResultsContext);

  return (
    <>
      <Text as="h3" sx={{ lineHeight: "40px" }}>
        {webScorerMeta.category}
      </Text>
      <Text>{resultsUrl}</Text>
      <ResultsBox>
        <>
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
            <Text as="span" sx={{ width: "300px" }}>
              Name
            </Text>
            <Text as="span" sx={{ display: ["none", "inherit", "inherit"] }}>
              Time Behind
            </Text>
            <Text
              as="span"
              sx={{ width: "100px", display: "flex", justifyContent: "right" }}
            >
              Time
            </Text>
          </Flex>
          {webscorerResultPreview &&
            webscorerResultPreview.results &&
            webscorerResultPreview.results.map((row, i) => {
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
                    paddingX: "5px",
                    paddingY: "2px",
                  }}
                  onClick={() => {
                    if (selectedRow === i) {
                      setSelectedRow(undefined);
                      setWebscorerResultPreview &&
                        setWebscorerResultPreview({
                          ...webscorerResultPreview,
                          selected: undefined,
                        });
                    } else {
                      setSelectedRow(i);
                      setWebscorerResultPreview &&
                        setWebscorerResultPreview({
                          ...webscorerResultPreview,
                          selected:
                            webscorerResultPreview &&
                            webscorerResultPreview.results
                              ? webscorerResultPreview.results[i]
                              : undefined,
                        });
                    }
                  }}
                >
                  <Text as="span" sx={{ width: ["30px", "60px", "60px"] }}>
                    {i + 1}
                  </Text>
                  <Box sx={{ width: "300px", flexGrow: "2" }}>
                    <Text as="div">{row.Name}</Text>
                    <Text as="div" sx={{ fontSize: "13px", minHeight: "13px" }}>
                      {row.TeamName ? row.TeamName : " "}
                    </Text>
                  </Box>
                  <Text
                    as="span"
                    sx={{ display: ["none", "inherit", "inherit"] }}
                  >
                    {row.Difference}
                  </Text>
                  <Text
                    as="span"
                    sx={{
                      display: "flex",
                      justifyContent: "right",
                      width: "100px",
                    }}
                  >
                    {row.Time}
                  </Text>
                </Flex>
              );
            })}
        </>
      </ResultsBox>
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
              saveWebscorerResults({
                webscorerResultPreview,
                id,
                category: webScorerMeta.category,
                resultsUrl: resultsUrl,
              }).then((r) => {
                Transforms.insertNodes(editor, [
                  {
                    type: "webscorerResults",
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

export default WebscorerResultsPreview;
