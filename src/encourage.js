// Encourage
module.exports = (client) => {
  client.on("message", (message) => {
    if (message.author.bot) return;

    const sadWords = [
      "sad",
      "depressed",
      "unhappy",
      "miserable",
      "depressing",
      "sorrowful",
      "dejected",
      "regretful",
      "downhearted",
      "despodent",
      "mournful",
      "heartbroken",
      "down in the dumps",
      "woeful",
    ];
    const sadWordsLen = sadWords.length;

    const encouragement = [
      "Cheer up!",
      "Hang in there.",
      "You are a great person.",
      "Do you need a hug?",
      "Don't be sad, be glad",
      "You're still alive?",
      "You'll be okay",
      "Let's talk"
    ];
    const shuffledEncouragement =
      encouragement[Math.floor(Math.random() * encouragement.length)];

    for (let i = 0; i < sadWordsLen; i++) {
      if (message.content.includes(sadWords[i])) {
        console.log(`${message.author.username} : ${message.content}`);
        return message.reply(shuffledEncouragement);
      }
    }
  });
};
