const fetch = require("node-fetch");

module.exports.run = (client) => {
  client.on("message", (message) => {
    if (!message.guild) return;
    if (message.author.bot) return;
    if (message.content.startsWith(PREFIX)) {
      const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);
      if (CMD_NAME === "chat") {
        let msg = args.join;
        fetch(
          `http://api.brainshop.ai/get?bid=154365&key=6EwxOIDaKCS7p0iR&uid=1&msg=${encodeURIComponent(
            msg
          )}`
        ).then((res) =>
          res.join.then((data) => {
            message.channel.send(data.cnt);
          })
        );
      }
    }
  });
};
