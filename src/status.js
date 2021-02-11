const PREFIX = "!";

module.exports = (client) => {
  client.on("message", async (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith(PREFIX)) {
      const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);
      const content = message.content.replace("!status", "");
      if (CMD_NAME === "status") {
        if (message.member.hasPermission("ADMINISTRATOR")) {
          client.user.setPresence({
            activity: {
              name: content,
              type: 0,
            },
          });
          message.channel.send("Status updated!");
        }
      }
    }
  });
};
