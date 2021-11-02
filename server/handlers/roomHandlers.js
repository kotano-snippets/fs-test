const db = require("../db/index.js");

module.exports = (io, socket) => {
  const getRooms = () => {
    const rooms = Object.keys(db.roomMessages);
    socket.emit("rooms", rooms);
  };

  const addRoom = (roomName, callback) => {
    if (db.roomMessages[roomName] === undefined) {
      db.roomMessages[roomName] = [];
      console.log(roomName)
      callback(true)
    }
    getRooms();
  };

  socket.on("rooms:get", getRooms);
  socket.on("rooms:add", addRoom);
};
