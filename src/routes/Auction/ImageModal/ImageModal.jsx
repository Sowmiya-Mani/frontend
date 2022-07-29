import React from "react";
import { Modal, Carousel, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import styles from "./ImageModal.module.scss";

function ImageModal({ handleClose, show, pictures }) {
  return (
    <div className={styles.modal}>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className={styles.title}>Images</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {pictures.length > 0 ? (
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
          ) : (
            <div> This item currently has no pictures</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
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
