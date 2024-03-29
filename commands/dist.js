var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
exports.run = async(client, message, args, level) => {
	let argu = ""
		for (var i = 0; i < args.length; i++) {
			if (i == args.length - 1)
				argu += args[i];
			else if (args[i] === ",")
				argu += args[i];
			else
				argu += args[i] + " ";
		}

		let systems = argu.split(",")
		if (!systems[0] || !systems[1]) {
			message.channel.send("Incorrect Syntax. Use ``!helpme dist`` for correct usage. (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧");
			return;
		}
		const msg = await message.channel.send("Loading The Galaxy..");
	function httpGet(theUrl) {
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open("GET", theUrl, false); // false for synchronous request
		xmlHttp.send(null);
		return xmlHttp.responseText;
	}
	msg.edit("Finding Stars in Space...");
	function download(system) {
		let uri = `https://www.edsm.net/api-v1/system?sysname=${encodeURI(system.trim())}&coords=1`;

		if (httpGet(uri).length <= 2 && systems[0] == system) {
			msg.edit("No information on EDSM for ``" + systems[0] + "``");
		}

		if (httpGet(uri).length <= 2 && systems[1] == system) {
			msg.edit("No information for ``" + systems[1] + "``");
		}
		return JSON.parse(httpGet(uri));
	}
	msg.edit("Doing A lot of Math....");

	var sys1 = download(systems[0]);
	var sys2 = download(systems[1]);

	var distance = Math.sqrt(Math.pow((sys2["coords"]["x"] - sys1["coords"]["x"]), 2)
			 + Math.pow((sys2["coords"]["y"] - sys1["coords"]["y"]), 2)
			 + Math.pow((sys2["coords"]["z"] - sys1["coords"]["z"]), 2)).toFixed(2);
	msg.edit("The distance between ``" + systems[0].trim() + "`` and ``" + systems[1].trim() + "`` is ``" + distance + " ly``");
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ["distance"],
	permLevel: "User"
};

exports.help = {
	name: "dist",
	category: "Custom Commands",
	description: "Gives the Distance between two systems in the EDSM database.",
	usage: "dist <system1>, <system2>"
};
