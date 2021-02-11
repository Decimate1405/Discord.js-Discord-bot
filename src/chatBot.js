const PREFIX = "!";
const alexa = require("alexa-bot-api");
// Chat Bot
module.exports = (client) => {
  client.on("message", async (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith(PREFIX)) {
      const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);
      if (CMD_NAME === "chat") {
        const chatBot = new alexa("aw2plm");
        chatBot
          .getReply(message.content)
          .then((reply) => message.channel.send(reply));

        message.channel.startTyping();
        //const response = await fetch(
        //`http://api.brainshop.ai/get?bid=154365&key=6EwxOIDaKCS7p0iR&uid=1&msg=${encodeURIComponent(
        //message.content
        //)}`
        //)
        //.then((res) => res.json())
        //.then((data) => {
        //message.channel.send(data.cnt);
        //});
        return message.channel.stopTyping(true);
      }
    }
  });
};
