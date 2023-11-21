import React from "react";
import { Text, Box, Flex, Button, Spinner } from "theme-ui";
import { GraphQLResult } from "@aws-amplify/api";
import { API } from "aws-amplify";
import { Transforms } from "slate";

import { PostContext } from "../../PostContext";
import { EditorContext } from "../Editor/EditorContext";
import { UpdatePostMutation } from "../../../API";
import { updatePost } from "../../../graphql/mutations";
import { CustomEditor, CustomElement } from "../../../types/common";

const WebscorerResultsPreview = ({ editor }: { editor: CustomEditor }) => {
  const [selectedRow, setSelectedRow] = React.useState<number>();
  const [isLoading, setIsLoading] = React.useState(false);

  const { webscorerResultPreview, id, setWebscorerResultPreview } =
    React.useContext(PostContext);
  const { setIsRaceResultsModalOpen } = React.useContext(EditorContext);

  const saveResults = async () => {
    try {
      const response = await API.graphql({
        authMode: "AMAZON_COGNITO_USER_POOLS",
        query: updatePost,
        variables: {
          input: {
            webscorerResults: JSON.stringify(webscorerResultPreview),
            raceResultsProvider: "webscorer",
            id: id,
          },
        },
      });
      return response;
    } catch (errors) {
      console.error(errors);
    }
  };

  return (
    <>
      <Box sx={{ overflowY: "auto", height: "300px" }}>
        <Flex sx={{ width: "100%", paddingX: "5px" }}>
          <Text as="span" sx={{ width: "60px" }}>
            Place
          </Text>
          <Text as="span" sx={{ width: "300px" }}>
            Name
          </Text>
          <Text as="span">Speed</Text>
          <Text as="span" sx={{ marginLeft: "auto" }}>
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
                <Text as="span" sx={{ width: "60px" }}>
                  {i + 1}
                </Text>
                <Text as="span" sx={{ width: "300px" }}>
                  {row.Name}
                </Text>
                <Text as="span">{row.Difference}</Text>
                <Text as="span" sx={{ marginLeft: "auto" }}>
                  {row.Time}
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
              saveResults().then((r) => {
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
