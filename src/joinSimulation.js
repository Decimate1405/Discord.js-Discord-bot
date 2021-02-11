const PREFIX = "!";
const { Client } = require("discord.js");
const client = new Client({
  partials: ["MESSAGE"],
});

module.exports = (client) => {
  client.on("message", async (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith(PREFIX)) {
      const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);

      // Simulates a user joining to check the welcome message
      if (CMD_NAME === "joinSim") {
        client.emit("guildMemberAdd", message.member);
      }
    }
  });
};
