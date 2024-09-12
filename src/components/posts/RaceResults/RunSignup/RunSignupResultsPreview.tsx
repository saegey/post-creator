import React from "react";
import { Text, Box, Flex, Button, Spinner } from "theme-ui";
import { Transforms } from "slate";

import { usePost } from "../../../PostContext";
import { EditorContext } from "../../Editor/EditorContext";
import { CustomEditor } from "../../../../types/common";
import { ResultsContext } from "../ResultsContext";
import { saveRunSignupResults } from "../api";
import ResultsBox from "../shared/ResultsBox";

interface IObjectKeys {
  [key: string]: string | number | null;
}

export interface RunSignupResultType extends IObjectKeys {
  race_placement: number | null;
  name: string;
  city: string;
  state: string;
  chip_time: string;
}

const RunSignUpResultsPreview = ({ editor }: { editor: CustomEditor }) => {
  const [selectedRow, setSelectedRow] = React.useState<number | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = React.useState(false);

  const { runSignupResults, id, setPost } = usePost();
  const { setIsRaceResultsModalOpen, menuPosition } =
    React.useContext(EditorContext);
  const { runSignupMeta, resultsUrl, setPreviewRunSignupResults } =
    React.useContext(ResultsContext);

  const back = () => {
    setPreviewRunSignupResults(false);
  };

  const saveResults = async () => {
    setIsLoading(true);
    await saveRunSignupResults({
      results: runSignupResults?.results,
      id,
      category: runSignupMeta.category,
      categoryName: runSignupMeta.categoryName,
      resultsUrl: resultsUrl,
      eventName: runSignupMeta.eventName,
      selected: runSignupResults?.selected,
    });

    setPost({
      runSignupResults: {
        ...runSignupResults,
        results: runSignupResults?.results,
        eventName: runSignupMeta.eventName,
        category: runSignupMeta.category,
        categoryName: runSignupMeta.categoryName,
      },
      resultsUrl: resultsUrl,
    });

    Transforms.insertNodes(
      editor,
      {
        type: "runSignupResults",
        children: [{ text: "" }],
      },
      { at: menuPosition.path }
    );

    setIsLoading(false);
    setIsRaceResultsModalOpen(false);
  };

  const formatResults = () => {
    if (runSignupResults === undefined) {
      return;
    }
    const { results } = runSignupResults || {};
    const divisionId = results?.divisions[0].race_division_id;
    return {
      divisionId: divisionId,
      results: results?.resultSet.results.map((r, i) => {
        const resultObj: RunSignupResultType = {
          race_placement: null,
          name: "",
          city: "",
          state: "",
          chip_time: "",
        };
        results.headings.map((h, i1) => {
          resultObj[h.key as keyof RunSignupResultType] = r[i1];
        });
        return resultObj;
      }) as Array<RunSignupResultType>,
    };
  };

  return (
    <>
      <Box sx={{ marginY: "10px" }}>
        <Text as="h3">
          {runSignupMeta.eventName} - {runSignupMeta.categoryName}
        </Text>

        <Text>{resultsUrl}</Text>
      </Box>
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
        <Text
          as="span"
          sx={{ width: "100px", display: "flex", justifyContent: "right" }}
        >
          Time
        </Text>
      </Flex>

      <Box
        sx={{
          overflowY: "auto",
          height: ["60vh", "300px", "300px"],
          backgroundColor: "background",
          padding: "5px",
          borderRadius: "5px",
        }}
      >
        {runSignupResults && runSignupResults.results && (
          <ResultsBox>
            <>
              {formatResults()?.results.map((row, i) => {
                return (
                  <Flex
                    key={`race-result-row-${i}`}
                    sx={{
                      backgroundColor:
                        selectedRow === i ? "selectedBackground" : null,
                      color:
                        selectedRow === i ? "selectedBackgroundText" : null,
                      borderRadius: selectedRow === i ? "5px" : null,
                      width: "100%",
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor:
                          selectedRow === i ? "accent" : "border",
                        borderRadius: "5px",
                      },
                      paddingX: "5px",
                      paddingY: "2px",
                    }}
                    onClick={() => {
                      setSelectedRow(i);
                      setPost({
                        runSignupResults: {
                          ...runSignupResults,
                          selected:
                            runSignupResults && runSignupResults.results
                              ? formatResults()?.results[i]
                              : undefined,
                        },
                      });
                    }}
                  >
                    <Text as="span" sx={{ width: ["30px", "60px", "60px"] }}>
                      {row.race_placement}
                    </Text>
                    <Box sx={{ width: "300px", flexGrow: "2" }}>
                      <Text as="div">{row.name}</Text>
                      <Text
                        as="div"
                        sx={{ fontSize: "13px", minHeight: "13px" }}
                      >
                        {row.city} {row.state}
                      </Text>
                    </Box>
                    <Text
                      as="span"
                      sx={{
                        display: "flex",
                        justifyContent: "right",
                        width: "100px",
                      }}
                    >
                      {row.chip_time}
                    </Text>
                  </Flex>
                );
              })}
            </>
          </ResultsBox>
        )}
      </Box>

      <Box
        sx={{
          paddingTop: "15px",
          marginTop: "15px",
          borderTopColor: "border",
          borderTopStyle: "solid",
          borderTopWidth: "1px",
        }}
      >
        <Flex sx={{ justifyContent: "right", gap: "10px" }}>
          <Button variant="secondaryButton" onClick={() => back()}>
            Back
          </Button>
          <Button
            title="Save"
            sx={{
              marginLeft: "auto",
              pointer: "cursor",
              backgroundColor:
                selectedRow !== undefined && selectedRow >= 0
                  ? null
                  : "disabledBackground",
            }}
            disabled={
              selectedRow !== undefined && selectedRow >= 0 ? false : true
            }
            onClick={() => {
              saveResults();
            }}
            variant="primaryButton"
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

export default RunSignUpResultsPreview;
