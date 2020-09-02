var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var moment = require("moment");
const Discord = require("discord.js");
exports.run = async(client, message, args, level) => {
	if (!args[0]) {
		message.channel.send("Incorrect syntax, use ``!helpme update`` for correct usage. (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧");
		return;
	}
	let argu = ""
		for (var i = 0; i < args.length; i++) {
			if (i == args.length - 1)
				argu += args[i];
			else
				argu += args[i] + " ";
		}
	function httpGet(theUrl) {
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open("GET", theUrl, false); // false for synchronous request
		xmlHttp.send(null);
		return xmlHttp.responseText;
	}
	function BGS(faction) {
		let systemLink = faction.replace('+', '%2B').replace(/ /g, '+').replace("&", "%26");

		let uri = `https://elitebgs.app/api/ebgs/v4/factions?name=${systemLink}`;
		return JSON.parse(httpGet(uri));
	}
	var faction = BGS(argu)
		if (faction.docs.length == 0) {
			message.channel.send("The faction ``" + argu + "`` wasn't found. Make sure you spelled it right! (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧")
		}
		var output = ""
		for (var i = 0; i < faction.docs[0].faction_presence.length; i++) {
			output += `== ${faction.docs[0].faction_presence[i].system_name} ==\n`
			var updatedAt = moment(faction.docs[0].faction_presence[i].updated_at);
			output += `Last Updated :: ${updatedAt.fromNow()}\n`

			if ((i % 10) == 0 && (i > 1)) {
				message.channel.send(output, {
					code: "asciidoc"
				})
				output = ""
			}

		}
		message.channel.send(output, {
			code: "asciidoc"
		})

};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ["update", "updating", "updated"],
	permLevel: "User"
};

exports.help = {
	name: "updates",
	category: "Background Simulation",
	description: "Last Update of a faction, defaulted to Alchemy Den.",
	usage: "updates <faction name>"
};
