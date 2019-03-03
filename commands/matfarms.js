exports.run = async (client, message, args, level) => {
  var stuff = "== Engineering Materials farming locations ==\n\n== Manufactured == \n-Dav's hope- (210.50 ly from home)"
  + "\nSystem :: Hyades Sector DR-V c2-23"
  + "\nPlanet :: A 5 Coordinates :: 44.8180, -31.3893"
  + "\nhttps://canonn.science/codex/davs-hope/"
+ "\n\n== Raw =="
+ "\n-Orrere crash site- (84.64 ly from home)"
+ "\nSystem :: Orrere "
+ "\nPlanet :: 2 B "
+ "\nCoordinates :: 43.812, -173.972"
+ "\nhttps://canonn.science/codex/orrere-crashed-ship/ or\n"
+ "\n-Koli Discii crash site- (126.19 ly from home)"
+ "\nSystem :: Koli Discii"
+ "\nPlanet :: C 6 A"
+ "\nCoordinates :: 28.577, 7.219"
+ "\nhttps://canonn.science/codex/koli-discii-crashed-ship/"
+ "\n\n== Data =="
+ "\nAny system in a state of \"Famine\", find a Distribution Center and bring a wake scanner. or"
+ "\n\n-Jameson Crash Site- (260.40 ly from home)"
+ "\nSystem :: HIP 12099"
+ "\nPlanet :: 1 B Coordinates :: -54.3, -50.4";

  message.channel.send(stuff, {code: "asciidoc"})
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["matsfarms","matfarm","mf","matsfarm"],
  permLevel: "User"
};

exports.help = {
  name: "matfarms",
  category: "Custom Commands",
  description: "List of Farmable Mat Locations",
  usage: "matfarms"
};

