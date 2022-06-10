import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./ErrorAlert.module.scss";

function ErrorAlert({ message, setMessage }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      setMessage("");
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className={styles.alert}>
      <i className={`bi bi-exclamation-circle ${styles.icon}`}></i>
      {message}
    </div>
  );
}

ErrorAlert.propTypes = {
  message: PropTypes.string.isRequired,
  setMessage: PropTypes.func.isRequired,
};

export default ErrorAlert;
