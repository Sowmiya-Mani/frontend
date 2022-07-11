import { useState } from "react";

function useSearch() {
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  return {
    searchResults,
    setSearchResults,
    search,
    setSearch,
    searching,
    setSearching,
  };
}

export default useSearch;
