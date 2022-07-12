import React from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import styles from "./SortDropdown.module.scss";

function SortDropdown() {
  const onClick = () => {
    console.log("Clicks");
  };
  return (
    <DropdownButton
      style={{ float: "right", marginRight: "7.5%" }}
      variant="outline-primary"
      align="end"
      id="dropdown-basic-button"
      title={
        <span>
          <i className="bi bi-sort-down"></i> Sorting
        </span>
      }
    >
      <Dropdown.Item onClick={onClick} className={styles["dropdown-item"]}>
        <i className={`bi bi-cash ${styles.icon}`}></i>Initial Price
      </Dropdown.Item>
      <Dropdown.Item onClick={onClick} className={styles["dropdown-item"]}>
        <i className={`bi bi-card-checklist ${styles.icon}`}></i>Number of bids
      </Dropdown.Item>
      <Dropdown.Item onClick={onClick} className={styles["dropdown-item"]}>
        <i className={`bi bi-currency-dollar ${styles.icon}`}></i>Current price
      </Dropdown.Item>
      <Dropdown.Item onClick={onClick} className={styles["dropdown-item"]}>
        <i className={`bi bi-calendar-date ${styles.icon}`}></i>Date listed
      </Dropdown.Item>
    </DropdownButton>
  );
}

export default SortDropdown;
