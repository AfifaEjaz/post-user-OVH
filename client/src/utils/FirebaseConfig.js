import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAh1x7FndBGUFLWKeEMzRlXrr2V6C2pYhY",
  authDomain: "user-profiles-2362b.firebaseapp.com",
  projectId: "user-profiles-2362b",
  storageBucket: "user-profiles-2362b.appspot.com",
  messagingSenderId: "105721141173",
  appId: "1:105721141173:web:c823cfaca0e4efc05e6bfc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)