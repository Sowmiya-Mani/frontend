import React from "react";
import PropTypes from "prop-types";
import { Spinner } from "react-bootstrap";
import styles from "./Button.module.scss";

function Button({ onClick, value, disabled, color, loading, type }) {
  return (
    <button
      type={type}
      style={{
        backgroundColor: color === "primary" ? "var(--primary)" : color,
      }}
      className={styles["custom-button"]}
      disabled={disabled}
      onClick={onClick}
    >
      {value} {loading && <Spinner animation="border" size="sm" />}
    </button>
  );
}

Button.defaultProps = {
  loading: false,
  value: "",
  disabled: false,
  color: "primary",
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  color: PropTypes.string,
  loading: PropTypes.bool,
  type: PropTypes.string,
};

export default Button;
