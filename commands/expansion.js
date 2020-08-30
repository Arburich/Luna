var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var moment = require("moment");
const Discord = require("discord.js");
exports.run = async(client, message, args, level) => {
	let argu = "";
	for (var i = 0; i < args.length; i++) {
		if (i == args.length - 1)
			argu += args[i];
		else if (args[i] === ",")
			argu += args[i];
		else
			argu += args[i] + " ";
	}
	const BubbleDist = argu.split(",");
	if (!BubbleDist[0] || !BubbleDist[1]) {
		message.channel.send("Incorrect Syntax. Use ``!helpme expansion`` for correct usage. (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧");
		return;
	}
	function httpGet(theUrl) {
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open("GET", theUrl, false); // false for synchronous request
		xmlHttp.send(null);
		return xmlHttp.responseText;
	}
	function bubble(system, size) {
		const systemLink = system
			.replace("+", "%2B")
			.replace("&", "%26")
			.replace(/ /g, "+");
		const uri = `https://www.edsm.net/api-v1/cube-systems?systemName=${systemLink}&size=${size * 2}`;
		return JSON.parse(httpGet(uri));
	}
	function system(system) {
		let systemLink = system.replace('+', '%2B').replace('&', '%26').replace(/ /g, '+');
		let uri = `https://www.edsm.net/api-system-v1/factions?systemName=${systemLink}`;
		return JSON.parse(httpGet(uri));
	}

	//var system = download(argu);
	let active = []
	let pending = []
	var systems = bubble(BubbleDist[0], BubbleDist[1]);
	if (systems[0] == undefined) {
		message.channel.send("System not found. Try again! :purple_heart:");
		return
	}
	const msgActive = await message.channel.send("Loading Active Expansions.. This will take a while...");
	const msgPending = await message.channel.send("Loading Pending Expansions.. This will take a while...");
	for (let i = 0; i < systems.length; i++) {
		const CurrentSys = system(systems[i]["name"])
			if (CurrentSys["factions"].length != 0) {
				for (let j = 0; j < CurrentSys["factions"].length; j++) {
					if (CurrentSys["factions"][j]["activeStates"].length != 0) {
						for (let k = 0; k < CurrentSys["factions"][j]["activeStates"].length; k++) {
							if (CurrentSys["factions"][j]["activeStates"][k]["state"] == "Expansion") {
								var updatedAt = moment(CurrentSys["factions"][j]["lastUpdate"])
									active.push([CurrentSys["factions"][j]["name"], CurrentSys["name"], ((CurrentSys["factions"][j]["influence"] * 100)).toFixed(2) + " % influence", moment.unix(updatedAt).fromNow()])
							}
						}
					}
					if (CurrentSys["factions"][j]["pendingStates"].length != 0) {
						for (let k = 0; k < CurrentSys["factions"][j]["pendingStates"].length; k++) {
							if (CurrentSys["factions"][j]["pendingStates"][k]["state"] == "Expansion") {
								var updatedAt = moment(CurrentSys["factions"][j]["lastUpdate"])
									pending.push([CurrentSys["factions"][j]["name"], CurrentSys["name"], ((CurrentSys["factions"][j]["influence"] * 100)).toFixed(2) + " % influence", moment.unix(updatedAt).fromNow()])
							}
						}
					}
				}
			}
	}
	active.sort()
	pending.sort()
	activeOut = "== Active Expansions ==\n"
		pendingOut = "== Pending Expansions ==\n"
		for (let u = 0; u < active.length; u++) {
			activeOut += active[u][0] + " :: " + active[u][1] + " - " + active[u][2] + " // Last Updated " + active[u][3] + "\n"
		}
		for (let u = 0; u < pending.length; u++) {
			pendingOut += pending[u][0] + " :: " + pending[u][1] + " - " + pending[u][2] + " // Last Updated " + pending[u][3] + "\n"
		}
		msgActive.edit(activeOut, {
			code: "asciidoc"
		})
		msgPending.edit(pendingOut, {
			code: "asciidoc"
		})
		//message.channel.send("== Pending Expansions ==\n"+ pending,{code :"asciidoc"})
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ["exp"],
	permLevel: "User"
};

exports.help = {
	name: "expansion",
	category: "Background Simulation",
	description: "Nearest Pending and Active Expansions within x ly",
	usage: "expansion <system>, <ly> "
};
