// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9wgEOjrPWGBOHhcelgTAh1HDtv5Xs3_A",
  authDomain: "auction-20760.firebaseapp.com",
  projectId: "auction-20760",
  storageBucket: "auction-20760.appspot.com",
  messagingSenderId: "795153762054",
  appId: "1:795153762054:web:15d68f01519f4989878087",
  measurementId: "G-4BDNG4XPE0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage(app);

export { storage };
