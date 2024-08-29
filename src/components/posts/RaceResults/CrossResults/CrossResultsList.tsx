import React from "react";
import {
  Box,
  Button,
  Flex,
  Link,
  Text,
  ThemeUIStyleObject,
  Theme,
} from "theme-ui";

import { CrossResultsPreviewType } from "../../../../types/common";

const CrossResultsList = ({
  raceResults,
  resultsUrl,
}: {
  raceResults: CrossResultsPreviewType | null | undefined;
  resultsUrl: string;
}) => {
  return (
    <>
      <Flex>
        <Flex sx={{ flexGrow: 1 } as ThemeUIStyleObject<Theme>}>
          <Text as="h2">Results</Text>
        </Flex>
        <Flex sx={{ justifyContent: "right" } as ThemeUIStyleObject<Theme>}>
          <Link target="_blank" href={resultsUrl}>
            <Button variant="primaryButton">Link to results</Button>
          </Link>
        </Flex>
      </Flex>
      <Text>
        {raceResults?.eventName} - {raceResults?.category}
      </Text>
      <Box
        sx={
          {
            height: "500px",
            overflowY: "scroll",
            paddingTop: "10px",
          } as ThemeUIStyleObject<Theme>
        }
      >
        {raceResults &&
          raceResults?.results?.map((row, i) => {
            return (
              <Flex
                key={`result-${i}`}
                sx={
                  {
                    paddingY: "2px",
                    paddingX: "5px",
                    backgroundColor:
                      `${row.FirstName} ${row.LastName}` ===
                      `${raceResults?.selected?.FirstName} ${raceResults?.selected?.LastName}`
                        ? "selectedBackground"
                        : null,
                    color:
                      `${row.FirstName} ${row.LastName}` ===
                      `${raceResults?.selected?.FirstName} ${raceResults?.selected?.LastName}`
                        ? "selectedBackgroundText"
                        : null,
                    borderRadius: "5px",
                    fontSize: ["15px", "16px", "16px"],
                    flexFlow: "row wrap",
                  } as ThemeUIStyleObject<Theme>
                }
              >
                <Text
                  as="span"
                  sx={{ width: "60px" } as ThemeUIStyleObject<Theme>}
                >
                  {row.Place}
                </Text>
                <Box sx={{ flexGrow: 2 } as ThemeUIStyleObject<Theme>}>
                  <Text as="span">
                    {row.FirstName} {row.LastName}
                  </Text>
                  <Text
                    as="span"
                    sx={
                      {
                        display: "block",
                        fontSize: "12px",
                        height: "15px",
                        flexGrow: 2,
                      } as ThemeUIStyleObject<Theme>
                    }
                  >
                    {row.TeamName ? row.TeamName : " "}
                  </Text>
                </Box>
                <Text
                  as="span"
                  sx={{ marginLeft: "15px" } as ThemeUIStyleObject<Theme>}
                ></Text>
                <Text
                  as="span"
                  sx={{ marginLeft: "15px" } as ThemeUIStyleObject<Theme>}
                >
                  {row.IsDnf === 1 ? "DNF" : row.RaceTime}
                </Text>
              </Flex>
            );
          })}
      </Box>
    </>
  );
};

export default CrossResultsList;
