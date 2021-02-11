const { MessageEmbed, Client } = require("discord.js");
const client = new Client({
  partials: ["MESSAGE", "CHANNEL"],
});

module.exports = (client) => {
  client.on("guildMemberAdd", (member) => {
    // Roles channel ID
    const rolesChannel = "807458672036413460";

    // Welcome message
    const message = `Greetings <@${
      member.id
    }>, welcome to our global union and revolution ${
      member.guild.name
    }.You are member ${
      member.guild.memberCount
    }! Please go to ${client.channels.cache
      .get(rolesChannel)
      .toString()} to pick a major and a professor role`;

    const embed = new MessageEmbed()
      .setTitle(
        "Engineering Business \n01001000 01100101 01101100 01101100 01101111"
      )
      .setThumbnail(member.user.displayAvatarURL())
      .setDescription(message)
      .setImage("https://i.imgur.com/4vdN2Vy.png")
      .setColor("BLURPLE");

    // Welcome channel ID
    client.channels.cache.get("806238460109258773").send(embed);
  });
};
