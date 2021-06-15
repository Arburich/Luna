var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var moment = require("moment");
const Discord = require("discord.js");
exports.run = async(client, message, args, level) => {
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
		let systemLink = faction.replace('+', '%2B').replace(/ /g, '+').replace("&", "%26");

		let uri = `https://elitebgs.app/api/ebgs/v5/factions?name=${systemLink}`;
		return JSON.parse(httpGet(uri));
	}
	var faction = BGS(argu)
		if (faction.docs.length == 0) {
			message.channel.send("The faction ``" + argu + "`` wasn't found. Make sure you spelled it right! (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧")
		}
		var output = ""
		for (var i = 0; i < faction.docs[0].faction_presence.length; i++) {
			output += `== ${faction.docs[0].faction_presence[i].system_name} ==\n`
			output += `state     :: ${faction.docs[0].faction_presence[i].state}\n`
			output += `influence :: ${(faction.docs[0].faction_presence[i].influence * 100).toFixed(1)}%\n`

			if (faction.docs[0].faction_presence[i].active_states.length == 0) {
				output += `active states :: none\n`
			} else {
				output += `active states :: `
				var states = ""
					for (var j = 0; j < faction.docs[0].faction_presence[i].active_states.length; j++) {
						states += `${faction.docs[0].faction_presence[i].active_states[j].state} `
					}
					states = states.trim().replace(" ", ", ")
					output += `${states}\n`
			}

			if (faction.docs[0].faction_presence[i].pending_states.length == 0) {
				output += `pending states :: none\n`
			} else {
				output += `pending states :: `
				var states = ""
					for (var j = 0; j < faction.docs[0].faction_presence[i].pending_states.length; j++) {
						states += `${faction.docs[0].faction_presence[i].pending_states[j].state} `
					}
					states = states.trim().replace(" ", ", ")
					output += `${states}\n`
			}

			if (faction.docs[0].faction_presence[i].recovering_states.length == 0) {
				output += `recovering states :: none\n`
			} else {
				output += `recovering states:: `
				var states = ""
					for (var j = 0; j < faction.docs[0].faction_presence[i].recovering_states.length; j++) {
						states += `${faction.docs[0].faction_presence[i].recovering_states[j].state} `
					}
					states = states.trim().replace(" ", ", ")
					output += `${states}\n`
			}
			var updatedAt = moment(faction.docs[0].faction_presence[i].updated_at);
			output += `Last Updated :: ${updatedAt.fromNow()}\n`

			if (faction.docs[0].faction_presence[i].conflicts.length > 0) {
				output += ` * conflict status * \n`
				//var states = ""
				for (var j = 0; j < faction.docs[0].faction_presence[i].conflicts.length; j++) {
					output += `type     :: ${faction.docs[0].faction_presence[i].conflicts[j].type}\n`
					output += `status   :: ${faction.docs[0].faction_presence[i].conflicts[j].status}\n`
					output += `enemy    :: ${faction.docs[0].faction_presence[i].conflicts[j].opponent_name}\n`
					output += `at stake :: ${faction.docs[0].faction_presence[i].conflicts[j].stake}\n`
					output += `days won :: ${faction.docs[0].faction_presence[i].conflicts[j].days_won}\n`
				}
				//states = states.trim().replace(" ", ", ")
				//output += `${states}\n`
			}

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
	aliases: ["fs"],
	permLevel: "User"
};

exports.help = {
	name: "factionstatus",
	category: "Background Simulation",
	description: "Status of a particular faction",
	usage: "factionstatus <faction name>"
};
