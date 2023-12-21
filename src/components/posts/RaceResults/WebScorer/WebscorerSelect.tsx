import { Box, Label, Select } from "theme-ui";
import { ResultsContext } from "../ResultsContext";
import React from "react";

const WebscorerSelect = () => {
  const { webScorerMeta, setWebScorerMeta } = React.useContext(ResultsContext);
  const { categories } = webScorerMeta;
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
            setWebScorerMeta({ ...webScorerMeta, category: e.target.value });
          }}
        >
          <option></option>
          {categories.map((c: string, i: number) => (
            <option key={`category-${i}`}>{c}</option>
          ))}
        </Select>
      </Box>
    </>
  );
};

export default WebscorerSelect;
