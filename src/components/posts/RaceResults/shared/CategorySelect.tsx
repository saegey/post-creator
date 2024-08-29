import React from "react";
import { Box, Label, Select } from "theme-ui";

interface CategorySelectProps {
  label: string;
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({
  label,
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <Box>
      <Label htmlFor="category" variant="defaultLabel">
        {label}
      </Label>
      <Select
        id="category"
        variant={"defaultInput"}
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value=""></option>
        {categories.map((category, index) => (
          <option key={`category-${index}`} value={category}>
            {category}
          </option>
        ))}
      </Select>
    </Box>
  );
};

export default CategorySelect;
