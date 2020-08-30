var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var moment = require("moment");

exports.run = async(client, message, args, level) => { // eslint-disable-line no-unused-vars

	let argu = "";
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

	function download(CMDR) {
		let uri = `https://www.edsm.net/api-logs-v1/get-position/commanderName/${CMDR}`;
		return JSON.parse(httpGet(uri));
	}

	var place = download(argu);
	if (place.msgnum == 203) {
		message.channel.send("Looks like there is no CMDR by that name.");
		return;
	}
	if (place.system == null) {
		message.channel.send("Looks like that CMDR has their EDSM Profile set to \"Private\".");
		return;
	}

	function coords(system) {
		let systemLink = system.replace('+', '%2B').replace(' ', '+');
		let uri = `https://www.edsm.net/api-v1/system?sysname=${systemLink}&coords=1`;
		return JSON.parse(httpGet(uri));
	}

	var sys1 = coords("59 virginis");
	var sys2 = coords(place.system);

	var distance = Math.sqrt(Math.pow((sys2["coords"]["x"] - sys1["coords"]["x"]), 2)
			 + Math.pow((sys2["coords"]["y"] - sys1["coords"]["y"]), 2)
			 + Math.pow((sys2["coords"]["z"] - sys1["coords"]["z"]), 2)).toFixed(2);

	var x = distance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

	bigOleMessage = "";
	bigOleMessage += `Last Seen          :: ${place.system}\n`;
	bigOleMessage += `When               :: ${place.date}\n`;
	bigOleMessage += `In Ship            :: ${place.shipType}\n`;
	bigOleMessage += `Distance from Home :: ${x}ly`;
	message.channel.send(bigOleMessage, {
		code: "asciidoc"
	});
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: "User"
};

exports.help = {
	name: "whereis",
	category: "Custom Commands",
	description: "Last Known Location of a Commander",
	usage: "whereis <Commander's Name>"
};
