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
      if (CMD_NAME === "queue") {
        let queue = await player.getQueue(message.guild.id);
        const embed = new MessageEmbed()
          .setTitle(`Songs Queue`)
          .setDescription(
            queue.songs
              .map((song, i) => {
                return `${i === 0 ? "Now Playing" : `#${i + 1}`} - ${
                  song.name
                } | ${song.author}`;
              })
              .join("\n")
          )
          .setColor("BLURPLE");
        message.channel.send(embed);
      }
    }
  });
};
