// Command Prefix
const PREFIX = "!";
const { Client, MessageEmbed } = require("discord.js");
const client = new Client({
  partials: ["MESSAGE", "REACTION"],
});

//const channelId = Math.random().toString(36).substring(7);
const solve = "✅";
//const { v4: uuidv4 } = require("uuid");
let registered = false;

module.exports = (client) => {
  client.on("message", async (message) => {
    const channelId = `${message.author.username}'s question`;
    if (message.author.bot) return;
    if (message.content.startsWith(PREFIX)) {
      const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);
      if (CMD_NAME === "qHelp") {
        const newChannel = await message.guild.channels.create(channelId, {
          parent: "798265220455071744",
        });
        const registerEvent = (client) => {
          if (registered) {
            return;
          }
          registered = true;
          client.on("messageReactionAdd", (reaction, user) => {
            if (user.bot) {
              return;
            }
            const { message } = reaction;
            if (newChannel) {
              message.channel.delete();
            }
          });
        };
        registerEvent(client);
        const msgContent = message.content.replace("!qHelp", "");
        message.channel.send(
          `<@${message.author.id}> your question has been sent. Wait for someone to answer.`
        );
        newChannel
          .send(
            `<@${message.author.id}> needs help with a question \n\n Question: ${msgContent} \n\n Click the ${solve} icon if the question is answered.`
          )
          .then((solvedMessage) => {
            solvedMessage.react(solve);
          });
      }
    }
  });
};
