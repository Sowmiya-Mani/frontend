import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
// import styles from "./EditProfileButton.module.scss"

function RateSellerButton({ screenWidth, onClickHandler }) {
  return (
    <div>
      <Button onClick={onClickHandler} variant="outline-primary">
        <i className="bi bi-star"></i>
        {screenWidth > 500 && (
          <div style={{ display: "inline", marginLeft: "5px" }}>
            Rate this seller
          </div>
        )}
      </Button>
    </div>
  );
}

RateSellerButton.propTypes = {
  screenWidth: PropTypes.number.isRequired,
  onClickHandler: PropTypes.func.isRequired,
};

export default RateSellerButton;
