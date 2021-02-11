const PREFIX = "!";
const fmp = require("financialmodelingprep")(
  "a115f7964a632698280a534bb7e5313e"
);
const { MessageEmbed } = require("discord.js");

module.exports = (client) => {
  client.on("message", async (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith(PREFIX)) {
      const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);
      if (CMD_NAME === "stocks") {
        const args = message.content.slice(PREFIX.length).trim().split(" ");
        args.shift();
        stockSearch = args.join(" ");
        fmp
          .stock(stockSearch)
          .profile()
          .then((response) => {
            console.log(response);
            const embed = new MessageEmbed()
              .setTitle(`${stockSearch.toUpperCase()}'s Stock`)
              .setThumbnail(response.profile.image)
              .addFields(
                {
                  name: "Company Name",
                  value: response.profile.companyName,
                },
                {
                  name: "CEO",
                  value: response.profile.ceo,
                },
                {
                  name: "Price",
                  value: `${response.profile.price} ${response.profile.currency}`,
                },
                {
                  name: "Percentage Change",
                  value: response.profile.changesPercentage,
                },
                {
                  name: "Vol Avg",
                  value: response.profile.volAvg,
                },
                {
                  name: "Market Cap",
                  value: response.profile.mktCap,
                },
                {
                  name: "Exchange",
                  value: response.profile.exchangeShortName,
                },
                {
                  name: "Country",
                  value: response.profile.country,
                },
                {
                  name: "Sector",
                  value: response.profile.sector,
                }
              )
              .setColor("BLURPLE");
            message.channel.send(embed);
          });
        fmp
          .stock()
          .history({ start_date, end_date, limit, type })
          .then((res) => console.log(res));
      }
    }
  });
};
