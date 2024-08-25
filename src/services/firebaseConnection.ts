import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBOzWTc-zDRQnjX81fGuqE1xx6fzNecPYw",
  authDomain: "next-tarefas-app.firebaseapp.com",
  projectId: "next-tarefas-app",
  storageBucket: "next-tarefas-app.appspot.com",
  messagingSenderId: "733421664286",
  appId: "1:733421664286:web:895426bbf461ffa5e5960f"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export { db };