exports.run = async (client, message, args, level) => {
  const embed = {
        "color": 15866827,
        "footer": {
            "icon_url": "https://cdn.discordapp.com/avatars/223604997206573056/6941c2098d5b6498259d96a6de041424.png?size=2048",
            "text": "Made by Arburich"
        },
        "image": {
            "url": "https://cdn.discordapp.com/attachments/125498072661753856/442505438353817611/asp.gif"
        }
    };
    message.channel.send({ embed });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "dab",
  category: "Custom Commands",
  description: "A tasteful dab",
  usage: "dab"
};
