const db = require("../db/index.js");

module.exports = (io, socket) => {
  const getUsers = () => {
    io.in(socket.roomId).emit("users", db.users);
    console.log(db.users);
  };

  const addUser = ({ username, userId }) => {
    if (!db.users[userId]) {
      db.users[userId] = { username, online: true };
    } else {
      db.users[userId].online = true;
    }
    getUsers();
  };

  const removeUser = (userId) => {
    if (db.users[userId]) {
      db.users[userId].online = false;
    }
    getUsers();
  };

  socket.on("user:get", getUsers);
  socket.on("user:add", addUser);
  socket.on("user:leave", removeUser);
};
