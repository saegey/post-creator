import React from "react";

import { ResultsContext } from "../ResultsContext";
import CategorySelect from "../shared/CategorySelect";

const RaceResultsSelect = () => {
  const { raceResultsMeta, setRaceResultsMeta } =
    React.useContext(ResultsContext);
  const { categories } = raceResultsMeta;

  const handleCategoryChange = (category: string) => {
    setRaceResultsMeta({
      ...raceResultsMeta,
      category,
    });
  };

  const handleDivisionChange = (division: string) => {
    setRaceResultsMeta({
      ...raceResultsMeta,
      division,
    });
  };

  return (
    <>
      <CategorySelect
        label="Category"
        categories={categories.data?.filterValues[0]?.Values || []}
        selectedCategory={raceResultsMeta.category || ""}
        onCategoryChange={handleCategoryChange}
        id="category" // Ensure this id matches the label's htmlFor
      />
      <CategorySelect
        label="Division"
        categories={categories.data?.filterValues[1]?.Values || []}
        selectedCategory={raceResultsMeta.division || ""}
        onCategoryChange={handleDivisionChange}
        id="division" // Ensure this id matches the label's htmlFor
      />
    </>
  );
};

export default RaceResultsSelect;
