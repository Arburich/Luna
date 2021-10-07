var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var moment = require("moment");
const Discord = require("discord.js");
exports.run = async(client, message, args) => {
	if (!args[0]) {
		message.channel.send("Incorrect syntax, use ``!helpme factionstatus`` for correct usage. (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧");
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
		let uri = `https://elitebgs.app/api/ebgs/v5/factions?name=${encodeURI(faction)}`;
		return JSON.parse(httpGet(uri));
	}

	// add a call to find out when the tick last happened
	var tickJSON = JSON.parse(httpGet(`https://elitebgs.app/api/ebgs/v5/ticks`));
	// should this be .time or .updated_at ? EliteBGS API not clear
	var tickHappenedWhen = moment(tickJSON[0]["time"]);
	var faction = BGS(argu)
		if (faction.docs.length == 0) {
			message.channel.send("The faction ``" + argu + "`` wasn't found. Make sure you spelled it right! (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧")
		}
		var output = ""
		for (var i = 0; i < faction.docs[0].faction_presence.length; i++) {
			output += `== ${faction.docs[0].faction_presence[i].system_name} ==\n`
			output += `influence :: ${(faction.docs[0].faction_presence[i].influence * 100).toFixed(1)}%\n`

			var updatedAt = moment(faction.docs[0].faction_presence[i].updated_at);
			output += `Last Updated :: ${updatedAt.fromNow()}`
			// add some logic to note if the inf predates the tick
			if (updatedAt.isBefore(tickHappenedWhen)) {
				output += ` (Stale Data)`
			}
			// and now put the newline back at the end since I pulled it out of the Last Updated line above
			output += `\n`

			// this should probably be a larger number now. Not sure how big. 10?
			if ((i % 4) == 0 && (i > 1)) {
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
	aliases: ["fi"],
	permLevel: "User"
};

exports.help = {
	name: "factioninfluence",
	category: "Background Simulation",
	description: "Influence % of a particular faction in all systems with presence",
	usage: "factioninfluence <faction name>"
};
