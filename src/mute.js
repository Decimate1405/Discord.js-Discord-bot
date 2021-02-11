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
      if (CMD_NAME === "mute") {
        if (message.author.bot) return;
        const syntax = "!mute <@> <duration> <m, h, d, l>";
        const { member, channel, content, mentions, guild } = message;
        // Checking if user has permissions
        const split = content.trim().split(" ");
        if (!message.member.hasPermission(["KICK_MEMBERS", "BAN_MEMBERS"])) {
          channel.send("You do not have permission to mute.");
          return;
        }
        if (split.length !== 4) {
          channel.send("Use correct command syntax: " + syntax);
          return;
        }

        const duration = split[2];
        const durationType = split[3];
        // Checking if during is valid
        if (isNaN(duration)) {
          channel.send("Duration should be a number.");
          return;
        }

        // Validating durationType
        const durations = {
          m: 60,
          h: 60 * 60,
          d: 60 * 60 * 24,
          l: -1,
        };
        if (!durations[durationType]) {
          channel.send("Duration Type is not valid. Check syntax: " + syntax);
          return;
        }

        const target = mentions.users.first();

        if (!target) {
          channel.send("Tag a user to mute.");
          return;
        }

        const { id } = target;
        const addRole = (member) => {
          const role = member.guild.roles.cache.find(
            (role) => role.name === "Muted"
          );
          if (role) {
            member.roles.add(role);
            console.log("Muted " + id);
          }
        };
        // Gives mute role
        const mutedMember = guild.members.cache.get(id);
        addRole(mutedMember);
      }
    }
  });
};
