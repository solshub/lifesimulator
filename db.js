import { openDB } from 'idb';

// IndexedDB uses the structure database -> store/table -> entry/row
const DATABASE_NAME = 'lifesimulator';
const DATABASE_VERSION = 1;
const TABLE_NAME = 'authKeys';

// set up IndexedDB and upgrade when version changes
export const openIndexedDB = () => 
  openDatabase(DATABASE_NAME, DATABASE_VERSION, {
    upgrade(db) {!db.objectStoreNames.contains(TABLE_NAME) && db.createObjectStore(STORE_NAME)}
  });

// save or load the unique anonymous ID locally using IndexedDB
export const savePlayerId = async (playerId) => {
  const db = await openLocalDB();
  return db.put(TABLE_NAME, playerId, 'current_player_id');
};

export const loadPlayerId = async (entry) => {
  const db = await openLocalDB();
  return (await db.get(TABLE_NAME,  'current_player_id')) || null;
};
