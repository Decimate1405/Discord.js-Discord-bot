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
      if (CMD_NAME === "ban") {
        // Ban Members
        if (!message.member.hasPermission("ADMINISTRATOR"))
          return message.reply(
            "You do not have permissions to use that command"
          );
        if (args.length === 0) return message.reply("Please provide an ID");
        try {
          const user = await message.guild.members.ban(args[0]);
          message.channel.send("User was banned successfully");
        } catch (err) {
          console.log(err);
          message.channel.send(
            "An error occured. Either I do not have permissions or the user was not found"
          );
        }
      }
    }
  });
};
