const { nanoid } = require("nanoid");

const db = require("../db/index.js");

module.exports = (io, socket) => {
  const getMessages = () => {
    const messages = db.roomMessages[socket.roomId] || [];

    io.in(socket.roomId).emit("messages", messages);
  };

  const addMessage = (message) => {
    db.roomMessages[socket.roomId].push({
      messageId: nanoid(8),
      createdAt: new Date(),
      ...message,
    });

    getMessages();
  };

  const removeMessage = (messageId) => {
    db.roomMessages[socket.roomId] = db.roomMessages[socket.roomId].filter(
      (item) => item.messageId !== messageId
    );
    console.log(db.roomMessages);
    getMessages();
  };

  socket.on("message:get", getMessages);
  socket.on("message:add", addMessage);
  socket.on("message:remove", removeMessage);
};
