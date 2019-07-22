exports.run = async (client, message, args, level) => {
  const embed = {
  "title": "== New Year, New Discoveries ==",
  "color": 5968035,
  "image": {
    "url": "https://i.imgur.com/r0CQM6M.png"
  },
  "fields": [
    {
      "name": "Stats",
      "value": "**16,602** Recorded Jumps\n**742,431** Recorded Total ly\n**75,503** Tons of Fuel Used\n[Visualization of the Route](https://i.imgur.com/lG0RAYl.png)\n[EDSM Page](https://www.edsm.net/en/expeditions/summary/id/63/name/New+Year%2C+New+Discoveries)"
    },
    {
      "name": "The Alchemists that Made It",
      "value": "**Arburich** - Federal Corvette - *Linguistic Alchemy*\n**TheGilmster** - Asp Explorer - *The Saltbath*\n**BlueMoon413** - Krait Phantom - *The Fernweh*\n**Flamenkosh** - Asp Explorer - *Whispers of Darkness*\n**Ferretpaint** - Imperial Courier - *Starbridge-E*\n**Jeros Calmera** - KraitmkII - *Venture*\n**Narm0** - Anaconda - *Ninquenian*\n**AnubisNor** - Anaconda - *Presten*\n**Jnroc** - Anaconda - *FNS Ferguson*\n**SirJumpnick** - Anaconda - *The Halberd*\n**VolcanicSly40** - Asp Explorer - *Vesuvius II*\n"
    }
  ]
};
	message.channel.send({ embed });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["newyearsnewdiscovery","newyearnewdiscoveries"],
  permLevel: "User"
};

exports.help = {
  name: "nynd",
  category: "Custom Commands",
  description: "Info about New Year, New Discoveries",
  usage: "nynd"
};


