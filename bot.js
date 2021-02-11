const { Client } = require("discord.js");

const client = new Client({
  partials: ["MESSAGE", "REACTION"],
});

const poll = require("./src/poll");
const userAvatar = require("./src/userAvatar");
const encourage = require("./src/encourage");
const attachments = require("./src/attachments");
const welcome = require("./src/welcome");
const memes = require("./src/memes");
//const memberCount = require("./memberCount");
//const messageLog = require("./messageLog");
const mute = require("./src/mute");
const kick = require("./src/kick");
const ban = require("./src/ban");
const memberInfo = require("./src/memberInfo");
const chatBot = require("./src/chatBot");
const bulkDel = require("./src/bulkDel");
const status = require("./src/status");
const createTextChannel = require("./src/createTextChannel");
const createVoiceChannel = require("./src/createVoiceChannel");
//const leveling = require("./src/leveling");
const messageReactions = require("./src/messageReactions");
const mcStat = require("./src/mcStat");
const qHelp = require("./src/qHelp");
const joinSimulation = require("./src/joinSimulation");
const music = require("./src/music.js");
const serverInfo = require("./src/serverInfo");
const addRoles = require("./src/addRoles");
const animeScraper = require("./src/animeScraper");
const libgen = require("./src/libgen");
const ping = require("./src/ping");
const help = require("./src/help");
const stocks = require("./src/stocks");
const translate = require("./src/translate");

// Bot Ready
client.on("ready", async () => {
  console.log(`${client.user.tag} has logged in.`);

  poll(client);
  userAvatar(client);
  encourage(client);
  attachments(client);
  welcome(client);
  memes(client);
  //memberCount(client);
  mute(client);
  kick(client);
  ban(client);
  memberInfo(client);
  chatBot(client);
  bulkDel(client);
  status(client);
  createTextChannel(client);
  createVoiceChannel(client);
  //leveling(client);
  messageReactions(client);
  mcStat(client);
  qHelp(client);
  joinSimulation(client);
  music(client);
  serverInfo(client);
  addRoles(client);
  animeScraper(client);
  libgen(client);
  ping(client);
  help(client);
  stocks(client);
  translate(client);
});

client.login(process.env.TOKEN);
