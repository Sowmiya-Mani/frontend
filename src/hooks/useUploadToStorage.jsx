import { storage } from "./../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

/**
 * @param {*} file - JS File Object of the file to be uploaded
 * @param {*} onProgress - callback for progress
 * @param {*} onSuccess - callback for success
 * @param {*} onFail - callback for fail
 * @param {*} index - index used for progress function in case there are multiple files to upload
 */
async function useUploadToStorage(file, onProgress, onSuccess, onFail, index) {
  const storageRef = ref(storage, `images/${file.name}`);

  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + percent + "% done");
      onProgress(percent, index);
    },
    (error) => {
      console.log(error);
      onFail(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        // console.log("File available at", downloadURL);
        onSuccess(downloadURL, index);
      });
    }
  );
}

export default useUploadToStorage;
