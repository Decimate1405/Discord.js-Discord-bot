const PREFIX = "!";
const { Client, MessageEmbed } = require("discord.js");
const got = require("got");
// Memes
module.exports = (client) => {
  client.on("message", (message) => {
    if (!message.guild) return;
    if (message.author.bot) return;
    if (message.content.startsWith(PREFIX)) {
      const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);
      if (CMD_NAME === "memes") {
        setInterval(() => {
          got("https://www.reddit.com/r/memes/random.json")
            .then((response) => {
              const [list] = JSON.parse(response.body);
              const [post] = list.data.children;
              const permalink = post.data.permalink;
              const memeURL = `https://reddit.com${permalink}`;
              const memeImage = post.data.url;
              const memeTitle = post.data.title;
              const memeUpvotes = post.data.ups;
              const memeNumComments = post.data.num_comments;

              const embed = new MessageEmbed()
                .setTitle(`${memeTitle}`)
                .setURL(`${memeURL}`)
                .setColor("RANDOM")
                .setImage(memeImage)
                .setFooter(`👍 ${memeUpvotes} 💬 ${memeNumComments}`);

              message.channel.send(embed);
            })
            .catch(console.error);
        }, 3600000);
      }
    }
  });
};
