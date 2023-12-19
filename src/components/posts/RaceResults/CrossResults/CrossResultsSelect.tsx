import { Box, Label, Select } from "theme-ui";
import React from "react";
import { ResultsContext } from "../ResultsContext";

const CrossResultsSelect = () => {
  const { setCrossResultsMeta, crossResultsMeta } =
    React.useContext(ResultsContext);

  const { categories } = crossResultsMeta;

  return (
    <Box>
      <Label htmlFor="url" variant="defaultLabel">
        Category
      </Label>
      <Select
        id="category"
        variant={"defaultInput"}
        onChange={(e) => {
          setCrossResultsMeta({
            ...crossResultsMeta,
            category: e.target.value,
          });
        }}
      >
        <option></option>
        {Array.from(categories).map((c: string, i: number) => (
          <option key={`category-${i}`}>{c}</option>
        ))}
      </Select>
    </Box>
  );
};

export default CrossResultsSelect;
