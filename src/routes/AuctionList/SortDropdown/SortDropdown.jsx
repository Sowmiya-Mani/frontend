import React, { useState } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import PropTypes from "prop-types";
import styles from "./SortDropdown.module.scss";

function SortDropdown({ direction, setDirection, setSort }) {
  const sortings = [
    "initial_price",
    "bid_count",
    "current_price",
    "date_added",
  ];
  const [active, setActive] = useState(0);

  const getStyle = (id) => {
    if (id === active) {
      return {
        backgroundColor: "var(--bs-primary)",
        color: "white",

        "&:hover": {
          color: "blue !important",
        },
      };
    }
    return;
  };

  const onClick = (sortBy) => {
    if (direction === "-1") {
      setDirection("1");
    } else {
      setDirection("-1");
    }
    setSort(sortBy);
    setActive(sortings.indexOf(sortBy));
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
      <Dropdown.Item
        onClick={() => onClick("initial_price")}
        className={
          active === 0
            ? styles["active-dropdown-item"]
            : styles["dropdown-item"]
        }
        style={getStyle(0)}
      >
        <i className={`bi bi-cash ${styles.icon}`}></i>
        Initial Price
      </Dropdown.Item>
      <Dropdown.Item
        onClick={() => onClick("bid_count")}
        className={
          active === 1
            ? styles["active-dropdown-item"]
            : styles["dropdown-item"]
        }
        style={getStyle(1)}
      >
        <i className={`bi bi-card-checklist ${styles.icon}`}></i>Number of bids
      </Dropdown.Item>
      <Dropdown.Item
        onClick={() => onClick("current_price")}
        className={
          active === 2
            ? styles["active-dropdown-item"]
            : styles["dropdown-item"]
        }
        style={getStyle(2)}
      >
        <i className={`bi bi-currency-dollar ${styles.icon}`}></i>Current price
      </Dropdown.Item>
      <Dropdown.Item
        onClick={() => onClick("date_added")}
        className={
          active === 3
            ? styles["active-dropdown-item"]
            : styles["dropdown-item"]
        }
        style={getStyle(3)}
      >
        <i className={`bi bi-calendar-date ${styles.icon}`}></i>Date listed
      </Dropdown.Item>
    </DropdownButton>
  );
}

SortDropdown.propTypes = {
  setSort: PropTypes.func.isRequired,
  setDirection: PropTypes.func.isRequired,
  direction: PropTypes.string.isRequired,
};

export default SortDropdown;
