import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import BidModalCard from "./BidModalCard";
import styles from "./BidsModal.module.scss";

const PAGE_SIZE = 5;

function BidsModal({ show, handleClose, bids, expired }) {
  const bidsReversed = [...bids].reverse();
  const [page, setPage] = useState(1);
  const [shownBids, setShownBids] = useState(
    bidsReversed.slice(0, PAGE_SIZE * page)
  );
  const [exhausted, setExhausted] = useState(false);

  const loadMoreBids = (e) => {
    e.preventDefault();
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (PAGE_SIZE * page > bids.length) {
      setExhausted(true);
    }
    setShownBids(bidsReversed.slice(0, PAGE_SIZE * page));
  }, [page]);

  const closeModal = () => {
    setPage(1);
    setExhausted(false);
    handleClose();
  };

  return (
    <div className={styles.modal}>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className={styles.title}>
            {expired ? "Bids posted" : "Current bids"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {shownBids.map((bid, index) => (
            <BidModalCard key={index} bid={bid} />
          ))}

          <div className={styles["load-more-button"]}>
            {exhausted ? (
              <div>That is all</div>
            ) : (
              <Button variant="outline-primary" onClick={loadMoreBids}>
                <i className={`bi bi-caret-down ${styles.icon}`}></i>
                Load more
              </Button>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeModal}>Close</Button>
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
