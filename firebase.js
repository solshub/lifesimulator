import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAFD3f-Hb6VPVTmv_vwWuvUg5lX5d0xVPM",
  authDomain: "lifesimulator-630d6.firebaseapp.com",
  projectId: "lifesimulator-630d6",
  storageBucket: "lifesimulator-630d6.firebasestorage.app",
  messagingSenderId: "128943117741",
  appId: "1:128943117741:web:a2485350fa3eb72722bd24"
};

let firebaseApp, firebaseAuth, firestoreDatabase;

// creates a new session anonymously or restores an existing one through player id
export const initFirebase = async () => {
  if (!firebaseApp) {
    firebaseApp = initializeApp(firebaseConfig);
    firebaseAuth = getAuth(firebaseApp);
    firestoreDatabase = getFirestore(firebaseApp);
  }
  const authCredential = await signInAnonymously(firebaseAuth);
  return authCredential.user;
};

// save data to Firestore database
export const saveToFirebase = async (playerId, playerData) => {
  if (!firestoreDatabase) await initFirebase();
  const saveData = doc(firestoreDatabase, 'players', playerId);
  await setDoc(saveData, playerData, { merge: true });
};

// load saved data from Firestore database
export const loadFromFirebase = async (playerId) => {
  if (!firestoreDatabase) await initFirebase();
  const saveData = doc(firestoreDatabase, 'players', playerId);
  const saveDataSnapshot = await getDoc(saveData);
  return saveDataSnapshot.exists() ? saveDataSnapshot.data() : null;
};
