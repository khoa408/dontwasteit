import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBaKEMan0niRUeLLKhxP8MMAkPzP--EBjg",
  authDomain: "dontwasteit-196f5.firebaseapp.com",
  projectId: "dontwasteit-196f5",
  storageBucket: "dontwasteit-196f5.appspot.com",
  messagingSenderId: "442413953653",
  appId: "1:442413953653:web:f040b2ef9c2f0de81dfe3c"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);