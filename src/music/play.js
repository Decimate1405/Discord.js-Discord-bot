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
      if (CMD_NAME === "play") {
        let isPlaying = player.isPlaying(message.guild.id);
        const music = args.join(" ");
        if (isPlaying) {
          let song = await player.addToQueue(message.guild.id, music);
          song = song.song;
          const embed = new MessageEmbed()
            .setDescription(`${song.name} was added to the queue!`)
            .setColor("BLURPLE");
          message.channel.send(embed);
        } else {
          let song = await player.play(message.member.voice.channel, music);
          song = song.song;
          song.queue.on("end", () => {
            const embed = new MessageEmbed()
              .setDescription("The queue is empty, please add new songs!")
              .setColor("BLURPLE");
            message.channel.send(embed);
          });
          song.queue.on(
            "songChanged",
            (oldSong, newSong, skipped, repeatMode) => {
              if (repeatMode) {
                const embed = new MessageEmbed()
                  .setDescription(`Playing ${newSong.name} again...`)
                  .setColor("BLURPLE");
                message.channel.send(embed);
              } else {
                const embed = new MessageEmbed()
                  .setDescription(`Now playing ${newSong.name}...`)
                  .setColor("BLURPLE");
                message.channel.send(embed);
              }
            }
          );
          const embed = new MessageEmbed()
            .setDescription(`Started playing ${song.name}`)
            .setColor("BLURPLE");
          message.channel.send(embed);
        }
      }
    }
  });
};
