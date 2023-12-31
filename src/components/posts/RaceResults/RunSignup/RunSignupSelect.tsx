import { Box, Label, Select } from "theme-ui";
import { ResultsContext } from "../ResultsContext";
import React from "react";

const RunSignupSelect = () => {
  const { runSignupMeta, setRunSignupMeta } = React.useContext(ResultsContext);
  const { categories } = runSignupMeta;
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
            console.log(e.target);
            setRunSignupMeta({ ...runSignupMeta, category: e.target.value });
          }}
        >
          <option></option>
          {categories.map((cat) => (
            <option key={`category-${cat.id}`} value={cat.id}>
              {`(${cat.year}) ${cat.name} - ${cat.category}`}
            </option>
          ))}
        </Select>
      </Box>
    </>
  );
};

export default RunSignupSelect;
