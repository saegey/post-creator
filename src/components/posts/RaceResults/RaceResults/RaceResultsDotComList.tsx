import React from "react";
import { Box, Button, Flex, Link, Text } from "theme-ui";

import { useUnits } from "../../../UnitProvider";
import { RaceResultRow } from "../../../../types/common";

const RaceResultsDotComList = ({
  raceResults,
  resultsUrl,
}: {
  raceResults: RaceResultRow | undefined;
  resultsUrl: string;
}) => {
  const { unitOfMeasure } = useUnits();
  return (
    <>
      <Flex sx={{ flexGrow: 1 }}>
        <Text as="h2" sx={{ fontSize: ["16px", "20px", "20px"] }}>
          Results
        </Text>
      </Flex>

      <Link href={resultsUrl} target="_blank" sx={{ color: "text" }}>
        <Text>{`${raceResults?.eventName} - ${raceResults?.category}`}</Text>
      </Link>
      <Box
        sx={{
          height: "500px",
          overflowY: "scroll",
          paddingTop: "10px",
          marginTop: "10px",
          borderTopWidth: "1px",
          borderTopStyle: "solid",
          borderTopColor: "postCardBorderDark",
        }}
      >
        {raceResults &&
          raceResults?.results?.map((row, i) => {
            return (
              <Flex
                key={`result-${i}`}
                sx={{
                  paddingY: "2px",
                  paddingX: "5px",
                  backgroundColor:
                    row.Name === raceResults?.selected?.Name
                      ? "selectedBackground"
                      : null,
                  color:
                    row.Name === raceResults?.selected?.Name
                      ? "selectedBackgroundText"
                      : null,
                  borderRadius: "5px",
                  fontSize: ["15px", "16px", "16px"],
                }}
              >
                <Text as="span" sx={{ width: ["30px", "60px", "60px"] }}>
                  {row.CatPlace}
                </Text>
                <Box sx={{ width: "300px" }}>
                  <Text as="div">{row.Name}</Text>
                  <Text as="div" sx={{ fontSize: "13px", minHeight: "13px" }}>
                    {row.Team ? row.Team : " "}
                  </Text>
                </Box>
                {/* <Text as="span">
                  {unitOfMeasure === "imperial"
                    ? row.Speed
                    : row.Speed !== "" &&
                      row.Speed !== null &&
                      row.Speed !== undefined
                    ? `${(Number(row.Speed.split(" ")[0]) * 1.60934).toFixed(
                        2
                      )} km/h`
                    : ""}
                </Text> */}
                <Text as="span" sx={{ marginLeft: "auto" }}>
                  {row.Time}
                </Text>
              </Flex>
            );
          })}
      </Box>
    </>
  );
};

export default RaceResultsDotComList;
