import React from "react";
import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import BidModalCard from "./BidModalCard";
import styles from "./BidsModal.module.scss";

function BidsModal({ show, handleClose, bids, expired }) {
  const bidsReversed = [...bids].reverse();

  return (
    <div className={styles.modal}>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className={styles.title}>
            {expired ? "Bids posted" : "Current bids"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {bidsReversed.map((bid, index) => (
            <BidModalCard key={index} bid={bid} />
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

BidsModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  bids: PropTypes.array.isRequired,
  expired: PropTypes.bool.isRequired,
};

export default BidsModal;
