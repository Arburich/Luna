var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var moment = require("moment");
const Discord = require("discord.js");
exports.run = async(client, message, args, level) => {
	if (!args[0]) {
		message.channel.send("Incorrect syntax, use ``!helpme conflicts`` for correct usage. (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧");
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
	var faction = BGS(argu)
		if (faction.docs.length == 0) {
			message.channel.send("The faction ``" + argu + "`` wasn't found. Make sure you spelled it right! (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧")
		}
		var output = ""
		for (var i = 0; i < faction.docs[0].faction_presence.length; i++) {
			if (faction.docs[0].faction_presence[i].conflicts.length > 0) {
				output += `== ${faction.docs[0].faction_presence[i].system_name} ==\n`
				//var states = ""
				for (var j = 0; j < faction.docs[0].faction_presence[i].conflicts.length; j++) {
					output += `type     :: ${faction.docs[0].faction_presence[i].conflicts[j].type}\n`
					output += `status   :: ${faction.docs[0].faction_presence[i].conflicts[j].status}\n`
					output += `enemy    :: ${faction.docs[0].faction_presence[i].conflicts[j].opponent_name}\n`
					output += `at stake :: ${faction.docs[0].faction_presence[i].conflicts[j].stake}\n`
					output += `days won :: ${faction.docs[0].faction_presence[i].conflicts[j].days_won}\n`

					otherfac = BGS(faction.docs[0].faction_presence[i].conflicts[j].opponent_name)
						for (var k = 0; k < otherfac.docs[0].faction_presence.length; k++) {
							if (faction.docs[0].faction_presence[i].system_name == otherfac.docs[0].faction_presence[k].system_name) {
								for (var l = 0; l < otherfac.docs[0].faction_presence[k].conflicts.length; l++) {
									output += ` * Enemy Status *\n`
									output += `at stake :: ${otherfac.docs[0].faction_presence[k].conflicts[l].stake}\n`
									output += `days won :: ${otherfac.docs[0].faction_presence[k].conflicts[l].days_won}\n`
									var updatedAt = moment(faction.docs[0].faction_presence[i].updated_at);
									output += `== Last Updated ${updatedAt.fromNow()} ==\n`
								}
							}
						}
				}

			}
			if (output) {
				message.channel.send(output, {
					code: "asciidoc"
				})
				output = ""
			}

		}
		//message.channel.send(output,{code :"asciidoc"})


};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ["conflict", "wars"],
	permLevel: "User"
};

exports.help = {
	name: "conflicts",
	category: "Background Simulation",
	description: "Load Information about Conflicts related to a faction",
	usage: "conflicts <faction name>"
};
