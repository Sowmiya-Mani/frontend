import React from "react";
import PropTypes from "prop-types";
import styles from "./AuctionCardTag.module.scss";

function AuctionCardTag({ name }) {
  return <div className={styles[`${name}`]}>{name.toUpperCase()}</div>;
}

AuctionCardTag.propTypes = {
  name: PropTypes.string.isRequired,
};
export default AuctionCardTag;
