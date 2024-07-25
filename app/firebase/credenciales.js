// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAJEuNgtVcnaN_6FAUZxdJG0bQYK_CIYaE",
    authDomain: "prueba-totto-7ab87.firebaseapp.com",
    projectId: "prueba-totto-7ab87",
    storageBucket: "prueba-totto-7ab87.appspot.com",
    messagingSenderId: "918821604020",
    appId: "1:918821604020:web:2df9845e05b9e92a42e5e1"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp