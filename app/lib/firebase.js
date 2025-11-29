import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA9JYYs1QG5-bddJiPsKunCGIY_XFC1tvg",
  authDomain: "gold-grandis-db.firebaseapp.com",
  projectId: "gold-grandis-db",
  storageBucket: "gold-grandis-db.firebasestorage.app",
  messagingSenderId: "672087897818",
  appId: "1:672087897818:web:0fd376555fa1712a2517e3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };