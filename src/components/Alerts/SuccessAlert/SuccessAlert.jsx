import React from "react";
import PropTypes from "prop-types";
import styles from "./SuccessAlert.module.scss";

function SuccessAlert({ message }) {
  return (
    <div className={styles.alert}>
      <i className={`bi bi-check-circle ${styles.icon}`}></i>
      {message}
    </div>
  );
}

SuccessAlert.propTypes = {
  message: PropTypes.string.isRequired,
};

export default SuccessAlert;
