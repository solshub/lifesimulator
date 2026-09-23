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

// Initialize Firebase with complete error shielding for ad blockers and offline users
export const initFirebase = async () => {
  try {
    if (!firebaseApp) {
      firebaseApp = initializeApp(firebaseConfig);
      firebaseAuth = getAuth(firebaseApp);
      firestoreDatabase = getFirestore(firebaseApp);
    }
    const authCredential = await signInAnonymously(firebaseAuth);
    return authCredential.user;
  } catch (error) {
    console.warn("⚠️ Firebase Auth unreachable (ad blocker or offline). Falling back to local session.", error.message);
    return { uid: 'offline_player' };
  }
};

// Save data to Firestore with silent error recovery
export const saveToFirebase = async (playerId, playerData) => {
  try {
    if (!firestoreDatabase) await initFirebase();
    if (!firestoreDatabase) return false;
    const saveData = doc(firestoreDatabase, 'players', playerId);
    await setDoc(saveData, playerData, { merge: true });
    return true;
  } catch (error) {
    console.warn("⚠️ Cloud save bypassed (ad blocker or offline). Saved locally.", error.message);
    return false;
  }
};

// Load saved data from Firestore with silent error recovery
export const loadFromFirebase = async (playerId) => {
  try {
    if (!firestoreDatabase) await initFirebase();
    if (!firestoreDatabase) return null;
    const saveData = doc(firestoreDatabase, 'players', playerId);
    const saveDataSnapshot = await getDoc(saveData);
    return saveDataSnapshot.exists() ? saveDataSnapshot.data() : null;
  } catch (error) {
    console.warn("⚠️ Cloud load bypassed (ad blocker or offline). Loading from local storage.", error.message);
    return null;
  }
};
