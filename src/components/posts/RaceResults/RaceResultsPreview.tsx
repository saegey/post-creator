import React from "react";
import { Text, Box, Flex, Button, Spinner } from "theme-ui";
import { GraphQLResult } from "@aws-amplify/api";
import { API } from "aws-amplify";
import { Transforms, Descendant } from "slate";

import { PostContext } from "../../PostContext";
import { EditorContext } from "../Editor/EditorContext";
import { UpdatePostMutation } from "../../../API";
import { updatePost } from "../../../graphql/mutations";
import { CustomEditor } from "../../../types/common";

const RaceResultsPreview = ({ editor }: { editor: CustomEditor }) => {
  const [selectedRow, setSelectedRow] = React.useState<number>();
  const [isLoading, setIsLoading] = React.useState(false);

  const { raceResults, id, setRaceResults } = React.useContext(PostContext);
  const { setIsRaceResultsModalOpen } = React.useContext(EditorContext);

  const saveResults = async () => {
    try {
      const response = await API.graphql({
        authMode: "AMAZON_COGNITO_USER_POOLS",
        query: updatePost,
        variables: {
          input: {
            raceResults: JSON.stringify(raceResults),
            raceResultsProvider: "myraceresults",
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
      <Box
        sx={{
          overflowY: "auto",
          height: ["80%", "300px", "300px"],
          backgroundColor: "activityOverviewBackgroundColor",
          padding: "5px",
          borderRadius: "5px",
        }}
        id="race-results-list"
      >
        <Flex sx={{ width: "100%", paddingX: "5px" }}>
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
          <Text as="span" sx={{ display: ["none", "inherit", "inherit"] }}>
            Speed
          </Text>
          <Text
            as="span"
            sx={{ width: "100px", display: "flex", justifyContent: "right" }}
          >
            Time
          </Text>
        </Flex>
        {raceResults &&
          raceResults.results &&
          raceResults.results.map((row, i) => {
            return (
              <Flex
                id={`race-result-row-${i}`}
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
                    setRaceResults &&
                      setRaceResults({
                        ...raceResults,
                        selected: undefined,
                      });
                  } else {
                    setSelectedRow(i);
                    setRaceResults &&
                      setRaceResults({
                        ...raceResults,
                        selected:
                          raceResults && raceResults.results
                            ? raceResults.results[i]
                            : undefined,
                      });
                  }
                }}
              >
                <Text as="span" sx={{ width: ["30px", "60px", "60px"] }}>
                  {row.CatPlace}
                </Text>
                <Text as="span" sx={{ width: "300px", flexGrow: "2" }}>
                  {row.Name}
                </Text>
                <Text
                  as="span"
                  sx={{ display: ["none", "inherit", "inherit"] }}
                >
                  {row.Speed}
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
                    type: "raceResultsDotCom",
                    children: [{ text: "" }],
                  } as Descendant,
                  { type: "text", children: [{ text: "" }] } as Descendant,
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

export default RaceResultsPreview;
