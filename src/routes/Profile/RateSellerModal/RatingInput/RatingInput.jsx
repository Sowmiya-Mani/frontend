import React from "react";
import PropTypes from "prop-types";
import styles from "./RatingInput.module.scss";

function RatingInput({ max, rating, setRating, hover, setHover }) {
  //   const [rating, setRating] = useState(-1);
  //   const [hover, setHover] = useState(null);

  const array = Array.from(Array(max).keys());

  const selectRating = (idx) => {
    setRating(idx + 1);
  };

  return (
    <div>
      <div className={styles.stars}>
        {array.map((star, idx) =>
          idx < (hover || rating) ? (
            <i
              key={idx}
              onClick={() => selectRating(idx)}
              onMouseEnter={() => setHover(idx + 1)}
              onMouseLeave={() => setHover(null)}
              className={`bi bi-star-fill ${styles.star}`}
            ></i>
          ) : (
            <i
              key={idx}
              onClick={() => selectRating(idx)}
              onMouseEnter={() => setHover(idx + 1)}
              onMouseLeave={() => setHover(null)}
              className={`bi bi-star ${styles.star} ${styles["empty-star"]}`}
            ></i>
          )
        )}
      </div>
    </div>
  );
}

RatingInput.propTypes = {
  max: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  setRating: PropTypes.func.isRequired,
  hover: PropTypes.number.isRequired,
  setHover: PropTypes.func.isRequired,
};

export default RatingInput;
