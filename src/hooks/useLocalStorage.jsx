import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useLocalStorage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);
}

export default useLocalStorage;
