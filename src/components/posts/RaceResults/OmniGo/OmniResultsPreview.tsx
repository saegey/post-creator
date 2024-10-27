import React from "react";
import { Text, Box, Flex } from "theme-ui";
import { Transforms } from "slate";

import { usePost } from "../../../PostContext";
import { EditorContext } from "../../Editor/EditorContext";
import { CustomEditor } from "../../../../types/common";
import { saveOmniResults } from "../api";
import { ResultsContext } from "../ResultsContext";
import Button from "../../../shared/Button";

const OmniResultsPreview = ({ editor }: { editor: CustomEditor }) => {
  const [selectedRow, setSelectedRow] = React.useState<number | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = React.useState(false);

  const { omniResults, id, setPost } = usePost();
  const { setIsRaceResultsModalOpen, menuPosition } =
    React.useContext(EditorContext);
  const { omniMeta, resultsUrl } = React.useContext(ResultsContext);

  const handleRowSelection = (index: number) => {
    if (selectedRow === index) {
      setSelectedRow(undefined);
      setPost({
        omniResults: {
          ...omniResults,
          selected: undefined,
          category: omniResults?.category || "",
          eventName: omniResults?.eventName || "",
        },
      });
    } else {
      setSelectedRow(index);
      setPost({
        omniResults: {
          ...omniResults,
          selected: omniResults?.results
            ? omniResults.results[index]
            : undefined,
          category: omniResults?.category || "",
          eventName: omniResults?.eventName || "",
        },
      });
    }
  };

  const handleSaveResults = async () => {
    setIsLoading(true);
    try {
      await saveOmniResults({
        omniResults,
        resultsUrl,
        category: omniMeta.category,
        eventName: omniMeta.eventName,
        id: id || "",
      });

      setPost({
        omniResults: {
          ...omniResults,
          category: omniMeta.category,
          eventName: omniMeta.eventName,
        },
        resultsUrl,
      });

      Transforms.insertNodes(
        editor,
        {
          type: "raceResults",
          subType: "omniResults",
          children: [{ text: "" }],
        },
        { at: menuPosition.path }
      );

      setIsRaceResultsModalOpen(false);
    } catch (error) {
      console.error("Error saving omni results:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Box sx={{ marginY: "10px" }}>
        <Text as="h3">
          {omniMeta.eventName} - {omniMeta.category}
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
        <Text as="span" sx={{ width: "300px", flexGrow: "2" }}>
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
          height: ["80%", "300px", "300px"],
          backgroundColor: "background",
          padding: "5px",
          borderRadius: "5px",
        }}
      >
        {omniResults?.results?.map((row, i) => (
          <Flex
            key={`race-result-row-${i}`}
            sx={{
              backgroundColor: selectedRow === i ? "surface" : null,
              color: "text",
              borderRadius: selectedRow === i ? "5px" : null,
              width: "100%",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "surface",
                borderRadius: "5px",
              },
              paddingY: "2px",
            }}
            onClick={() => handleRowSelection(i)}
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
              sx={{
                display: "flex",
                justifyContent: "right",
                width: "100px",
              }}
            >
              {row.totalTime > 0 ? row.timeFormattted : "DNF"}
            </Text>
          </Flex>
        ))}
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
        <Flex>
          <Button
            title="Save"
            disabled={selectedRow === undefined}
            loading={isLoading}
            onClick={handleSaveResults}
          >
            Save
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default OmniResultsPreview;
