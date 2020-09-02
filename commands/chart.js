var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var moment = require("moment");
const Discord = require("discord.js");
exports.run = async(client, message, args, level) => {
	if (!args[0]) {
		message.channel.send("Incorrect syntax, use ``!helpme chart`` for correct usage. (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧");
		return;
	}

	let factionDetail = "";
	let argu = ""
		for (var i = 0; i < args.length; i++) {
			if (i == args.length - 1)
				argu += args[i];
			else
				argu += args[i] + " ";
		}
		argu = argu.split(", ")
	function httpGet(theUrl) {
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open("GET", theUrl, false); // false for synchronous request
		xmlHttp.send(null);
		return xmlHttp.responseText;
	}
	function download(system) {
		let systemLink = system.replace('+', '%2B').replace('&', '%26').replace(/ /g, '+').replace("&", "%26");
		let uri = `https://elitebgs.app/api/ebgs/v4/systems?name=${systemLink}`;
		return JSON.parse(httpGet(uri));
	}
	function BGS(faction) {
		let systemLink = faction.replace('+', '%2B').replace('&', '%26').replace(/ /g, '+').replace("&", "%26");
		let uri = `https://elitebgs.app/api/ebgs/v4/factions?name=${systemLink}`;
		return JSON.parse(httpGet(uri));
	}
	var factions = [];
	var system = download(argu[0]);

	if (system["docs"]["0"] == undefined) {
		message.channel.send("The system name wasn't found. Make sure you are spelling it correctly and that it "
			 + "is populated!")
		return;
	}
	var eddb_id = system["docs"]["0"]["eddb_id"]
		var systemName = system["docs"]["0"]["name"];
	if (!argu[1]) {
		var testchart = `http://jegin.net/testchart2.php?sysid=${eddb_id}.png`;
		let responseSystem = system.docs[0];
		let updatedAt = moment(responseSystem.updated_at);
		var output = "";
		message.channel.send("Last updated " + updatedAt.fromNow(), {
			 files: [{
                attachment: testchart,
                name: 'file.png'
				}]
		});
	} else {
		var time = parseInt(argu[1])
			var testchart = `https://jegin.net/testchart2.php?_jpg_csimd=1&sysid=${eddb_id}&ts=${time}&t=1.png`;
		let responseSystem = system.docs[0];
		let updatedAt = moment(responseSystem.updated_at);
		var output = "";
		message.channel.send("Last updated " + updatedAt.fromNow(), {
			files: [{
                attachment: testchart,
                name: 'file.png'
				}]
		});
	}

}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: "User"
};

exports.help = {
	name: "chart",
	category: "Background Simulation",
	description: "Chart of named system only",
	usage: "chart <system>"
};
/*var bgs = BGS(factions[i]);
output = output + "\n== "
+ bgs["docs"]["0"]["name"] + " ==\n      Influence :: <"
+ (bgs["docs"]["0"]["faction_presence"]["0"]["influence"] * 100).toFixed(2) + ">";
if(bgs["docs"]["0"]["faction_presence"]["0"]["state"] == undefined){
output = output + "\n      State: None"
}
else {
output = output + "\n      State :: <" + bgs["docs"]["0"]["faction_presence"]["0"]["state"] + ">";
}*/
