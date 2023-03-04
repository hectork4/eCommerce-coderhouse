// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBj31xp4AWxE5Drrli3uXqGf27XOehRi2Y",
  authDomain: "coderhouse-f7eb4.firebaseapp.com",
  projectId: "coderhouse-f7eb4",
  storageBucket: "coderhouse-f7eb4.appspot.com",
  messagingSenderId: "790371459272",
  appId: "1:790371459272:web:c130648735fbe0d50505fd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);