import { useState } from "react";

function useCategoryFilter() {
  const [category, setCategory] = useState("All");

  return {
    category,
    setCategory,
  };
}

export default useCategoryFilter;
