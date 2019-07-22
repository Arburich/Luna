exports.run = async (client, message, args, level) => {
  var stuff = "== Module Blueprint & Guardian Tech Components Farming =="
+ "\nSYNUEFE NL-N C23-4 "
+ "\nPlanet B3"
+ "\nLayout :: https://i.imgur.com/b4aMYwy.jpg?1"
+ "\nTech Zones :: https://i.imgur.com/z2uuyLC.jpg"
+ "\n\n== Weapons Blueprint Farming =="
+ "\nSYNUEFE EU-Q C21-10 "
+ "\nPlanet A3"
+ "\nLayout :: https://i.imgur.com/T2kwEvLh.png?1"
+ "\n\n== Guardian Data Farm =="
+ "\nCol 174 Sector JX-K B24-1"
+ "\nPlanet B4 Ancient Ruins"
+ "\n\n== Guardian Fighter Areas =="
+ "\nGuardian Key Zone :: NGC 2451A Sector LX-U D2-25"
+ "\n\nGuardian Strcture :: NGC 2451A Sector VJ-R C4-22 Planet A1 "
+ "\nReference Link :: https://i.imgur.com/CgpeWOy.jpg"
+ "\n\n==  Everything you need minus the fighters =="
+ "\n:: https://i.imgur.com/8cAaVXLh.png";

  message.channel.send(stuff, {code: "asciidoc"})
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["guardianfarms","guardiansfarm","gf","guardiansfarms"],
  permLevel: "User"
};

exports.help = {
  name: "guardianfarm",
  category: "Custom Commands",
  description: "List of Farmable Guardian Locations",
  usage: "GuardianFarm"
};

