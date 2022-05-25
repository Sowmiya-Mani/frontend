import React from "react";
import PropTypes from "prop-types";
import styles from "./ProfileNumber.module.scss";

function ProfileNumber({ category, number, onClick }) {
  return (
    <div
      className={styles.number}
      style={{ cursor: onClick && "pointer" }}
      onClick={onClick}
    >
      {number} {category}
    </div>
  );
}

ProfileNumber.propTypes = {
  category: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  onClick: PropTypes.func,
};

export default ProfileNumber;
