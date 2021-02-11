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

      if (CMD_NAME === "playing") {
        let song = await player.nowPlaying(message.guild.id);
        const embed = new MessageEmbed()
          .setDescription(`Currently playing: ${song.name}`)
          .setColor("BLURPLE");
        message.channel.send(embed);
      }

      if (CMD_NAME === "clear") {
        player.clearQueue(message.guild.id);
        const embed = new MessageEmbed()
          .setDescription(`Queue was cleared!`)
          .setColor("BLURPLE");
        message.channel.send(embed);
      }

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

      if (CMD_NAME === "skip") {
        let song = await player.skip(message.guild.id);
        const embed = new MessageEmbed()
          .setDescription(`${song.name} was skipped.`)
          .setColor("BLURPLE");
        message.channel.send(embed);
      }

      if (CMD_NAME === "pause") {
        let song = await player.pause(message.guild.id);
        const embed = new MessageEmbed()
          .setDescription(`${song.name} was paused.`)
          .setColor("BLURPLE");
        message.channel.send(embed);
      }

      if (CMD_NAME === "resume") {
        let song = await player.resume(message.guild.id);
        const embed = new MessageEmbed()
          .setDescription(`${song.name} was resumed.`)
          .setColor("BLURPLE");
        message.channel.send(embed);
      }

      if (CMD_NAME === "stop") {
        let song = await player.stop(message.guild.id);
        const embed = new MessageEmbed()
          .setDescription(`${song.name} stopped playing. Queue was cleared!`)
          .setColor("BLURPLE");
        message.channel.send(embed);
      }

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

      if (CMD_NAME === "vol") {
        player.setVolume(message.guild.id, parseInt(args[0]));
        const embed = new MessageEmbed()
          .setDescription(`Volume set to ${args[0]} !`)
          .setColor("BLURPLE");
        message.channel.send(embed);
      }

      if (CMD_NAME === "progress") {
        let progressBar = player.createProgressBar(message.guild.id, 20);
        const embed = new MessageEmbed()
          .setDescription(progressBar)
          .setColor("BLURPLE");
        message.channel.send(embed);
      }

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
              name: "Progress Bar {still under development}",
              value: "!progress",
            }
          )
          .setColor("BLURPLE");
        message.channel.send(embed);
      }
    }
  });
};
