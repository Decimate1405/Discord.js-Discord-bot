const PREFIX = "!";

module.exports = (client) => {
  client.on("message", async (message) => {
    if (!message.guild) return;
    if (message.author.bot) return;
    if (message.content.startsWith(PREFIX)) {
      const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);
      if (CMD_NAME === "iam") {
        const args = message.content.slice(PREFIX.length).trim().split(" ");
        args.shift();
        const roleName = args.join(" ");
        const { guild } = message;
        const role = guild.roles.cache.find((role) => {
          return role.name === roleName;
        });
        if (!role) {
          message.reply(`"${roleName}" role doesn't exist.`);
          return;
        }

        const user = message.author.id;
        const member = guild.members.cache.get(user);
        member.roles.add(role);
        if (role.name === "Admin") {
          message.reply(`You cannot add that role.`);
        } else {
          message.reply(`Role updated to *${role}*`);
        }
      }
    }
  });
};
