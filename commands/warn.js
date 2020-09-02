var moment = require("moment");
exports.run = async(client, message, args, level) => {
	//if (!args || args.length < 2) return message.channel.send("Incorrect Syntax. Use ``!helpme warn`` for correct usage. (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧");
	let member = message.mentions.members.first();
	let argu = ""
		for (var i = 0; i < args.length; i++) {
			if (i == args.length - 1)
				argu += args[i];
			else if (args[i] === ",")
				argu += args[i];
			else
				argu += args[i] + " ";
		}

		let cmd = argu.split(",")
		if (!cmd || cmd.length < 3)
			return message.channel.send("Incorrect Syntax. Use ``!helpme warn`` for correct usage. (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧");
		var output = "Discord ID: " + member.toString() + " , " + member.user.tag + ", " + member
		 + "\nReason: " + cmd[1]
		 + "\nTime: " + moment().format("h:mma UTC, MM/DD/YYYY")
		 + "\nAction: " + cmd[2]
		client.channels.cache.get("544009403326791733").send(output)
		message.channel.send(member.toString() + " was given a warning");
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: "Moderator"
};

exports.help = {
	name: "warn",
	category: "Moderator",
	description: "Adds a user warning, add evidence after",
	usage: "warn <@user>, <reason>, <action you took>"
};
