import { openDB } from 'idb';

// IndexedDB uses the structure database -> objectStore -> entry/record
const databaseName = 'lifesimulator';
const databaseVersion = 1;
const authStoreName = 'authKeys';
const playerStoreName = 'playerData';

// set up IndexedDB and upgrade when version changes
export const openIndexedDB = () =>
  openDB(databaseName, databaseVersion, {
    upgrade: (database) => {
      if (!database.objectStoreNames.contains(authStoreName)) {
        database.createObjectStore(authStoreName);
      }
      if (!database.objectStoreNames.contains(playerStoreName)) {
        database.createObjectStore(playerStoreName);
      }
    }
  });

// save or load the unique player ID locally using IndexedDB
export const savePlayerId = async (playerId) => {
  const database = await openIndexedDB();
  return database.put(authStoreName, playerId, 'current_player_id');
};

export const loadPlayerId = async () => {
  const database = await openIndexedDB();
  return (await database.get(authStoreName, 'current_player_id')) || null;
};

// save or load the full player profile locally using IndexedDB
export const saveLocalPlayer = async (player) => {
  const database = await openIndexedDB();
  return database.put(playerStoreName, player, 'current_player');
};

export const loadLocalPlayer = async () => {
  const database = await openIndexedDB();
  return (await database.get(playerStoreName, 'current_player')) || null;
};
