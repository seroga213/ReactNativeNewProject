import * as firebase from "firebase";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBRbJtpzTVNoPxMbGtQCllfw9Pbf0LxkwM",
    authDomain: "reactnativenewproject.firebaseapp.com",
    projectId: "reactnativenewproject",
    storageBucket: "reactnativenewproject.appspot.com",
    messagingSenderId: "869124156141",
    appId: "1:869124156141:web:66b03b1c1ed85c15e67ae4",
    measurementId: "G-D77PHBSFFR"
  };
// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);