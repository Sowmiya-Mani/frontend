import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./SuccessAlert.module.scss";

function SuccessAlert({ message, setMessage }) {
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
      <i className={`bi bi-check-circle ${styles.icon}`}></i>
      {message}
    </div>
  );
}

SuccessAlert.propTypes = {
  message: PropTypes.string.isRequired,
  setMessage: PropTypes.func.isRequired,
};

export default SuccessAlert;
