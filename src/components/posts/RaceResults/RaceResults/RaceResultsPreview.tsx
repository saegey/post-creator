import React from "react";
import { Text, Box, Flex, Button, Spinner } from "theme-ui";
import { Transforms, Path } from "slate";

import { usePost } from "../../../PostContext";
import { EditorContext } from "../../Editor/EditorContext";
import { saveMyRaceResults } from "../api";
import { ResultsContext } from "../ResultsContext";
import { useSlateContext } from "../../../SlateContext";

const RaceResultsPreview = ({ path }: { path: Path }) => {
  const [selectedRow, setSelectedRow] = React.useState<number | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = React.useState(false);

  const { raceResults, id, setPost } = usePost();
  const {
    setIsRaceResultsModalOpen,
    setMobileMenu,
    mobileMenu,
    setIsNewComponentMenuOpen,
    menuPosition,
  } = React.useContext(EditorContext);
  const { raceResultsMeta, resultsUrl } = React.useContext(ResultsContext);
  const { editor } = useSlateContext();

  if (!editor) {
    throw new Error("Editor is not defined");
  }

  return (
    <Flex
      sx={{
        flexDirection: "column",
        height: ["calc(100dvh - 120px)", "auto", "auto"],
        maxHeight: ["100dvh", "500px", "500px"],
      }}
    >
      <Flex sx={{ marginY: "10px", flexDirection: "column" }}>
        <Text as="h3">
          {raceResultsMeta.eventName} - {raceResultsMeta.category}
        </Text>
        <Text>{resultsUrl}</Text>
      </Flex>
      <Flex
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          backgroundColor: "background",
          padding: "5px",
          borderRadius: "5px",
        }}
      >
        <Box
          sx={{
            width: "100%",
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
                      backgroundColor: selectedRow === i ? "accent" : "border",
                      borderRadius: "5px",
                    },
                    paddingX: "5px",
                    paddingY: "2px",
                  }}
                  onClick={() => {
                    setSelectedRow(i);
                    setPost({
                      raceResults: {
                        ...raceResults,
                        selected:
                          raceResults && raceResults.results
                            ? raceResults.results[i]
                            : undefined,
                      },
                    });
                  }}
                >
                  <Text as="span" sx={{ width: ["30px", "60px", "60px"] }}>
                    {row.CatRank}
                  </Text>
                  <Box sx={{ width: "300px", flexGrow: "2" }}>
                    <Text as="div">{row.Name}</Text>
                    <Text as="div" sx={{ fontSize: "13px", minHeight: "13px" }}>
                      {row.Team ? row.Team : " "}
                    </Text>
                  </Box>
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
      </Flex>
      <Flex
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
              setIsLoading(true);
              saveMyRaceResults({
                raceResults,
                id,
                resultsUrl,
                category: raceResultsMeta.category,
                division: raceResultsMeta.division,
              }).then((r) => {
                setPost({
                  resultsUrl: resultsUrl,
                });

                Transforms.insertNodes(
                  editor,
                  {
                    type: "raceResults",
                    subType: "raceResultsDotCom",
                    children: [{ text: "" }],
                  },
                  { at: menuPosition.path }
                );

                if (path.length > 1) {
                  Transforms.liftNodes(editor);
                }
                setIsLoading(false);
                setIsRaceResultsModalOpen(false);
                setMobileMenu({
                  ...mobileMenu,
                  display: false,
                  isFullScreen: false,
                });
                const selection = window.getSelection();
                selection && selection.removeAllRanges();
                setIsNewComponentMenuOpen(false);
              });
            }}
          >
            <Flex sx={{ gap: "10px" }}>
              <Text as="span">Save</Text>
              {isLoading && <Spinner sx={{ size: "20px", color: "white" }} />}
            </Flex>
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default RaceResultsPreview;
