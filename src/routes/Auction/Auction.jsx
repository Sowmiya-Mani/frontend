import React from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

function Auction() {
  const { id } = useParams();
  return <div>{id}</div>;
}

Auction.propTypes = {
  id: PropTypes.number.isRequired,
};

export default Auction;
