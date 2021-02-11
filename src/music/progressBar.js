const PREFIX = "!";
const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const client = new Discord.Client();
const { Player } = require("discord-music-player");
const player = new Player(client, {
  timeout: 10000,
});
client.player = player;

module.exports = (client) => {
  client.on("message", async (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith(PREFIX)) {
      const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);
      if (CMD_NAME === "progress") {
        let progressBar = player.createProgressBar(message.guild.id, 20);
        const embed = new MessageEmbed()
          .setDescription(progressBar)
          .setColor("BLURPLE");
        message.channel.send(embed);
      }
    }
  });
};