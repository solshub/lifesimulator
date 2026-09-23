import { savePlayerId, loadPlayerId } from './db.js';
import { initFirebase, loadFromCloud, saveToCloud } from './firebase.js';

// authenticate with firebase and check indexedDB for existing save data
const session = await initFirebase();
let playerId = await loadPlayerId();
playerId = playerId ? playerId : (await savePlayerId(session.uid), session.uid);
console.log(`🔑 ID: ${playerId}`);

// get random item from an array
const getRandom = (array) => array[Math.floor(Math.random() * array.length)];

// generate a new default character
const newCharacter = () => ({
  playerId,
  name: getRandom(["Marcos", "Carlos"]),
  age: 0,
  wallet: 0
});

// pull save data from the cloud or create a new character
let player = await loadFromCloud(playerId);
if (!player) {
  player = newCharacter();
  await saveToCloud(playerId, player);
};
console.log(`👤 YOU'RE PLAYING AS ${player.name}`);
