import React, { useState } from "react";
import { Modal, ProgressBar } from "react-bootstrap";
import Button from "../../../components/Button";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import usersService from "../../../services/users";
import useUploadToStorage from "./../../../hooks/useUploadToStorage";
import styles from "./EditProfileModal.module.scss";

function EditProfileModal({ userData, showModal, closeHandler }) {
  const { id } = useParams();
  const [progress, setProgress] = useState(0);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [changed, setChanged] = useState(false);
  const [updatedUserData, setUpdatedUserData] = useState({});

  const saveChanges = () => {
    setLoading(true);
    console.log(changed);
    console.log(updatedUserData);
    if (updatedUserData.profile_picture) {
      console.log("Im here");
      useUploadToStorage(
        updatedUserData.profile_picture,
        onUploadProgress,
        onSuccessUpload,
        onFailUpload
      );
    } else if (changed) {
      usersService
        .updateUser(id, updatedUserData)
        .then((res) => {
          console.log(res.data);
          window.location.reload();
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  };

  const onUploadProgress = (percent) => {
    setProgress(percent);
  };

  const onSuccessUpload = (fileUrl) => {
    usersService
      .updateUser(id, { profile_picture: fileUrl })
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const onFailUpload = (err) => {
    setLoading(false);
    console.log(err);
  };

  const onChange = (e) => {
    e.preventDefault();
    if (e.target.name === "profile_picture") {
      setUpdatedUserData({
        ...updatedUserData,
        [e.target.name]: e.target.files[0],
      });
      setIsFileSelected(true);
      setChanged(true);
      return;
    }
    setUpdatedUserData({ ...updatedUserData, [e.target.name]: e.target.value });
    checkChanges();
  };

  const removePhoto = (e) => {
    e.preventDefault();
    setRemoving(true);
    usersService
      .updateUser(id, { profile_picture: "" })
      .then(() => {
        setRemoving(false);
        window.location.reload();
      })
      .catch((err) => {
        setRemoving(false);
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

  const getInitials = () => {
    if (userData.first_name?.length && userData.last_name?.length)
      return (
        userData.first_name.substring(0, 1) + userData.last_name.substring(0, 1)
      ).toUpperCase();
    else return "User";
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
          style={{ backgroundImage: 'url("' + userData.profile_picture + '")' }}
        >
          {userData.profile_picture.length === 0 && (
            <div className={styles["initials"]}>{getInitials()}</div>
          )}
        </div>

        {loading && updatedUserData.profile_picture && (
          <div className={styles.progress}>
            <ProgressBar variant="primary" now={progress} />
          </div>
        )}

        <div className={styles["button-container"]}>
          <div className={styles.buttons}>
            <label
              className={`${
                isFileSelected ? styles["label-selected"] : styles["label"]
              }`}
              htmlFor="upload-photo"
            >
              {isFileSelected
                ? updatedUserData.profile_picture.name
                : "Upload new photo..."}
            </label>

            <input
              className={styles["upload-photo"]}
              id="upload-photo"
              type="file"
              name="profile_picture"
              onChange={onChange}
            ></input>
            <Button
              disabled={userData.profile_picture?.length === 0}
              value="Remove photo"
              onClick={removePhoto}
              loading={removing}
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
        <Button
          value="Save"
          onClick={saveChanges}
          disabled={!changed || loading}
          loading={loading}
        />
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
