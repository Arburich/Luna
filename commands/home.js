exports.run = async (client, message, args, level) => {
  const embed = {
  "title": "Home: 59 Virginis, Hilmers Gateway",
  "color": 4751592,
  "image": {
    "url": "https://media.discordapp.net/attachments/334801941362245634/479388070483984394/20180715233604_1.png?width=1192&height=671"
  },
  "author": {
    "name": "== Alchemy Den =="
  },
  "fields": [
    {
      "name": "EDDB Links:",
      "value": "System: https://eddb.io/system/268\nStation: https://eddb.io/station/1521"
    },
    {
      "name": "Nearest Material Traders:",
      "value": "**Enecoded**: *LFT 1103*, Kirk Ring, 6 Ls, 18.52 Ly\n**Manufactured**: *LP 620-3*, Jensen Enterprise,  14 Ls, 18.21 Ly\n**Raw**: *MCC 686*, Smith City, 15 Ls, 26.92 Ly"
    },
    {
      "name": "Nearest Tech Brokers: ",
      "value": "**Guardian**: *GQ Virginis*, Ray Enterprise, 433 Ls, 27.99 Ly\n**Human**: *Xevioso*,  Ciferri Gateway, 30 Ls, 14.73 Ly"
    },
    {
      "name": "Nearest Interstellar Factors: ",
      "value": "*Wolf 497*, Buffett Vista,  56 Ls, 16.94 Ly"
    }
  ]
};
message.channel.send({ embed });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["h","homes"],
  permLevel: "User"
};

exports.help = {
  name: "home",
  category: "Custom Commands",
  description: "Shows Home System Information",
  usage: "home"
};


