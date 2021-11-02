const db = {
  roomMessages: {
    default: [
      {
        messageId: "1",
        userId: "1",
        senderName: "Abraham",
        messageText: "My name is Abraham",
        createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
      },
    ],
    sports: [
      {
        messageId: "2",
        userId: "2",
        senderName: "Jessica",
        messageText: "Hi! I am Jess.",
        createdAt: new Date().toISOString(),
      },
    ],
  },

  users: {
    0: { username: "Admin", online: true },
    1: { username: "Abraham", online: false },
    2: { username: "Jessica", online: false },
  },
};

module.exports = db;
