import React from "react";
import PropTypes from "prop-types";
import { Button, Offcanvas } from "react-bootstrap";
import CategoryDropdown from "../CategoryDropdown";
import SortDropdown from "../SortDropdown";
import PriceRange from "./PriceRange";
import styles from "./OptionsOffcanvas.module.scss";

function OptionsOffcanvas({
  show,
  setShow,
  setDirection,
  setSort,
  direction,
  setCategory,
  category,
  sort,
  from,
  setFrom,
  to,
  setTo,
}) {
  const handleClose = () => setShow(false);

  const handleReset = () => {
    setCategory("All");
    setSort("date_added");
    setDirection("-1");
    setFrom(0);
    setTo(10000);
  };

  return (
    <>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Options</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>
            <h1 className={styles.heading}>Choose a category:</h1>
            <hr />
            <CategoryDropdown
              setCategory={setCategory}
              offcanvas
              category={category}
            />
          </div>
          <div>
            <h1 className={styles.heading}>Choose sorting direction:</h1>
            <hr />
            <SortDropdown
              setDirection={setDirection}
              setSort={setSort}
              direction={direction}
              offcanvas
              sort={sort}
            />
          </div>
          <div className={styles["price-range"]}>
            <PriceRange
              label="Min price"
              min
              from={from}
              setFrom={setFrom}
              to={to}
              setTo={setTo}
            />
            <PriceRange
              label="Max price"
              from={from}
              setFrom={setFrom}
              to={to}
              setTo={setTo}
            />
          </div>

          <div className={styles["reset-button"]}>
            <Button variant="outline-primary" onClick={handleReset}>
              Reset
            </Button>
          </div>
          <div className={styles["close-button"]}>
            <Button variant="primary" onClick={handleClose}>
              Close
            </Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

OptionsOffcanvas.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  setDirection: PropTypes.func.isRequired,
  setSort: PropTypes.func.isRequired,
  sort: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
  setCategory: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  from: PropTypes.number.isRequired,
  setFrom: PropTypes.func.isRequired,
  to: PropTypes.number.isRequired,
  setTo: PropTypes.func.isRequired,
};

export default OptionsOffcanvas;
