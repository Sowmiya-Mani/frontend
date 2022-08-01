import { useState } from "react";

function usePagination() {
  const [page, setPage] = useState(1);
  const [exhausted, setExhausted] = useState(false);

  return {
    page,
    setPage,
    exhausted,
    setExhausted,
  };
}

export default usePagination;
