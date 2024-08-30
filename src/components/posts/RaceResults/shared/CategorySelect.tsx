import React from "react";
import { Box, Label, Select } from "theme-ui";

interface CategorySelectProps {
  label: string;
  categories: string[] | Array<{ label: string; value: string | number }>;
  selectedCategory: string | number;
  onCategoryChange: (category: string) => void;
  id?: string; // Add an optional id prop
}

const CategorySelect: React.FC<CategorySelectProps> = ({
  label,
  categories,
  selectedCategory,
  onCategoryChange,
  id = "category", // Default to "category" if no id is provided
}) => {
  return (
    <Box>
      <Label htmlFor={id} variant="defaultLabel">
        {label}
      </Label>
      <Select
        id={id}
        variant="defaultInput"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value=""></option>
        {categories.map((category, index) => (
          <option
            key={`${id}-${index}`}
            value={typeof category === "string" ? category : category?.value}
          >
            {typeof category === "string" ? category : category?.label}
          </option>
        ))}
      </Select>
    </Box>
  );
};

export default CategorySelect;
