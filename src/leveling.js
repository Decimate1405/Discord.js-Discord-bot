const PREFIX = "!";
const Levels = require("discord-xp");
const canvacord = require("canvacord");
const { MessageAttachment } = require("discord.js");

module.exports = (client) => {
  // MongoDB for Leveling system
  Levels.setURL("add your mondoDb URI here");

  // Leveling up system
  client.on("message", async (message) => {
    if (!message.guild) return;
    if (message.author.bot) return;
    if (message.content.startsWith(PREFIX)) {
      const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);

      const randomXp = Math.floor(Math.random() * 99) + 1;
      const hasLeveledUp = await Levels.appendXp(
        message.author.id,
        message.guild.id,
        randomXp
      );

      if (hasLeveledUp) {
        const user = await Levels.fetch(message.author.id, message.guild.id);
        message.channel.send(
          `Noice one <@${message.author.id}> , you are now lvl ${user.level} !`
        );
      }

      //Rank
      if (CMD_NAME === "rank") {
        const user = await Levels.fetch(message.author.id, message.guild.id);
        //message.channel.send(`You are currently level **${user.level}**!`);
        const neededXp = Levels.xpFor(parseInt(user.level) + 1);
        //const userInfo = message.mentions.users.first() || message.member.user;
        /* const embed = new MessageEmbed()
          .setAuthor(
            `Rank Info for ${userInfo.username}`,
            userInfo.displayAvatarURL()
          )
          .addFields(
            {
              name: "User tag",
              value: userInfo.tag,
            },
            {
              name: "Level",
              value: user.level,
            },
            {
              name: "XP Needed to Level Up",
              value: neededXp,
            }
          )
          .setColor(`BLURPLE`);
        message.channel.send(embed); */

        const target = message.author;
        const userCard = await Levels.fetch(target.id, message.guild.id);

        if (!userCard)
          return message.reply(
            "You don't have any XP boi. Send messages to gain XP."
          );

        const rank = new canvacord.Rank()
          .setAvatar(
            message.author.displayAvatarURL({ dynamic: false, format: "png" })
          )
          .setCurrentXP(user.xp)
          .setLevel(user.level)
          .setRank(1, "RANK", false)
          .setRequiredXP(neededXp)
          .setStatus(message.member.presence.status)
          .setProgressBar(["#fc00ff", "#00dbde"], "GRADIENT")
          .setUsername(message.author.username)
          .setDiscriminator(message.author.discriminator);
        rank.build().then((data) => {
          const attachment = new MessageAttachment(data, "Rank.png");
          message.channel.send(attachment);
        });
      }

      //Leaderboard
      if (CMD_NAME === "leaderboard" || CMD_NAME === "lb") {
        const rawLeaderboard = await Levels.fetchLeaderboard(
          message.guild.id,
          5
        );
        if (rawLeaderboard.length < 1)
          return reply("Nobody's in leaderboard yet.");
        else {
          const leaderboard = Levels.computeLeaderboard(client, rawLeaderboard);
          const lb = (await leaderboard).map(
            (e) =>
              `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${
                e.level
              }\nXP: ${e.xp.toLocaleString()}`
          );
          message.channel.send(`${lb.join("\n\n")}`);
        }
      }
    }
  });
};
