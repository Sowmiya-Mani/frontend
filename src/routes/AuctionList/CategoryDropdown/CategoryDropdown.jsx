import React, { useState, useEffect } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import PropTypes from "prop-types";
import styles from "./CategoryDropdown.module.scss";

function CategoryDropdown({ setCategory, offcanvas, category }) {
  const categories = [
    "All",
    "Electronics",
    "Man's Fashion",
    "Woman's fashion",
    "Entertainment",
    "Other",
  ];

  const [active, setActive] = useState(categories.indexOf(category));

  useEffect(() => {
    setActive(categories.indexOf(category));
  }, [category]);

  const getDropdownStyles = () => {
    if (offcanvas) {
      return {
        display: "inline",
      };
    }
    return {
      float: "right",
      marginRight: "1%",
    };
  };

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
      style={getDropdownStyles()}
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

CategoryDropdown.defaultProps = {
  offcanvas: false,
};

CategoryDropdown.propTypes = {
  offcanvas: PropTypes.bool,
  setCategory: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
};

export default CategoryDropdown;
