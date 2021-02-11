const PREFIX = "!";
module.exports = (client) => {
  // Kick members
  client.on("message", async (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith(PREFIX)) {
      const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);
      if (CMD_NAME === "kick") {
        if (!message.member.hasPermission("ADMINISTRATOR"))
          return message.reply(
            "You do not have permissions to use that command"
          );
        if (args.length === 0) return message.reply("Please provide an ID");
        const member = message.guild.members.cache.get(args[0]);
        if (member) {
          member
            .kick()
            .then((member) => message.channel.send(`${member} was kicked.`))
            .catch((err) =>
              message.channel.send("You cannot kick that user :(")
            );
        } else {
          message.channel.send("That member was not found");
        }
      }
    }
  });
};
