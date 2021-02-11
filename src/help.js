const { MessageEmbed } = require("discord.js");
const PREFIX = "!";

module.exports = (client) => {
  client.on("message", async (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith(PREFIX)) {
      const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);
      if (CMD_NAME === "commands") {
        message.delete();
        const embed01 = new MessageEmbed()
          .setTitle(`Bot Commands`)
          .addField("!commands (!commands)", "Displays all bot commands.")
          .addField(
            "!bulkDel (!bulkDel)",
            "Deletes messages in bulk. Not everyone might have permissions to use this command."
          )
          .addField(
            "!qHelp (!qHelp {question})",
            "Used to ask questions regarding any course. Creates a new text channel under Questions and can be deleted using the emoji once the question has been answered."
          )
          .addField("!chat (!chat {anything})", "Just a fucked up chat bot.")
          .addField(
            "!kick (!kick {username/userID})",
            "Kicks a member from the server. Not everyone might have permissions to use this command."
          )
          .addField(
            "!inv (!inv)",
            "Displays a leaderboard based on the number of invites (only works with inf invites)"
          )
          .addField(
            "!ban (!ban {username/userID})",
            "Bans a member from the server. Not everyone might have permissions to use this command."
          )
          .addField(
            "!memberInfo (!memberInfo)",
            "Displays a users information."
          )
          .addField("!memes (!memes)", "Sends a meme using Reddit API.")
          .addField(
            "!mute (!mute {username/userID})",
            "Mutes a member in the server. Not everyone might have permissions to use this command."
          )
          .addField("!poll (!poll {question})", "Creates a general poll.")
          .addField("!userAvatar (!userAvatar)", "Displays user Avatar.")
          .addField(
            "!iam (!iam {Role that you want}",
            "You can change to any role except Admin."
          )
          .addField(
            "!translate (!translate {textToTranslate})",
            "Translates the text to English (Stable)."
          )
          .addField(
            "!libgen (!libgen {bookToSearch})",
            "Searches for the book in libgen.is and returns the download link."
          )
          .setColor("BLURPLE");

        const embed02 = new MessageEmbed()
          .setTitle("Meme/Emoji Attachemnts")
          .addField("!noice", "Noice Meme")
          .addField("!always", "Always Has Been Meme")
          .addField("!youwill", "You Will Meme")
          .addField("!leo", "Leo Meme from Django Unchained")
          .addField("!thankg", "RDJ Meme (don't know the source)")
          .addField("!x", "Doubt Meme")
          .addField("!sCat", "Sad Cat Meme")
          .addField("!piss", "Animated Piss GIF (requested by Santi)")
          .addField("!cute", "Cute Emoji")
          .addField("!sadEmo", "Sad Emoji")
          .addField("!oof", "Oof size Meme")
          .addField("!same", "Same Meme from Middle Earth")
          .addField("!yes", "Yes Meme")
          .addField("!understandable", "Understandable Have A Great Day Meme")
          .addField("!stopit", "Stop it. Get Some Help Meme.")
          .addField("!fuck", "Fuck Meme from The Witcher")
          .setColor("BLURPLE");
        message.channel.send(embed01);
        message.channel.send(embed02);
      }
    }
  });
};
