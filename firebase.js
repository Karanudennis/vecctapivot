// Firebase LIVE - vecctapivot project - VECCTA
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDndIA6uQYdiSqnxKLoHnjE_XdGdEB_RgA",
  authDomain: "vecctapivot.firebaseapp.com",
  projectId: "vecctapivot",
  storageBucket: "vecctapivot.firebasestorage.app",
  messagingSenderId: "122668932743",
  appId: "1:122668932743:web:414ff9a4536553208c6222"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

console.log("Firebase linked to VECCTA!");
