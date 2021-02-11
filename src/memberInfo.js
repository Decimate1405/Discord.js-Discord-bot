const PREFIX = "!";
const { MessageEmbed } = require("discord.js");

module.exports = (client) => {
  // MemberInfo
  client.on("message", (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith(PREFIX)) {
      const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);
      if (CMD_NAME === "memberInfo") {
        const { guild, channel } = message;
        const user = message.mentions.users.first() || message.member.user;
        const member = guild.members.cache.get(user.id);

        const embed = new MessageEmbed()
          .setAuthor(`${user.tag} user info`)
          .setThumbnail(user.displayAvatarURL())
          .addFields(
            {
              name: "Nickname",
              value: member.nickname || "None",
            },
            {
              name: "Joined server",
              value: new Date(member.joinedTimestamp).toLocaleDateString(),
            },
            {
              name: "Joined Discord",
              value: new Date(user.createdTimestamp).toLocaleDateString(),
            }
          )
          .setColor(`BLURPLE`);
        channel.send(embed);
      }
    }
  });
};
