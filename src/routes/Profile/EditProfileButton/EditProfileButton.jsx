import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
// import styles from "./EditProfileButton.module.scss"

function EditProfileButton({ screenWidth, onClickHandler }) {
  return (
    <div>
      <Button onClick={onClickHandler} variant="outline-primary">
        <i className="bi bi-pencil-square"></i>
        {screenWidth > 500 && (
          <div style={{ display: "inline", marginLeft: "5px" }}>
            Edit profile
          </div>
        )}
      </Button>
    </div>
  );
}

EditProfileButton.propTypes = {
  screenWidth: PropTypes.number.isRequired,
  onClickHandler: PropTypes.func.isRequired,
};

export default EditProfileButton;
