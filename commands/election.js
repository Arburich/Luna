exports.run = async(client, message, args, level) => { // eslint-disable-line no-unused-vars
	var fs = require("fs")
		var electionData = JSON.parse(fs.readFileSync(__dirname + "/../commandStorage/election.json", "utf8"));
	if (args[0] == "add") {
		electionData["names"][Object.keys(electionData["names"]).length] = args[1]
			message.channel.send("Added " + args[1] + " to the nomination list!")
	}
	if (args[0] == "start") {
		out = "== Vote for this System's Governor ==\n"
			for (var i = 0; i < Object.keys(electionData["names"]).length; i++) {
				out += String.fromCharCode(97 + i).toUpperCase() + " :: " + electionData["names"][i] + "\n"
			}
			var reacts = ["🇦", "🇧", "🇨", "🇩", "🇪", "🇫", "🇬", "🇭", "🇮", "🇯", "🇰", "🇱", "🇲", "🇳", "🇴", "🇵", "🇶", "🇷", "🇸", "🇹", "🇺", "🇻", "🇼", "🇽", "🇾", "🇿"]
			for (var j = 0; j < Object.keys(electionData["channels"]).length; j++) {
				var chan = electionData["channels"][j].replace(/\D/g, '');
				client.channels.cache.get(chan).send(out, {
					code: "asciidoc"
				}).then(async sentOut => {
					for (var i = 0; i < Object.keys(electionData["names"]).length; i++) {
						await sentOut.react(reacts[i])
					}
				})
			}
	}
	if (args[0] == "clear") {
		electionData["names"] = {}
		message.channel.send("Nominations Cleared!")
	}
	if (args[0] == "channel") {
		if (args[1] == "list"){
			var channelOutput = ""
			for(var i = 0; i < Object.keys(electionData["channels"]).length; i++){
				 channelOutput += electionData["channels"][i] + "\n"
			}
		    message.channel.send(channelOutput)
			return
		}
		chan = client.channels.cache.get(args[1])
			checkChannel = args[1].replace(/\D/g, '');
		    electionData["channels"][Object.keys(electionData["channels"]).length] = args[1]
			message.channel.send("Added " + args[1] + " to the channel output list.")
	}
	fs.writeFileSync(__dirname + "/../commandStorage/election.json", JSON.stringify(electionData))
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: "Moderator"
};

exports.help = {
	name: "election",
	category: "Background Simulation",
	description: "Election Options for Moderators",
	usage: "election <add | start | clear | channel> <governor | -- | -- | channel ID>"
};
