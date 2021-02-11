const PREFIX = "!";
const libgen = require("libgen");
const { MessageEmbed } = require("discord.js");

module.exports = (client) => {
  client.on("message", async (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith(PREFIX)) {
      const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);
      if (CMD_NAME === "libgen") {
        const mirror = await libgen.mirror();
        console.log(`Fastest mirror: ${mirror}`);
        const args = message.content.slice(PREFIX.length).trim().split(" ");
        args.shift();
        args.join(" ");
        book = args.toString();
        const options = {
          mirror: "http://libgen.is",
          query: book,
          count: 2,
          sort_by: "year",
          reverse: true,
        };
        try {
          const data = await libgen.search(options);
          let n = data.length;
          console.log(`${n} results for "${options.query}"`);
          while (n--) {
            console.log("");
            console.log("Title: " + data[n].title);
            console.log("Author: " + data[n].author);
            console.log("ISBN: " + data[n].identifier);
            console.log(
              "Download: " +
                "http://libgen.is/book/index.php?md5=" +
                data[n].md5.toLowerCase()
            );
            const embed = new MessageEmbed()
              .setTitle("Libgen.is")
              .addField("Title: ", data[n].title)
              .addField("Author: ", data[n].author)
              .addField("ISBN: ", data[n].identifier)
              .addField(
                "Download Link: ",
                "http://libgen.is/book/index.php?md5=" +
                  data[n].md5.toLowerCase()
              )
              .setColor("BLURPLE");
            message.channel.send(embed);
          }
        } catch (err) {
          console.error(err);
        }
      }
    }
  });
};
