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
      "Let's talk",
      "Atleast you're not dead",
      "Would you like me to take you out of your misery",
      "Jerk off a bit :)",
      "Atleast you're not a History Major",
      "Go hug your mom",
      "I like you",
      "I appreciate you",
      "I love you",
      "Go fuck yourself you twat",
      "I ain't here for your therapy",
      "I'm sad too knowing that you still live",
    ];
    const shuffledEncouragement =
      encouragement[Math.floor(Math.random() * encouragement.length)];

    if (message.content.includes("depressed" || "Depressed")) {
      console.log(`${message.author.username} : ${message.content}`);
      return message.reply("Fuck off!");
    }

    for (let i = 0; i < sadWordsLen; i++) {
      if (message.content.includes(sadWords[i])) {
        console.log(`${message.author.username} : ${message.content}`);
        return message.reply(shuffledEncouragement);
      }
    }
  });
};
