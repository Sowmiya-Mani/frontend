import React from "react";
import PropTypes from "prop-types";
import getIcon from "./getIcon";
import styles from "./Tab.module.scss";

function Tab({ name, selected, onClick }) {
  return (
    <div
      style={{ marginLeft: "10px" }}
      onClick={onClick}
      className={`${selected ? styles["tab-selected"] : styles.tab}`}
    >
      <i
        className={`${getIcon(name)} ${styles.icon} ${
          selected && styles.selected
        }`}
        style={{ marginRight: "4px" }}
      ></i>
      <div className={`${selected && styles.selected}`}>{name}</div>
    </div>
  );
}

Tab.propTypes = {
  name: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Tab;
