import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvwKJM1zMAPT1G2DZEBLDqLLN7IJVAy1c",
  authDomain: "tasknest-dd627.firebaseapp.com",
  projectId: "tasknest-dd627",
  storageBucket: "tasknest-dd627.firebasestorage.app",
  messagingSenderId: "758460605961",
  appId: "1:758460605961:web:c299d2010363cad2dbfad8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);