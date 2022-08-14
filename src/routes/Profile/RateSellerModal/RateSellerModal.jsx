import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import RatingInput from "./RatingInput";
import usersService from "../../../services/users";
import styles from "./RateSellerModal.module.scss";

function RateSellerModal({ showModal, closeHandler, postRating, sellerId }) {
  const [alreadyRated, setAlreadyRated] = useState(true);
  const [rating, setRating] = useState(-1);
  const [hover, setHover] = useState(null);

  useEffect(() => {
    usersService.getUsersSellerRating(sellerId).then((res) => {
      if (res.data.usersSellerRating.length > 0) {
        setAlreadyRated(true);
        setRating(
          res.data.usersSellerRating[res.data.usersSellerRating.length - 1]
            .rating
        );
      } else {
        setAlreadyRated(false);
      }
    });
  }, [setAlreadyRated]);

  const onSubmit = () => {
    postRating(rating);
    setAlreadyRated(true);
  };

  return (
    <Modal show={showModal} onHide={closeHandler}>
      <Modal.Header closeButton className={styles["modal-title"]}>
        <Modal.Title>Rate this seller</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {alreadyRated && (
          <div className={styles.message}>
            You already rated this seller with the rating of {rating}/5
          </div>
        )}
        {!alreadyRated && (
          <RatingInput
            max={5}
            rating={rating}
            setRating={setRating}
            hover={hover}
            setHover={setHover}
          />
        )}
      </Modal.Body>

      <Modal.Footer>
        {alreadyRated && (
          <Button onClick={closeHandler} variant="outline-primary">
            Close
          </Button>
        )}
        {!alreadyRated && (
          <Button onClick={onSubmit} variant="outline-primary">
            Save
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

RateSellerModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
  postRating: PropTypes.func.isRequired,
  sellerId: PropTypes.string.isRequired,
};

export default RateSellerModal;
