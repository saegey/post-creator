import React from "react";

import { ResultsContext } from "../ResultsContext";
import CategorySelect from "../shared/CategorySelect";

const RunSignupSelect = () => {
  const { runSignupMeta, setRunSignupMeta } = React.useContext(ResultsContext);
  const { categories } = runSignupMeta;

  const handleCategoryChange = (value: string | number) => {
    const category = categories.find((c) => c.id === Number(value));
    if (category === undefined) {
      return;
    }

    setRunSignupMeta({
      ...runSignupMeta,
      category: category.id,
      categoryName: category.name,
    });
  };

  const options = categories.map((cat) => ({
    value: cat.id,
    label: `(${cat.year}) ${cat.name} - ${cat.category}`,
  }));

  return (
    <CategorySelect
      label="Category"
      categories={options}
      selectedCategory={runSignupMeta.category || ""}
      onCategoryChange={handleCategoryChange}
      id="category"
    />
  );
};

export default RunSignupSelect;
