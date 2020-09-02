var moment = require("moment");
exports.run = async(client, message, args, level) => {

	if (!args[0]) {
		message.channel.send("Who am I muting.")
		return
	}
	let member = message.mentions.members.first();
	if (member.roles.cache.has("473242738196742144")) {
		member.roles.remove("473242738196742144").catch(console.error)
		message.channel.send(member.toString() + " was unmuted")

	} else {
		member.roles.add("473242738196742144")
		message.channel.send(member.toString() + " was muted.")
		var output = "Discord ID: " + member.toString() + " , " + member.username + ", " + member
			 + "\nReason: user has been muted for a talk"
			 + "\nTime: " + moment().format("h:mma UTC, MM/DD/YYYY")
			 + "\nAction: muted until futher notice"
			client.channels.cache.get("544009403326791733").send(output)
			client.channels.cache.get("504058476675465236").send(member.toString() + ", you have been muted. A moderator or admin will be here shortly to discuss why.")
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
