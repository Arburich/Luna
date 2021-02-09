exports.run = async(client, message, args, level) => { 
	var fs = require("fs")
	var lookoutData = JSON.parse(fs.readFileSync(__dirname + "/../commandStorage/lookoutData.json", "utf8"));
	let argu = ""
		for (var i = 0; i < args.length; i++) {
			if (i == args.length - 1)
				argu += args[i];
			else if (args[i] === ",")
				argu += args[i];
			else
				argu += args[i] + " ";
		}
	argu = argu.split(",")
	if (argu[0] == "add") {
		chan = client.channels.cache.get(argu[2])
		checkChannel = argu[2].replace(/\D/g, '');
		message.channel.send(`${argu[1].trim()} vs ${argu[1]}`)
		lookoutData["systems"][argu[1].trim()] = checkChannel
		fs.writeFileSync(__dirname + "/../commandStorage/lookoutData.json", JSON.stringify(lookoutData))
		message.channel.send("Added " + argu[1].trim() + " to the list of systems to check.")
		
	}
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: "Moderator"
};

exports.help = {
	name: "watchdog",
	category: "Background Simulation",
	description: "BGS Lookout commands and options",
	usage: "watchdog <add>"
};
