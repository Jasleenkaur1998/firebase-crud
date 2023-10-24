import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDKL5P-A9Lvt65LM8BtzMYIVkmc2jkn0Eo",
    authDomain: "fir-crud-54f0e.firebaseapp.com",
    projectId: "fir-crud-54f0e",
    storageBucket: "fir-crud-54f0e.appspot.com",
    messagingSenderId: "1070674444393",
    appId: "1:1070674444393:web:248d26c7479a7519ba62f8",
    measurementId: "G-2VN89Q9ENH"
  };

  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);