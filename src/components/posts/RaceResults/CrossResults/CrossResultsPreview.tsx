import React from "react";
import {
  Text,
  Box,
  Flex,
  Button,
  Spinner,
  ThemeUIStyleObject,
  Theme,
} from "theme-ui";
import { Transforms } from "slate";

import { PostContext } from "../../../PostContext";
import { EditorContext } from "../../Editor/EditorContext";
import { CustomEditor } from "../../../../types/common";
import { saveCrossResults } from "../api";
import { ResultsContext } from "../ResultsContext";

const CrossResultsPreview = ({ editor }: { editor: CustomEditor }) => {
  const [selectedRow, setSelectedRow] = React.useState<number>();
  const [isLoading, setIsLoading] = React.useState(false);

  const { crossResults, id, setPost } = React.useContext(PostContext);
  const { setIsRaceResultsModalOpen, menuPosition } =
    React.useContext(EditorContext);
  const { crossResultsMeta, setCrossResultsMeta, resultsUrl } =
    React.useContext(ResultsContext);

  return (
    <>
      <Box sx={{ marginY: "10px" } as ThemeUIStyleObject<Theme>}>
        <Text as="h3">
          {crossResultsMeta.eventName} - {crossResultsMeta.category}
        </Text>

        <Text>{resultsUrl}</Text>
      </Box>
      <Flex sx={{ width: "100%" } as ThemeUIStyleObject<Theme>}>
        <Text
          as="span"
          sx={
            {
              width: ["30px", "60px", "100px"],
              visibility: ["hidden", "visible", "visible"],
            } as ThemeUIStyleObject<Theme>
          }
        >
          Place
        </Text>
        <Text as="span" sx={{ width: "300px" } as ThemeUIStyleObject<Theme>}>
          Name
        </Text>
        <Flex
          sx={
            {
              width: "100%",
              justifyContent: "right",
            } as ThemeUIStyleObject<Theme>
          }
        >
          <Text as="span">Time</Text>
        </Flex>
      </Flex>
      <Box
        sx={
          {
            overflowY: "auto",
            height: ["80%", "300px", "300px"],
            borderRadius: "5px",
          } as ThemeUIStyleObject<Theme>
        }
      >
        {crossResults &&
          crossResults.results &&
          crossResults.results.map((row, i) => {
            return (
              <Flex
                key={`race-result-row-${i}`}
                sx={
                  {
                    backgroundColor:
                      selectedRow === i ? "selectedBackground" : null,
                    color: selectedRow === i ? "selectedBackgroundText" : null,
                    borderRadius: selectedRow === i ? "5px" : null,
                    width: "100%",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor:
                        selectedRow === i
                          ? "selectedBackground"
                          : "inputBorderColor",
                      borderRadius: "5px",
                    },
                    paddingX: "5px",
                    paddingY: "2px",
                  } as unknown as ThemeUIStyleObject<Theme>
                }
                onClick={() => {
                  if (selectedRow === i) {
                    setSelectedRow(undefined);
                    setPost({
                      crossResults: {
                        ...crossResults,
                        selected: undefined,
                      },
                    });
                  } else {
                    setSelectedRow(i);
                    setPost({
                      crossResults: {
                        ...crossResults!,
                        selected:
                          crossResults && crossResults.results
                            ? crossResults.results[i]
                            : undefined,
                      },
                    });
                  }
                }}
              >
                <Text
                  as="span"
                  sx={
                    {
                      width: ["30px", "60px", "60px"],
                    } as ThemeUIStyleObject<Theme>
                  }
                >
                  {row.Place}
                </Text>
                <Box
                  sx={
                    {
                      width: "300px",
                      flexGrow: "2",
                    } as ThemeUIStyleObject<Theme>
                  }
                >
                  <Text as="div">
                    {row.FirstName} {row.LastName}
                  </Text>
                  <Text
                    as="div"
                    sx={
                      {
                        fontSize: "13px",
                        minHeight: "13px",
                      } as ThemeUIStyleObject<Theme>
                    }
                  >
                    {row.TeamName}
                  </Text>
                </Box>
                <Text
                  as="span"
                  sx={
                    {
                      display: ["none", "inherit", "inherit"],
                    } as ThemeUIStyleObject<Theme>
                  }
                >
                  {/* {row.TeamName} */}
                </Text>
                <Text
                  as="span"
                  sx={
                    {
                      display: "flex",
                      justifyContent: "right",
                      width: "100px",
                    } as ThemeUIStyleObject<Theme>
                  }
                >
                  {row.RaceTime}
                </Text>
              </Flex>
            );
          })}
      </Box>
      <Box
        sx={
          {
            paddingTop: "15px",
            marginTop: "15px",
            borderTopColor: "divider",
            borderTopStyle: "solid",
            borderTopWidth: "1px",
          } as ThemeUIStyleObject<Theme>
        }
      >
        <Flex>
          <Button
            title="Save"
            sx={
              {
                marginLeft: "auto",
                backgroundColor: selectedRow ? null : "gray",
              } as ThemeUIStyleObject<Theme>
            }
            disabled={selectedRow ? false : true}
            onClick={() => {
              setIsLoading(true);
              crossResults &&
                saveCrossResults({
                  crossResults,
                  id,
                  resultsUrl,
                  eventName: crossResultsMeta.eventName,
                  category: crossResultsMeta.category,
                }).then(() => {
                  setCrossResultsMeta({
                    ...crossResultsMeta,
                    category: crossResultsMeta.category,
                  });

                  setPost({
                    crossResults: {
                      ...crossResults,
                      category: crossResultsMeta.category,
                      eventName: crossResultsMeta.eventName,
                    },
                  });

                  Transforms.insertNodes(
                    editor,
                    {
                      type: "crossResults",
                      children: [{ text: "" }],
                    },
                    { at: menuPosition.path }
                  );

                  setIsLoading(false);
                  setIsRaceResultsModalOpen(false);
                });
            }}
          >
            <Flex sx={{ gap: "10px" } as ThemeUIStyleObject<Theme>}>
              <Text as="span">Save</Text>
              {isLoading && (
                <Spinner
                  sx={
                    {
                      size: "20px",
                      color: "white",
                    } as ThemeUIStyleObject<Theme>
                  }
                />
              )}
            </Flex>
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default CrossResultsPreview;
