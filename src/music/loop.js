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
      if (CMD_NAME === "loop") {
        let toggle = player.toggleLoop(message.guild.id);
        if (toggle) {
          const embed = new MessageEmbed()
            .setDescription(`Current song will be played on loop.`)
            .setColor("BLURPLE");
          message.channel.send(embed);
        } else {
          const embed = new MessageEmbed()
            .setDescription(`Current song will no longer be looped.`)
            .setColor("BLURPLE");
          message.channel.send(embed);
        }
      }
    }
  });
};
