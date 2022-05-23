import React from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import Button from "../../../components/Button";
import styles from "./AddAuctionModal.module.scss";

function AddAuctionModal({ showModal, closeHandler }) {
  return (
    <Modal show={showModal} onHide={closeHandler}>
      <Modal.Header closeButton>
        <Modal.Title className={styles["modal-title"]}>
          Start your own auction
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className={styles["auction-form"]}>
          <input
            className={styles.input}
            type="text"
            name="item_name"
            placeholder="Item name"
          />
          <textarea
            className={styles["description-input"]}
            type="text"
            name="item_description"
            placeholder="Item desc"
          />
          <input
            className={styles.input}
            type="text"
            name="initial_price"
            placeholder="Starting price"
          />
        </form>
      </Modal.Body>
      <Modal.Footer className={styles.footer}>
        <Button value="Close" color="slateblue" onClick={closeHandler} />
        <Button value="Save changes" onClick={closeHandler} />
      </Modal.Footer>
    </Modal>
  );
}

AddAuctionModal.propTypes = {
  closeHandler: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
};

export default AddAuctionModal;
