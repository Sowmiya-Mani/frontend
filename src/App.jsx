import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";
import AuctionList from "./routes/AuctionList";
import Auction from "./routes/Auction";
import Profile from "./routes/Profile";
import NavigationBar from "./components/NavigationBar";
import useSearch from "./hooks/useSearch";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import useCategoryFilter from "./hooks/useCategoryFilter";
import usePriceRange from "./hooks/usePriceRange";
import usePagination from "./hooks/usePagination";

function App() {
  const {
    search,
    setSearch,
    searchResults,
    setSearchResults,
    setSearching,
    sort,
    setSort,
    direction,
    setDirection,
  } = useSearch();

  const { category, setCategory } = useCategoryFilter();
  const { from, setFrom, to, setTo } = usePriceRange();
  const { page, setPage, exhausted, setExhausted } = usePagination();

  return (
    <div>
      <NavigationBar
        search={search}
        setSearch={setSearch}
        setSearching={setSearching}
        setSearchResults={setSearchResults}
        sort={sort}
        direction={direction}
        setPage={setPage}
        setExhausted={setExhausted}
      />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route
          path="/auctions"
          exact
          element={
            <AuctionList
              search={search}
              searchResults={searchResults}
              sort={sort}
              setSort={setSort}
              direction={direction}
              setDirection={setDirection}
              category={category}
              setCategory={setCategory}
              to={to}
              setTo={setTo}
              from={from}
              setFrom={setFrom}
              setPage={setPage}
              page={page}
              setExhausted={setExhausted}
              exhausted={exhausted}
            />
          }
        />
        <Route path="/login" exact element={<Login />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/users/:id" exact element={<Profile />} />
        <Route path="/auction/:id" exact element={<Auction />} />
      </Routes>
    </div>
  );
}

export default App;
