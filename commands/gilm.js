exports.run = async(client, message, args, level) => {
	if (!message) {
		message.channel.send("k")
	}
	let argu = ""
		for (var i = 0; i < args.length; i++) {
			if (i == args.length - 1)
				argu += args[i];
			else if (args[i] === " ")
				argu += args[i];
			else
				argu += args[i] + " ";
		}
		var n = argu.includes("everyone");
	if (n == true) {
		return;
	}
	var split = argu.split(" ");
	var out = ""
		for (var i = 0; i < split.length; i++) {
			var len = split[i].length;
			out += split[i].substring(0, len - 1) + "k" + split[i].substring(len - 1) + " ";
		}

		if (out.toLowerCase().includes("fuck") == true) {
			message.channel.send("Why would you make me say that... <:lunasweat:641711032724750350>")
			return;
		}
		message.channel.send(out)

};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: "User"
};

exports.help = {
	name: "gilm",
	category: "Custom Commands",
	description: "Just try it",
	usage: "gilm <anything you want to say to make it sound like gilmster>"
};
