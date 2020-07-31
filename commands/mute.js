var moment = require("moment");
exports.run = async (client, message, args, level) => {
  
  
  if (!args[0]) {
	  message.channel.send("Lynx Corporation requires a personal's name to mute.")
	  return
  }
  let member = message.mentions.members.first();
  if(member.roles.has("473242738196742144")) {
	member.removeRole("473242738196742144").catch(console.error)
	message.channel.send(member + " was unmuted")
	
} else {
  member.addRole("473242738196742144")
  message.channel.send(member + " was muted.")
  var output = "Discord ID: \\" + member + " , " + member.displayName + ", " + member  
            +  "\nReason: user has been muted for a talk"
            +  "\nTime: " + moment().format("h:mma UTC, MM/DD/YYYY")
            +  "\nAction: muted until futher notice" 
  client.channels.get("544009403326791733").send(output)
  client.channels.get("504058476675465236").send(member + ", you have been muted. A moderator or admin will be here shortly to discuss why.")
}



};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["unmute"],
  permLevel: "Moderator"
};

exports.help = {
  name: "mute",
  category: "Moderator",
  description: "Mutes / Unmutes a user",
  usage: "mute <user>"
};
