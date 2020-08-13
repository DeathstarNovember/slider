/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import theme from "../utils/theme";

type CategoryTabsProps = {
  categories: string[];
  currentCategory: string | undefined;
  setCurrentCategory: (arg: string | undefined) => void;
};

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  currentCategory,
  setCurrentCategory,
}) => {
  const clearCategory = () => {
    setCurrentCategory(undefined);
  };
  const selectCategory = (category: string) => {
    if (category === currentCategory) {
      clearCategory();
    }
    setCurrentCategory(category);
  };
  const categoriesForDisplay = ["All", ...categories];
  return (
    <div
      sx={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {categoriesForDisplay.map((category, categoryIndex) => (
        <div
          key={`categoryTab${categoryIndex}`}
          onClick={
            category === "All" ? clearCategory : () => selectCategory(category)
          }
          sx={{
            cursor: "pointer",
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color:
              currentCategory === category ? theme.colors.secondary : undefined,
          }}
        >
          <div> {category} </div>
        </div>
      ))}
    </div>
  );
};
