import { savePlayerId, loadPlayerId } from './db.js';
import { initFirebase, loadFromCloud, saveToCloud } from './firebase.js';

let gameState = null;

// authenticate with firebase and check indexedDB for existing save data
const session = await initFirebase();
let playerId = await getStoredPlayerId();
player = player ? player : (await savePlayerId(session.uid), session.uid);
console.log(`🔑 ID: ${playerId}`);

// pull save data from the cloud or create a new character
player = await loadFromCloud(playerId);
if (!player) {
  player = newCharacter();
  await syncToCloud(playerId, player);
};
console.log(`👤 YOU'RE PLAYING AS ${player.name}`);

// generate a new default character
const newCharacter = () => ({
  playerId,
  name: getRandom(["Marcos", "Carlos"]),
  age: 0,
  wallet: 0
});

// get random item from an array
const getRandom = (array) => array[Math.floor(Math.random() * array.length)];
