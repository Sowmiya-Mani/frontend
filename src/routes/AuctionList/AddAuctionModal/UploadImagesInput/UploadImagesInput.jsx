import React from "react";
import PropTypes from "prop-types";
import styles from "./UploadImagesInput.module.scss";

function UploadImagesInput({ multiple, onChange }) {
  return (
    <>
      <label className={styles.label} htmlFor="upload-photo">
        Choose photos
      </label>
      <input
        name="images"
        className={styles["upload-photo-input"]}
        id="upload-photo"
        type="file"
        multiple={multiple}
        onChange={onChange}
      ></input>
    </>
  );
}

UploadImagesInput.defaultProps = {
  multiple: false,
};

UploadImagesInput.propTypes = {
  multiple: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default UploadImagesInput;
