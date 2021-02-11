const PREFIX = "!";
const { MessageEmbed } = require("discord.js");
const anilist = require("anilist-node");
const Anilist = new anilist();

module.exports = (client) => {
  client.on("message", async (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith(PREFIX)) {
      const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);
      if (CMD_NAME === "anime") {
        Anilist.media.anime(124845).then((data) => {
          let day = Math.floor(
            data.nextAiringEpisode.timeUntilAiring / (3600 * 24)
          );
          let hours = Math.floor(
            (data.nextAiringEpisode.timeUntilAiring % (3600 * 24)) / 3600
          );
          let minutes = Math.floor(
            (data.nextAiringEpisode.timeUntilAiring % 3600) / 60
          );
          let seconds = Math.floor(data.nextAiringEpisode.timeUntilAiring % 60);

          const embed = new MessageEmbed()
            .setTitle(data.title.english)
            .setThumbnail(data.coverImage.large)
            .addFields(
              {
                name: "Released Year",
                value: data.seasonYear,
              },
              {
                name: "Average Score",
                value: data.averageScore,
              },
              {
                name: "Description",
                value: data.description,
              },
              {
                name: "Episode Duration",
                value: data.duration,
              },
              {
                name: "Episodes",
                value: data.episodes,
              },
              {
                name: `Episode ${data.nextAiringEpisode.episode} airing in`,
                value: `${day} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`,
              }
            )
            .setColor("BLURPLE");
          message.channel.send(embed);
        });
      }
    }
  });
};
