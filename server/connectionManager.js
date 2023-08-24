const {
  createNewRoom,
  addPlayerInfoToRoom,
  roomExistsWithID,
  updateRoomSettings,
  getPlayerIdOfRoomAdmin,
  getPlayersInfoInRoom,
  playerDisconnected,
  getPlayerRoomId,
} = require("./RoomManager");

const handlePlayerConnection = (io, socket) => {
  const playerId = socket.id;
  console.log("Player connected with id", playerId);

  // Creating a new room and allocating a roomID.
  socket.on("createRoom", () => {
    const roomId = createNewRoom(playerId);
    socket.emit("roomCreatedWithId", roomId);
  });

  //
  socket.on("joinRoomWithId", ({ roomId, name }) => {
    if (!roomExistsWithID(roomId)) {
      socket.emit("roomDoesNotExists");
      return;
    }
    addPlayerInfoToRoom(roomId, playerId, { name: getName(name) });
    const playersInfo = getPlayersInfoInRoom(roomId);

    socket.join(roomId);
    socket.emit("roomJoinedWithId", roomId);
    io.to(roomId).emit("roomPlayerListChanged", playersInfo);
  });

  socket.on("changeRoomSettings", ({ roomId, settings }) => {
    if (getPlayerIdOfRoomAdmin(roomId) !== playerId) return;
    console.log("Changing settings", settings);
    updateRoomSettings(roomId, settings);
    io.to(roomId).emit("roomSettingsChanged", settings);
  });

  socket.on("disconnect", () => {
    console.log("Player disconnected with id", playerId);
    const roomId = getPlayerRoomId(playerId);
    playerDisconnected(playerId);
    //
    if (roomId) {
      console.log("Player was in a room with room id", roomId);
      const playersInfo = getPlayersInfoInRoom(roomId);
      io.to(roomId).emit("roomPlayerListChanged", playersInfo);
    }
  });
};

const gameNames = [
  "ShadowStrike",
  "Starfall",
  "CrystalSorcery",
  "MoonlightMystics",
  "EnchantedRealms",
  "ArcaneLegends",
  "MythicOdyssey",
  "DreamWeavers",
];

const getName = (name) => {
  var selectedName = name;
  if (!selectedName || selectedName === "") {
    const randomIndex = Math.floor(Math.random() * gameNames.length);
    selectedName = gameNames[randomIndex];
  }
  return selectedName;
};
module.exports = { handlePlayerConnection };
