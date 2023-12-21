import { Box, Label, Select } from "theme-ui";
import React from "react";

import { ResultsContext } from "../ResultsContext";

const OmniSelect = () => {
  const { omniMeta, setOmniMeta } = React.useContext(ResultsContext);

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
            setOmniMeta({ ...omniMeta, category: e.target.value });
          }}
        >
          <option></option>
          {Array.from(omniMeta.categories).map((c: string, i: number) => (
            <option key={`category-${i}`}>{c}</option>
          ))}
        </Select>
      </Box>
    </>
  );
};

export default OmniSelect;
