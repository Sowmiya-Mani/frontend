import React from "react";
import { Modal, Carousel } from "react-bootstrap";
import PropTypes from "prop-types";
import Button from "../../../components/Button";
import styles from "./ImageModal.module.scss";

function ImageModal({ handleClose, show }) {
  return (
    <div className={styles.modal}>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className={styles.title}>Images</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://www.roadaffair.com/wp-content/uploads/2019/01/sebilj-fountain-sarajevo-bosnia-and-herzegovina-shutterstock_574540984-1024x683.jpg"
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://firebasestorage.googleapis.com/v0/b/auction-20760.appspot.com/o/images%2F2022_05_28_Klika_Muzej%20(6).jpg?alt=media&token=b890d5ff-cfed-4981-bd21-91e8e1cdf4c5"
                alt="Second slide"
              />

              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://firebasestorage.googleapis.com/v0/b/auction-20760.appspot.com/o/images%2F2022_05_28_Klika_Muzej%20(6).jpg?alt=media&token=b890d5ff-cfed-4981-bd21-91e8e1cdf4c5"
                alt="Third slide"
              />

              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
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
  //   images: PropTypes.array.isRequired
};

export default ImageModal;
