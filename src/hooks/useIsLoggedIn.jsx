function useIsLoggedIn() {
  if (localStorage.getItem("token")) {
    return true;
  }
  return false;
}

export default useIsLoggedIn;
