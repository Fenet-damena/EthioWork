
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFhQzeof6imGixetklRscw5LJcV0x1Wi0",
  authDomain: "ethiowork-d5e40.firebaseapp.com",
  projectId: "ethiowork-d5e40",
  storageBucket: "ethiowork-d5e40.firebasestorage.app",
  messagingSenderId: "583441908088",
  appId: "1:583441908088:web:cabbf11912e3d85e1bc88d",
  measurementId: "G-F5G8F61GP7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics only in browser environment
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}
export { analytics };

export default app;
