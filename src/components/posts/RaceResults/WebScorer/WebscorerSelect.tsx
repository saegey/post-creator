import React from "react";

import { ResultsContext } from "../ResultsContext";
import CategorySelect from "../shared/CategorySelect";

const WebscorerSelect = () => {
  const { webScorerMeta, setWebScorerMeta } = React.useContext(ResultsContext);
  const { categories } = webScorerMeta;

  const handleCategoryChange = (value: string) => {
    setWebScorerMeta({
      ...webScorerMeta,
      category: value,
    });
  };

  return (
    <CategorySelect
      label="Category"
      categories={categories.map((c, i) => ({ value: c, label: c }))}
      selectedCategory={webScorerMeta.category || ""}
      onCategoryChange={handleCategoryChange}
      id="category"
    />
  );
};

export default WebscorerSelect;
