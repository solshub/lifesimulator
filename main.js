import { savePlayerId, loadPlayerId, saveLocalPlayer, loadLocalPlayer } from './db.js';
import { initFirebase, loadFromFirebase, saveToFirebase } from './firebase.js';

// get random item from an array
const getRandom = (array) => array[Math.floor(Math.random() * array.length)];

// generate a new default character
const newCharacter = (id) => ({
  playerId: id,
  name: getRandom(["Marcos", "Carlos"]),
  age: 0,
  wallet: 0
});

// 1. Authenticate with Firebase (falls back gracefully if blocked)
const session = await initFirebase();

// 2. Load or generate a player ID
let playerId = await loadPlayerId();
if (!playerId) {
  playerId = session?.uid && session.uid !== 'offline_player' 
    ? session.uid 
    : `player_${Math.floor(100000 + Math.random() * 900000)}`;
  await savePlayerId(playerId);
}
console.log(`🔑 ID: ${playerId}`);

// 3. Load player: First from local storage, fallback to cloud, or create new
let player = await loadLocalPlayer();
if (!player) {
  player = await loadFromFirebase(playerId);
}

if (!player) {
  player = newCharacter(playerId);
  await saveLocalPlayer(player);
  await saveToFirebase(playerId, player);
} else {
  // Keep local storage up to date
  await saveLocalPlayer(player);
}

console.log(`👤 YOU'RE PLAYING AS ${player.name}`);
