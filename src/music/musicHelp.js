const PREFIX = "!";
const { MessageEmbed } = require("discord.js");

module.exports = (client) => {
  client.on("message", async (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith(PREFIX)) {
      const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);
      if (CMD_NAME === "musicHelp") {
        const embed = new MessageEmbed()
          .setTitle(`Music Bot Commands`)
          .addFields(
            {
              name: "Play song",
              value: "!play songName",
            },
            {
              name: "Stop song",
              value: "!stop",
            },
            {
              name: "Pause song",
              value: "!pause",
            },
            {
              name: "Resume song",
              value: "!resume",
            },
            {
              name: "Skip current song",
              value: "!skip",
            },
            {
              name: "Display current song",
              value: "!playing",
            },
            {
              name: "View the song queue",
              value: "!queue",
            },
            {
              name: "Clear the song queue",
              value: "!clear",
            },
            {
              name: "Change volume",
              value: "!vol {number from 0-100}",
            },
            {
              name: "Loop current song",
              value: "!loop",
            },
            {
              name: "Stop looping current song",
              value: "!loop",
            },
            {
              name: "Progress Bar",
              value: "!progress",
            }
          )
          .setColor("BLURPLE");
        message.channel.send(embed);
      }
    }
  });
};
