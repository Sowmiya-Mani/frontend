import { useState } from "react";

function useSearch() {
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [sort, setSort] = useState("created_at");
  const [direction, setDirection] = useState("-1");

  return {
    searchResults,
    setSearchResults,
    search,
    setSearch,
    searching,
    setSearching,
    sort,
    setSort,
    direction,
    setDirection,
  };
}

export default useSearch;
