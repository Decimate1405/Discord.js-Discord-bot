const PREFIX = "!";
const { Client, MessageAttachment } = require("discord.js");
const client = new Client({
  partials: ["MESSAGE", "REACTION"],
});
// Attachments
module.exports = (client) => {
  client.on("message", (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith(PREFIX)) {
      const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);

      if (CMD_NAME === "noice") {
        const attachment = new MessageAttachment(
          "https://i.imgur.com/Fwx2fmJ.jpg"
        );
        message.channel.send(attachment);
      }

      if (CMD_NAME === "alwayshasbeen") {
        const attachment = new MessageAttachment(
          "https://i.imgur.com/Q7X3dQo.png"
        );
        message.channel.send(attachment);
      }

      if (CMD_NAME === "youwill") {
        const attachment = new MessageAttachment(
          "https://i.imgur.com/Gw3S6Aq.jpg"
        );
        message.channel.send(attachment);
      }

      if (CMD_NAME === "leo") {
        const attachment = new MessageAttachment(
          "https://i.imgur.com/jBUBlOC.jpg"
        );
        message.channel.send(attachment);
      }

      if (CMD_NAME === "thankg") {
        const attachment = new MessageAttachment(
          "https://i.imgur.com/GYLuFTF.jpg"
        );
        message.channel.send(attachment);
      }

      const xmas = [
        "https://cdn.dribbble.com/users/2058952/screenshots/14818755/media/9a3b167ba34284048fb022c86fbb8e6c.png?compress=1&resize=800x600",
        "https://cdn.dribbble.com/users/1068771/screenshots/9146892/media/322bb7e1db39b1f462bbc6b45c8af12f.jpg?compress=1&resize=800x600",
        "https://cdn.dribbble.com/users/1242068/screenshots/14781340/media/9c925d151d9d88f28731e26b1e93e297.jpg?compress=1&resize=800x600",
        "https://cdn.dribbble.com/users/205777/screenshots/9162006/media/b7709674b6633c7fbf28dac40e8e2436.jpg?compress=1&resize=800x600",
        "https://cdn.dribbble.com/users/1570141/screenshots/14817410/media/e383d4330ec6e52b4d1dddccd4fec93a.png?compress=1&resize=800x600",
        "https://cdn.dribbble.com/users/103909/screenshots/14809933/media/a05a095a75b21215f771267af31fc044.png?compress=1&resize=800x600",
        "https://cdn.dribbble.com/users/791530/screenshots/14667576/media/3769cf03e13203eebb3dd5745956c215.png?compress=1&resize=800x600",
        "https://cdn.dribbble.com/users/5697352/screenshots/14654531/media/86a0486632c1e6ebb258242b2c6c6f50.jpg?compress=1&resize=800x600",
        "https://cdn.dribbble.com/users/110372/screenshots/9157995/media/2d00631d394f056de67ab0cd25a7d82a.jpg?compress=1&resize=800x600",
      ];
      const xmasShuffled = xmas[Math.floor(Math.random() * xmas.length)];
      if (CMD_NAME === "xmas") {
        const attachment = new MessageAttachment(xmasShuffled);
        message.channel.send(attachment);
      }

      const halloween = [
        "https://cdn.dribbble.com/users/896264/screenshots/14487674/media/bc0ba8a5ede1dd1e427230324e3690f2.jpg?compress=1&resize=800x600",
        "https://cdn.dribbble.com/users/116499/screenshots/14425674/media/1565eb1edad6092f29bfb21982ba16ba.png?compress=1&resize=800x600",
        "https://cdn.dribbble.com/users/301809/screenshots/14150843/media/a9d120d70305abe746f8f7e342f7ce9c.png?compress=1&resize=800x600",
        "https://cdn.dribbble.com/users/1044993/screenshots/14475789/media/b5d8ccd26925c66b8c3193d19f955c78.png?compress=1&resize=800x600",
        "https://cdn.dribbble.com/users/185738/screenshots/14416744/media/1b813d3b90851b3376a35d8139d53238.png?compress=1&resize=800x600",
        "https://cdn.dribbble.com/users/3960463/screenshots/14487819/media/3c4c4da77502ec36801e4a8703388642.png?compress=1&resize=800x600",
        "https://cdn.dribbble.com/users/1044993/screenshots/14494936/media/f7098808728f4a16a25104fd734d540c.png?compress=1&resize=800x600",
        "https://cdn.dribbble.com/users/59947/screenshots/14482796/media/c6717202ed7fd4a56bb17beaaa8e051a.jpg?compress=1&resize=800x600",
        "https://cdn.dribbble.com/users/488314/screenshots/14458816/media/999e9ec64d24cd9bdedfc7f5077c2ce1.jpg?compress=1&resize=800x600",
        "https://cdn.dribbble.com/users/1044993/screenshots/14460296/media/b038dbb8cc4f3de0bcedcd9dc822156f.png?compress=1&resize=800x600",
        "https://cdn.dribbble.com/users/1044993/screenshots/14467418/media/5bd2432d3c67cc0ab8c6af0c2bd39ca6.png?compress=1&resize=800x600",
        "https://cdn.dribbble.com/users/508142/screenshots/14329065/media/b9faf2cf466b0890c4021a44cd449198.jpg?compress=1&resize=800x600",
        "https://cdn.dribbble.com/users/1804127/screenshots/14466416/media/80d4e0ca4fbfcc88281306615d18d419.png?compress=1&resize=800x600",
        "https://cdn.dribbble.com/users/466099/screenshots/14461558/media/f17b8bf794a000aef409497f03e33d2e.png?compress=1&resize=800x600",
        "https://cdn.dribbble.com/users/416805/screenshots/7825045/media/29e75bf56f4fa319236210d99d575129.png?compress=1&resize=800x600",
      ];
      const halloweenShuffled =
        halloween[Math.floor(Math.random() * halloween.length)];
      if (CMD_NAME === "halloween") {
        const attachment = new MessageAttachment(halloweenShuffled);
        message.channel.send(attachment);
      }
    }
  });
};
