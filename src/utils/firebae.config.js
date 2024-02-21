import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCsYao7Ajq4iIF2IMVxznhqrssbw2ruxUU",
  authDomain: "test-g45.firebaseapp.com",
  projectId: "test-g45",
  storageBucket: "test-g45.appspot.com",
  messagingSenderId: "991546629719",
  appId: "1:991546629719:web:2216e6d0c4f2d405a18d12"
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
