const PREFIX = "!";

module.exports = (client) => {
  client.on("message", async (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith(PREFIX)) {
      const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);
      if (CMD_NAME === "voiceChannel") {
        const { guild } = message;
        const user = message.author.id;
        const member = guild.members.cache.get(user);
        if (member.hasPermission("ADMINISTRATOR")) {
          const channelName = message.content.replace("!voiceChannel", "");
          message.guild.channels
            .create(channelName, {
              type: "voice",
            })
            .then((channel) => {
              const categoryId = "713911206762512458";
              channel.setParent(categoryId);
            });
          message.channel.send(
            `<@${message.author.id}> Created a new Voice Channel.`
          );
        } else {
          message.channel.send(
            "You do not have permission to use this command."
          );
        }
      }
    }
  });
};
