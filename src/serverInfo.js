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
      if (CMD_NAME === "serverInfo") {
        const { guild } = message;

        const {
          name,
          region,
          memberCount,
          ownerID,
          afkTimeout,
          channels,
          fetchBans,
          premiumTier,
          id,
        } = guild;
        console.log(guild);
        const icon = guild.iconURL();
        const user = "DeciMat3#6969";
        const embed = new MessageEmbed()
          .setTitle(`${name} Server Info`)
          .setThumbnail(icon)
          .addFields(
            {
              name: "Server ID",
              value: id,
              inline: true,
            },
            {
              name: "Server Name",
              value: name,
              inline: true,
            },
            {
              name: "Founder",
              value: `<@${ownerID}>`,
              inline: true,
            }
          )
          .addFields(
            {
              name: "Members",
              value: memberCount,
              inline: true,
            },
            {
              name: "Region",
              value: region,
              inline: true,
            },
            {
              name: "Nitro Tier",
              value: premiumTier,
              inline: true,
            }
          )
          .setColor("BLURPLE");

        message.channel.send(embed);
      }
    }
  });
};
