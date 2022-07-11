import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";
import AuctionList from "./routes/AuctionList";
import Auction from "./routes/Auction";
import Profile from "./routes/Profile";
import NavigationBar from "./components/NavigationBar";
import useSocketio from "./hooks/useSocketio";
import useSearch from "./hooks/useSearch";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  useSocketio();
  const { search, setSearch, searchResults, setSearchResults, setSearching } =
    useSearch();

  return (
    <div>
      <NavigationBar
        search={search}
        setSearch={setSearch}
        setSearching={setSearching}
        setSearchResults={setSearchResults}
      />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route
          path="/auctions"
          exact
          element={
            <AuctionList search={search} searchResults={searchResults} />
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
