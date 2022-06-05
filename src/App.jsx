import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";
import AuctionList from "./routes/AuctionList";
import Auction from "./routes/Auction";
import Profile from "./routes/Profile";
import NavigationBar from "./components/NavigationBar";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div>
      <NavigationBar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/auctions" exact element={<AuctionList />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/users/:id" exact element={<Profile />} />
        <Route path="/auction/:id" exact element={<Auction />} />
      </Routes>
    </div>
  );
}

export default App;
