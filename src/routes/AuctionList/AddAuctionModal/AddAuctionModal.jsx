import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import Button from "../../../components/Button";
import { Form } from "react-bootstrap";
import UploadImagesInput from "./UploadImagesInput";
import styles from "./AddAuctionModal.module.scss";

function AddAuctionModal({ showModal, closeHandler, addAuctionHandler }) {
  const [formData, setFormData] = useState({});
  const [images, setImages] = useState([]);

  const onClose = () => {
    setFormData({});
    closeHandler();
  };

  const onSubmit = () => {
    addAuctionHandler(formData);
  };

  const onChange = (e) => {
    if (e.target.name === "images") {
      setFormData({ ...formData, [e.target.name]: e.target.files });
      return;
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onImageSelected = (e) => {
    e.preventDefault();
    onChange(e);
    setImages(e.target.files);
  };

  console.log(formData);
  console.log(images);

  const formatMinDate = () => {
    let date = new Date();
    date.setMinutes(date.getMinutes() + 10);
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
        <Form onSubmit={onSubmit} className={styles["auction-form"]}>
          <input
            onChange={onChange}
            className={styles.input}
            type="text"
            name="item_name"
            placeholder="Item name"
          />
          <textarea
            onChange={onChange}
            className={styles["description-input"]}
            type="text"
            name="item_description"
            placeholder="Item desc"
          />
          <input
            onChange={onChange}
            className={styles.input}
            type="text"
            name="initial_price"
            placeholder="Starting price"
          />
          <input
            className={styles.input}
            type="datetime-local"
            name="date_ends"
            onChange={onChange}
            value={formData["date_ends"]}
            min={formatMinDate()}
          ></input>

          <UploadImagesInput multiple onChange={onImageSelected} />
        </Form>
      </Modal.Body>
      <Modal.Footer className={styles.footer}>
        <Button value="Close" color="slateblue" onClick={onClose} />
        <Button value="Save changes" onClick={onSubmit} />
      </Modal.Footer>
    </Modal>
  );
}

AddAuctionModal.propTypes = {
  closeHandler: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  addAuctionHandler: PropTypes.func.isRequired,
};

export default AddAuctionModal;
