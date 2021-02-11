const PREFIX = "!";
const { MessageEmbed } = require("discord.js");
const translate = require("translation-google");

module.exports = (client) => {
  client.on("message", async (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith(PREFIX)) {
      const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);
      const replace = message.content.replace("!translate", "");
      if (CMD_NAME === "translate") {
        const detected = message.content;

        translate(detected, { to: "en" })
          .then(async (res) => {
            const rep = res.text.replace("! translate", "");
            const embed = new MessageEmbed()
              .setTitle("Translator")
              .addField(`Original Text in "${res.from.language.iso}"`, replace)
              .addField(`Translated Text in "en"`, rep)
              .setColor("BLURPLE");
            message.channel.send(embed);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
  });
};
