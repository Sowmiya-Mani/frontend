import React from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import Button from "../../../components/Button";
import styles from "./AddAuctionModal.module.scss";

function AddAuctionModal({ showModal, closeHandler }) {
  const formatMinDate = () => {
    let date = new Date();
    date.setMinutes(date.getMinutes() + 30);
    const arr = date.toString().split(" ");

    let month = date.getMonth() + 1;
    if (month.toString().length === 1) {
      month = "0" + month.toString();
    }

    let hour = date.getHours();
    if (hour.toString().length === 1) {
      hour = "0" + hour.toString();
    }

    let minutes = date.getMinutes();
    if (minutes.toString().length === 1) {
      minutes = "0" + minutes.toString();
    }

    return arr[3] + "-" + month + "-" + arr[2] + "T" + hour + ":" + minutes;
  };

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
          <input
            className={styles.input}
            type="datetime-local"
            value={formatMinDate()}
            min={formatMinDate()}
          ></input>
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
