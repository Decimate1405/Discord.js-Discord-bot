const PREFIX = "!";
const util = require("minecraft-server-util");
const { MessageEmbed } = require("discord.js");

module.exports = (client) => {
  client.on("message", (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith(PREFIX)) {
      const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);
      if (CMD_NAME === "mcStat") {
        util
          .status("23.19.65.147", { port: 17425 })
          .then((response) => {
            console.log(response);
            const embed = new MessageEmbed()
              .setTitle("Minecraft Server Stats")
              .addField("Description", response.description)
              .addField("IP", response.host)
              .addField("Port", response.port)
              .addField("Version", response.version)
              .addField("Players Online", response.onlinePlayers)
              .addField("Max Players", response.maxPlayers)
              .setColor("BLURPLE");
            message.channel.send(embed);
          })
          .catch((error) => {
            throw error;
          });
      }
    }
  });
};
