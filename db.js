import { openDB } from 'idb';

// IndexedDB uses the structure database -> store/table -> entry/row
const DATABASE_NAME = 'lifesimulator';
const DATABASE_VERSION = 1;
const TABLE_NAME = 'playerSave';

// creates the database and upgrades it when version changes
export const openIndexedDB = () => 
  openDatabase(DATABASE_NAME, DATABASE_VERSION, {
    upgrade(db) {!db.objectStoreNames.contains(TABLE_NAME) && db.createObjectStore(STORE_NAME)}
  });

// save and load game state object to and from IndexedDB
export const saveToIndexedDB = async (entry, data) => {
  const db = await openLocalDB();
  return db.put(TABLE_NAME, data, entry);
};

export const loadFromIndexedDB = async (entry) => {
  const db = await openLocalDB();
  return (await db.get(TABLE_NAME, entry)) || null;
};

// add later exportSaveFile and importSaveFile
