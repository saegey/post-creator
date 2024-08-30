import React from "react";

import { ResultsContext } from "../ResultsContext";
import CategorySelect from "../shared/CategorySelect";

const CrossResultsSelect = () => {
  const { setCrossResultsMeta, crossResultsMeta } =
    React.useContext(ResultsContext);

  const handleCategoryChange = (category: string) => {
    setCrossResultsMeta({
      ...crossResultsMeta,
      category,
    });
  };

  return (
    <CategorySelect
      label="Category"
      categories={Array.from(crossResultsMeta.categories)}
      selectedCategory={crossResultsMeta.category || ""}
      onCategoryChange={handleCategoryChange}
    />
  );
};

export default CrossResultsSelect;
