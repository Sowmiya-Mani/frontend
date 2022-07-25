import { useState } from "react";

function usePriceRange() {
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(10000);

  return { from, setFrom, to, setTo };
}

export default usePriceRange;
