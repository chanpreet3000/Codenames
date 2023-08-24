const activeRooms = {};
const roomAdmins = {};
const playersInfo = {};
const ROOM_ID_LENGTH = 6;

function generateRandomRoomID(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomCode = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomCode += characters[randomIndex];
  }
  return randomCode;
}

const roomAvailableWithId = (roomId) => {
  if (activeRooms[roomId]) return false;
  return true;
};

const roomExistsWithID = (roomId) => {
  if (activeRooms[roomId]) return true;
  return false;
};

const addPlayerInfoToRoom = (roomId, playerId, data) => {
  activeRooms[roomId].players.add(playerId);
  playersInfo[playerId] = { roomId, playerId, ...data };
  // console.log("activeRooms", activeRooms);
  // console.log("roomAdmins", roomAdmins);
  // console.log("playersInfo", playersInfo);
  return activeRooms[roomId];
};

const updateRoomSettings = (roomId, settings) => {
  activeRooms[roomId].settings = settings;
  console.log(settings, (activeRooms[roomId].settings = settings));
};

const createNewRoom = (playerId) => {
  var roomId = "";
  while (1) {
    const generatedRoomID = generateRandomRoomID(ROOM_ID_LENGTH);
    if (roomAvailableWithId(generateRandomRoomID)) {
      roomId = generatedRoomID;
      break;
    }
  }
  //Making the admin of room
  roomAdmins[roomId] = playerId;
  activeRooms[roomId] = { settings: {}, players: new Set() };
  return roomId;
};

const getPlayerIdOfRoomAdmin = (roomId) => {
  return roomAdmins[roomId];
};

const getPlayersInfoInRoom = (roomId) => {
  var roomPlayersInfo = [];
  for (const playerId of activeRooms[roomId].players) {
    roomPlayersInfo.push(playersInfo[playerId]);
  }
  return {
    admin: roomAdmins[roomId],
    players: roomPlayersInfo,
  };
};

const getPlayerInfo = (playerId) => {
  return playersInfo[playerId];
};

const deletePlayerInfo = (playerId) => {
  delete playersInfo[playerId];
};

const getPlayerRoomId = (playerId) => {
  const playerInfo = getPlayerInfo(playerId);
  if (playerInfo && playerInfo.roomId) return playerInfo.roomId;
  return undefined;
};

const removePlayerFromRoom = (roomId, playerId) => {
  activeRooms[roomId].players.delete(playerId);
};

const playerDisconnected = (playerId) => {
  //remove from admins
  //remove from all rooms
  //remove from admin room no
  const playerRoomId = getPlayerRoomId(playerId);
  if (playerRoomId) {
    removePlayerFromRoom(playerRoomId, playerId);
  }
  deletePlayerInfo(playerId);
};

module.exports = {
  createNewRoom,
  roomAvailableWithId,
  roomExistsWithID,
  addPlayerInfoToRoom,
  updateRoomSettings,
  getPlayerIdOfRoomAdmin,
  getPlayersInfoInRoom,
  getPlayerInfo,
  removePlayerFromRoom,
  getPlayerRoomId,
  deletePlayerInfo,
  playerDisconnected,
};
