import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAFD3f-Hb6VPVTmv_vwWuvUg5lX5d0xVPM",
  authDomain: "lifesimulator-630d6.firebaseapp.com",
  projectId: "lifesimulator-630d6",
  storageBucket: "lifesimulator-630d6.firebasestorage.app",
  messagingSenderId: "128943117741",
  appId: "1:128943117741:web:a2485350fa3eb72722bd24"
};

let app, auth, db;

export const initFirebase = async () => {
  if(!app) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
  }
  // Signs in anonymously or restores an existing browser session token
  const userCredential = await signInAnonymously(auth);
  return userCredential.user;
};

// set up loadFromCloud and saveToCloud
