import { openDatabase } from 'idb';

// IndexedDB uses the structure database -> store/table -> entry/row
const databaseName = 'lifesimulator';
const databaseVersion = 1;
const tableName = 'authKeys';

// set up IndexedDB and upgrade when version changes
export const openIndexedDB = () => 
  openDatabase(databaseName, databaseVersion, {
    upgrade(database) {!database.objectStoreNames.contains(tableName) && database.createObjectStore(tableName)}
  });

// save or load the unique anonymous ID locally using IndexedDB
export const savePlayerId = async (playerId) => {
  const database = await openDatabase();
  return database.put(tableName, playerId, 'current_player_id');
};

export const loadPlayerId = async () => {
  const database = await openDatabase();
  return (await database.get(tableName, 'current_player_id')) || null;
};
