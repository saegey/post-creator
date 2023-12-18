import React from "react";
import { Box, Flex, Text } from "theme-ui";

import { CrossResultsPreviewType, OmniResultType } from "../../PostContext";

const OmniResultsList = ({
  raceResults,
}: {
  raceResults: OmniResultType | undefined;
}) => {
  return (
    <>
      <Text
        as="h2"
        sx={{
          borderBottomColor: "dividerDark",
          borderBottomWidth: "1px",
          borderBottomStyle: "solid",
        }}
      >
        Results
      </Text>
      <Box sx={{ height: "500px", overflowY: "scroll", paddingTop: "10px" }}>
        {raceResults &&
          raceResults?.results?.map((row, i) => {
            return (
              <Flex
                key={`result-${i}`}
                sx={{
                  paddingY: "2px",
                  paddingX: "5px",
                  backgroundColor:
                    `${row.firstName} ${row.lastName}` ===
                    `${raceResults?.selected?.firstName} ${raceResults?.selected?.lastName}`
                      ? "selectedBackground"
                      : null,
                  color:
                    `${row.firstName} ${row.lastName}` ===
                    `${raceResults?.selected?.firstName} ${raceResults?.selected?.lastName}`
                      ? "selectedBackgroundText"
                      : null,
                  borderRadius: "5px",
                  fontSize: ["15px", "16px", "16px"],
                  // justifyContent: "space-around",
                  flexFlow: "row wrap",
                  // alignItems: "stretch",
                }}
              >
                <Text as="span" sx={{ width: "60px" }}>
                  {i + 1}
                </Text>
                <Box sx={{ flexGrow: 2 }}>
                  <Text as="span">
                    {row.firstName} {row.lastName}
                  </Text>
                  <Text
                    as="span"
                    sx={{
                      display: "block",
                      fontSize: "12px",
                      height: "15px",
                      flexGrow: 2,
                    }}
                  >
                    {row.team ? row.team : " "}
                  </Text>
                </Box>
                <Text as="span" sx={{ marginLeft: "15px" }}></Text>
                <Text as="span" sx={{ marginLeft: "15px" }}>
                  {row.timeFormattted}
                </Text>
              </Flex>
            );
          })}
      </Box>
    </>
  );
};

export default OmniResultsList;
