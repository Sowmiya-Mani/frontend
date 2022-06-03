import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "../../../components/Button";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import usersService from "../../../services/users";
import styles from "./EditProfileModal.module.scss";

function EditProfileModal({ userData, showModal, closeHandler }) {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [changed, setChanged] = useState(false);
  const [updatedUserData, setUpdatedUserData] = useState({});

  const saveChanges = () => {
    usersService
      .updateUser(id, updatedUserData)
      .then((res) => {
        console.log(res.data);
        closeHandler();
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChange = (e) => {
    e.preventDefault();
    setUpdatedUserData({ ...updatedUserData, [e.target.name]: e.target.value });
    checkChanges();
  };

  const removePhoto = (e) => {
    e.preventDefault();
    setLoading(true);
    usersService
      .updateUser(id, { profile_picture: "" })
      .then(() => {
        setLoading(false);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
        <div
          className={styles["profile-pic"]}
          style={{ backgroundImage: "url(" + userData.profile_picture + ")" }}
        ></div>

        <div className={styles["button-container"]}>
          <div className={styles.buttons}>
            <label className={styles["label"]} htmlFor="upload-photo">
              Upload new photo
            </label>
            <input
              className={styles["upload-photo"]}
              id="upload-photo"
              type="file"
            ></input>
            <Button
              value="Remove photo"
              onClick={removePhoto}
              loading={loading}
            />
          </div>
        </div>

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
            name="username"
            placeholder={userData.username}
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
        <Button value="Save" onClick={saveChanges} disabled={!changed} />
      </Modal.Footer>
    </Modal>
  );
}

EditProfileModal.propTypes = {
  closeHandler: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  userData: PropTypes.object.isRequired,
};

export default EditProfileModal;
