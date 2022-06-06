import React from "react";
import { Modal, Carousel } from "react-bootstrap";
import PropTypes from "prop-types";
import Button from "../../../components/Button";
import styles from "./ImageModal.module.scss";

function ImageModal({ handleClose, show, pictures }) {
  return (
    <div className={styles.modal}>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className={styles.title}>Images</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel>
            {pictures.map((picture, index) => (
              <Carousel.Item key={index}>
                <img className="d-block w-100" src={picture.img_url} />
                <Carousel.Caption>
                  <h3>
                    Image {index + 1} out of {pictures.length}
                  </h3>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </Modal.Body>
        <Modal.Footer>
          <Button value="Close" onClick={handleClose} />
        </Modal.Footer>
      </Modal>
    </div>
  );
}

ImageModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  pictures: PropTypes.array.isRequired,
};

export default ImageModal;
