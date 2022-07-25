import React from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";
import styles from "./PriceRange.module.scss";

function PriceRange({ label, min, from, setFrom, to, setTo }) {
  const maxValue = 10000;
  const minValue = 10;
  let step = (maxValue - minValue) / 100;

  const onChangeHandler = (e) => {
    console.log(e.target.value);
    if (e.target.value === "100") {
      setTo(maxValue);
      return;
    }

    if (min) {
      setFrom(step * e.target.value);
    } else {
      setTo(step * e.target.value);
    }
  };

  const getMaxText = () => {
    if (to === 10000) {
      return "10000+";
    } else {
      return parseInt(to);
    }
  };

  return (
    <>
      <Form.Label>
        {label} Value: {min ? parseInt(from) : getMaxText()}
      </Form.Label>
      <Form.Range
        value={min ? parseInt(from / step) : parseInt(to / step)}
        className={styles["custom-slider"]}
        onChange={onChangeHandler}
      />
    </>
  );
}

PriceRange.defaultProps = {
  min: false,
};

PriceRange.propTypes = {
  label: PropTypes.string.isRequired,
  min: PropTypes.bool,
  from: PropTypes.number.isRequired,
  setFrom: PropTypes.func.isRequired,
  to: PropTypes.number.isRequired,
  setTo: PropTypes.func.isRequired,
};

export default PriceRange;
