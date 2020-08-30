exports.run = async(client, message, args, level) => {
	var fs = require("fs")
		var members = JSON.parse(fs.readFileSync("./members.json", "utf8"));

	var moment = require("moment");
	var todaysdate = moment();
	const list = client.guilds.get("319655945695395851");

	list.members.forEach(member => members["tracking"][member] = moment.utc(member.joinedAt));

	fs.writeFileSync("./members.json", JSON.stringify(members))

};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: "Moderator"
};

exports.help = {
	name: "trackinglist",
	category: "Custom Commands",
	description: "New User Tracking",
	usage: "tracking"
};
