import React, { useState } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import PropTypes from "prop-types";
import styles from "./CategoryDropdown.module.scss";

function CategoryDropdown({ setCategory }) {
  const categories = [
    "All",
    "Electronics",
    "Man's Fashion",
    "Woman's fashion",
    "Entertainment",
    "Other",
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

  const onClick = (idx) => {
    setActive(idx);
    setCategory(categories[idx]);
  };

  return (
    <DropdownButton
      style={{ float: "right", marginRight: "1%" }}
      variant="outline-primary"
      align="end"
      id="dropdown-basic-button"
      title={
        <span>
          <i className="bi bi-tag"></i> Category
        </span>
      }
    >
      {categories.map((category, idx) => {
        return (
          <Dropdown.Item
            key={idx}
            onClick={() => onClick(idx)}
            className={
              active === 0
                ? styles["active-dropdown-item"]
                : styles["dropdown-item"]
            }
            style={getStyle(idx)}
          >
            {category}
          </Dropdown.Item>
        );
      })}
    </DropdownButton>
  );
}

CategoryDropdown.propTypes = {
  setCategory: PropTypes.func.isRequired,
};

export default CategoryDropdown;
