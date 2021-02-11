const PREFIX = "!";

module.exports = (client) => {
  client.on("message", async (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith(PREFIX)) {
      const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);
      const addReactions = (message) => {
        message.react("👍");

        setTimeout(() => {
          message.react("👎");
        }, 500);
      };

      if (CMD_NAME === "poll") {
        const fetched = await message.channel.messages.fetch({ limit: 1 });
        if (fetched && fetched.first()) {
          addReactions(fetched.first());
        }
      }
    }
  });
};
