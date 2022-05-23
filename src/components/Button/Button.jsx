import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.scss";

function Button({ onClick, value, disabled, color }) {
  return (
    <button
      style={{
        backgroundColor: color === "primary" ? "var(--primary)" : color,
      }}
      className={styles["custom-button"]}
      disabled={disabled}
      onClick={onClick}
    >
      {value}
    </button>
  );
}

Button.defaultProps = {
  value: "",
  disabled: false,
  color: "primary",
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  color: PropTypes.string,
};

export default Button;
