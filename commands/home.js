exports.run = async (client, message, args, level) => {
  const embed = {
  "title": "Home: G 139-50, Filipchenko City",
  "color": 4751592,
  "thumbnail": {
    "url": "https://i.imgur.com/JyoC6Kt.jpg"
  },
  "author": {
    "name": "== We Got This Corp =="
  },
  "fields": [
    {
      "name": "EDDB Links:",
      "value": "System: https://eddb.io/system/4920\nStation: https://eddb.io/station/203"
    },
    {
      "name": "Nearest Material Traders:",
      "value": "**Encoded**: *G 139-50*, Filipchenko City, 6 Ls, here\n**Manufactured**: *V2213 Ophiuchii*, De Andrade Dock, 2693 Ls, 12.61 Ly\n**Manufactured**: *Ross 720*, Raleigh Orbital, 6 Ls, 31.47 Ly\n**Raw**: *G 139-3*, O'Connor Dock, 6 Ls, 27.77 Ly"
    },
    {
      "name": "Nearest Tech Brokers: ",
      "value": "**Guardian**: Cochrane Enterprise, Cantjarisni,6 Ls, 36.87 Ly\n**Guardian**: Lie Ring, LP 685-43, 2381 Ls, 25.99 Ly\n**Human**: Thomson Port, LTT 15461, 40 Ls, 28.49 Ly"
    },
    {
      "name": "Nearest Interstellar Factors: ",
      "value": "Hopkins Penal colony, G 140-9, 1297 Ls, 4.32 Ly\nSeddon Dock, LHS 448, 35 Ls, 8.91 Ly"
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


