import React from "react";

import { ResultsContext } from "../ResultsContext";
import CategorySelect from "../shared/CategorySelect";

const OmniSelect = () => {
  const { omniMeta, setOmniMeta } = React.useContext(ResultsContext);

  const handleCategoryChange = (category: string) => {
    setOmniMeta({
      ...omniMeta,
      category,
    });
  };

  return (
    <CategorySelect
      label="Category"
      categories={Array.from(omniMeta.categories)}
      selectedCategory={omniMeta.category || ""}
      onCategoryChange={handleCategoryChange}
    />
  );
};

export default OmniSelect;
