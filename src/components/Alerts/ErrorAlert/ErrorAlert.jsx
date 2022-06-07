import React from "react";
import PropTypes from "prop-types";
import styles from "./ErrorAlert.module.scss";

function ErrorAlert({ message }) {
  return (
    <div className={styles.alert}>
      <i className={`bi bi-exclamation-circle ${styles.icon}`}></i>
      {message}
    </div>
  );
}

ErrorAlert.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorAlert;
