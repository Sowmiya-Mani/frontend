import React, { useState, useEffect } from "react";
import { Modal, ProgressBar } from "react-bootstrap";
import PropTypes from "prop-types";
import Button from "../../../components/Button";
import { Form, DropdownButton, Dropdown } from "react-bootstrap";
import UploadImagesInput from "./UploadImagesInput";
import useUploadToStorage from "../../../hooks/useUploadToStorage";
import ErrorAlert from "../../../components/Alerts/ErrorAlert";
import styles from "./AddAuctionModal.module.scss";

function AddAuctionModal({
  showModal,
  closeHandler,
  addAuctionHandler,
  userId,
}) {
  const [formData, setFormData] = useState({ created_by: userId });
  const [images, setImages] = useState([]);
  const [progress, setProgress] = useState([]);
  const [uploadedImages, setUploadedImages] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [category, setCategory] = useState(-1);
  const categories = [
    "Electronics",
    "Man's Fashion",
    "Woman's fashion",
    "Entertainment",
    "Other",
  ];

  const getDropdownTitle = () => {
    if (category === -1) {
      return "Choose a category";
    } else return categories[category];
  };

  const uploadImages = () => {
    setLoading(true);
    console.log("Started uploading.");
    images.forEach((image, index) => {
      useUploadToStorage(image, onProgress, onSuccess, onFail, index);
    });
  };

  const onFail = (error, index) => {
    setLoading(false);
    console.log(error);
    console.log("Failed upload at index: " + index);
  };

  const onSuccess = (downloadUrl, index) => {
    console.log(
      "Successful upload at index: " + index + "Downloadurl: " + downloadUrl
    );

    setImageUrls((prevState) => {
      let update = prevState;
      update[index] = downloadUrl;
      return [...update];
    });
  };

  useEffect(() => {
    if (
      imageUrls.length !== 0 &&
      imageUrls.length === images.length &&
      !imageUrls.includes(undefined)
    ) {
      console.log("Finished uploading");
      setFormData({
        ...formData,
        pictures: imageUrls.map((url) => Object({ img_url: url })),
      });
      setUploadedImages(true);
    }
  }, [imageUrls]);

  const onProgress = (percent, index) => {
    setProgress((prev) => {
      let update = prev;
      update[index] = percent;
      return [...update];
    });
  };

  const onCategoryChosen = (idx) => {
    setFormData({
      ...formData,
      category: categories[idx],
    });
    setCategory(idx);
  };

  useEffect(() => {
    if (uploadedImages) {
      addAuctionHandler(formData, setLoading, setImages);
    }
  }, [uploadedImages]);

  const onClose = () => {
    setCategory(-1);
    setFormData({ created_by: userId });
    setImages([]);
    closeHandler();
  };

  const validateData = () => {
    const requiredFields = [
      "created_by",
      "item_name",
      "item_description",
      "date_ends",
      "initial_price",
    ];

    if (category === -1) {
      setError("Please choose a category");
      return false;
    }

    for (let field of requiredFields) {
      if (formData[field] === "" || formData[field] == null) {
        setError(field + " cannot be empty");
        return false;
      }
    }
    return true;
  };

  const onSubmit = () => {
    let validData = validateData();
    if (!validData) {
      return;
    }
    if (images.length === 0) {
      setError("Please upload some images.");
      return;
    }
    uploadImages();
  };

  const onChange = (e) => {
    if (e.target.name === "images") {
      setFormData({ ...formData, pictures: e.target.files });
      return;
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onImageSelected = (e) => {
    e.preventDefault();
    onChange(e);
    setImages([...e.target.files]);
  };

  useEffect(() => {
    if (images.length > 0) {
      setProgress(new Array(images.length).fill(0));
    }
  }, [images]);

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
    <>
      {error.length > 0 && <ErrorAlert message={error} setMessage={setError} />}
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

            <DropdownButton
              variant="outline-primary"
              id="dropdown-basic-button"
              title={`${getDropdownTitle()}`}
              className={styles["dropdown-button"]}
            >
              {categories.map((category, idx) => {
                return (
                  <Dropdown.Item
                    key={idx}
                    onClick={() => onCategoryChosen(idx)}
                    className={styles["dropdown-item"]}
                  >
                    {category}
                  </Dropdown.Item>
                );
              })}
            </DropdownButton>

            {images.length === 0 ? (
              <UploadImagesInput multiple onChange={onImageSelected} />
            ) : (
              images.map((image, index) => (
                <div key={index} className={styles.progress}>
                  <div style={{ marginBottom: "5px" }}>{image.name} </div>
                  <ProgressBar
                    style={{ width: "100%" }}
                    variant="primary"
                    now={progress[index]}
                  />
                  <div>{progress[index]?.toFixed(2)} %</div>
                </div>
              ))
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer className={styles.footer}>
          <Button value="Close" color="slateblue" onClick={onClose} />
          <Button value="Save changes" onClick={onSubmit} disabled={loading} />
        </Modal.Footer>
      </Modal>
    </>
  );
}

AddAuctionModal.propTypes = {
  closeHandler: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  addAuctionHandler: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

export default AddAuctionModal;
