import { Box, Label, Select } from "theme-ui";
import React from "react";

import { ResultsContext } from "./../ResultsContext";

const RaceResultsSelect = () => {
  const { raceResultsMeta, setRaceResultsMeta } =
    React.useContext(ResultsContext);
  const { categories } = raceResultsMeta;

  return (
    <>
      <Box>
        <Label htmlFor="url" variant="defaultLabel">
          Category
        </Label>
        <Select
          id="category"
          variant={"defaultInput"}
          onChange={(e) => {
            setRaceResultsMeta({
              ...raceResultsMeta,
              category: e.target.value,
            });
          }}
        >
          <option></option>
          {categories.data?.filterValues.length > 0 &&
            categories.data?.filterValues[0]["Values"].map(
              (c: string, i: number) => (
                <option key={`category-${i}`}>{c}</option>
              )
            )}
        </Select>
      </Box>
      <Box>
        <Label htmlFor="url" variant="defaultLabel">
          Division
        </Label>
        <Select
          variant={"defaultInput"}
          onChange={(e) => {
            setRaceResultsMeta({
              ...raceResultsMeta,
              division: e.target.value,
            });
            // setDivision(e.target.value);
          }}
          id="division"
        >
          <option></option>
          {categories.data?.filterValues.length > 0 &&
            categories.data?.filterValues[1]["Values"].map(
              (c: string, i: number) => (
                <option key={`category-${i}`}>{c}</option>
              )
            )}
        </Select>
      </Box>
    </>
  );
};

export default RaceResultsSelect;
