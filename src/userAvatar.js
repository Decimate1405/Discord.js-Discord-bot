const PREFIX = "!";
// User Avatar
module.exports = (client) => {
  client.on("message", (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith(PREFIX)) {
      const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);
      if (CMD_NAME === "avatar") {
        message.reply(message.author.displayAvatarURL());
      }
    }
  });
};
