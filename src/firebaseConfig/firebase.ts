import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const {
  VITE_FIREBASE_API_KEY,
  VITE_FIREBASE_AUTH_DOMAIN,
  VITE_FIREBASE_PROJECT_ID,
  VITE_FIREBASE_STORAGE_BUCKET,
  VITE_FIREBASE_MESSAGING_SENDER_ID,
  VITE_FIREBASE_APP_ID,
  VITE_FIREBASE_MEASUREMENT_ID,
  VITE_FIREBASE_DATABASE_URL,
} = import.meta.env;

/*const firebaseConfig = {
  apiKey: VITE_FIREBASE_API_KEY,
  authDomain: VITE_FIREBASE_AUTH_DOMAIN,
  projectId: VITE_FIREBASE_PROJECT_ID,
  storageBucket: VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: VITE_FIREBASE_APP_ID,
  measurementId: VITE_FIREBASE_MEASUREMENT_ID,
  databaseURL: VITE_FIREBASE_DATABASE_URL,
}; */

const firebaseConfig = {
  apiKey: "AIzaSyBN1xH1mlhmfJse25XiuqHNEwpmSIdUIDA",
  authDomain: "twitter-clone-c430a.firebaseapp.com",
  databaseURL: "https://twitter-clone-c430a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "twitter-clone-c430a",
  storageBucket: "twitter-clone-c430a.appspot.com",
  messagingSenderId: "724437271823",
  appId: "1:724437271823:web:abf427e9694abe1da32a7a",
  measurementId: "G-MPTMN9H22L"
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getDatabase(app);
export const auth = getAuth();
export const dbUserReference = ref(db, 'users');
export const dbMessagesReference = ref(db, 'messages'); 

