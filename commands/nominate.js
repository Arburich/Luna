exports.run = async(client, message, args, level) => { // eslint-disable-line no-unused-vars
	var fs = require("fs")
		var electionData = JSON.parse(fs.readFileSync(__dirname + "/../commandStorage/election.json", "utf8"));
	if (message.member.roles.find(r => r.name === "Newcomer")) {
		message.channel.send("Sorry, you must have your Newcomer Role Removed before you can be nominated!");
		return;
	}

	if (message.member.roles.find(r => r.name === "Background Simulation")) {
		for (var i = 0; i < Object.keys(electionData["names"]).length; i++) {
			if (electionData["names"][i] == message.author.username) {
				message.channel.send("You are already on the nomination list.");
				return;
			}
		}

		electionData["names"][Object.keys(electionData["names"]).length] = message.author.username
			message.channel.send("Added " + message.author.username + " to the nomination list!")
			fs.writeFileSync(__dirname + "/../commandStorage/election.json", JSON.stringify(electionData))
	} else {
		message.channel.send("You need to be a part of BGS to be nominated! make sure to type ``!rank Background Simulation`` to get the role.");
		return;
	}

};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: "User"
};

exports.help = {
	name: "nominate",
	category: "Background Simulation",
	description: "Nominmate yourself for Governer of a System",
	usage: "nominate"
};
