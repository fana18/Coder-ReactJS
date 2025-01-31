// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC03ZOGvI4PNawiSRD8j-NDezam99eTtH8",
  authDomain: "ecommerce-react-a26c3.firebaseapp.com",
  projectId: "ecommerce-react-a26c3",
  storageBucket: "ecommerce-react-a26c3.firebasestorage.app",
  messagingSenderId: "79231731683",
  appId: "1:79231731683:web:1e838b4687bae14d4002d6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)