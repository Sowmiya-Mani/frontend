import { storage } from "./../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

async function useUploadToStorage(file, onProgress, onSuccess, onFail) {
  const storageRef = ref(storage, `images/${file.name}`);

  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      onProgress(progress);
    },
    (error) => {
      console.log(error);
      onFail(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        // console.log("File available at", downloadURL);
        onSuccess(downloadURL);
      });
    }
  );
}

export default useUploadToStorage;
