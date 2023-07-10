import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5kxxH8xDqR89l6xMCIyz9Qy0BsdapIps",
  authDomain: "rpsgame-eae90.firebaseapp.com",
  projectId: "rpsgame-eae90",
  storageBucket: "rpsgame-eae90.appspot.com",
  messagingSenderId: "913151311111",
  appId: "1:913151311111:web:6b54a7f332e96e9b9259a2"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);