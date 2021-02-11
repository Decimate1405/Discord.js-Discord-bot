// Member Count
module.exports = (client) => {
  const channelId = "791712812720062475";

  const updateMembers = (guild) => {
    const channel = guild.channels.cache.get(channelId);
    channel.setName(`Members: ${guild.memberCount.toLocaleString()}`);
  };

  client.on("guildMemberAdd", (member) => updateMembers(member.guild));
  client.on("guildMemberRemove", (member) => updateMembers(member.guild));

  const guild = client.guilds.cache.get("713911206762512456");
  updateMembers(guild);
};
