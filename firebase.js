import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
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
