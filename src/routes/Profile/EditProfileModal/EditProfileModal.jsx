import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "../../../components/Button";
import PropTypes from "prop-types";
import styles from "./EditProfileModal.module.scss";

function EditProfileModal({ userData, showModal, closeHandler, saveHandler }) {
  const [changed, setChanged] = useState(false);
  const [updatedUserData, setUpdatedUserData] = useState({});

  const onChange = (e) => {
    e.preventDefault();
    setUpdatedUserData({ ...updatedUserData, [e.target.name]: e.target.value });
    checkChanges();
  };

  console.log(updatedUserData);

  const checkChanges = () => {
    const keys = Object.keys(updatedUserData);

    for (let key of keys) {
      if (updatedUserData[key] !== userData[key]) {
        setChanged(true);
        return;
      }
    }

    setChanged(false);
  };

  const onSubmit = () => {
    console.log("Submitted");
  };

  return (
    <Modal show={showModal} onHide={closeHandler}>
      <Modal.Header closeButton className={styles["modal-title"]}>
        <Modal.Title>Edit profile</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={onSubmit} className={styles["edit-profile-form"]}>
          <input
            onChange={onChange}
            className={styles.input}
            type="text"
            name="first_name"
            placeholder={userData.first_name}
          />
          <input
            onChange={onChange}
            className={styles.input}
            type="text"
            name="last_name"
            placeholder={userData.last_name}
          />
          <input
            onChange={onChange}
            className={styles.input}
            type="text"
            name="profile_picture"
            placeholder={userData.profile_picture}
          />
          <textarea
            onChange={onChange}
            className={styles["bio-input"]}
            type="text"
            name="bio"
            placeholder={userData.bio}
          />
          <input
            onChange={onChange}
            className={styles.input}
            type="text"
            name="email"
            placeholder={userData.email}
          />
        </form>
      </Modal.Body>

      <Modal.Footer className={styles.footer}>
        <Button value="Save" onClick={saveHandler} disabled={!changed} />
      </Modal.Footer>
    </Modal>
  );
}

EditProfileModal.propTypes = {
  closeHandler: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  saveHandler: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired,
};

export default EditProfileModal;
