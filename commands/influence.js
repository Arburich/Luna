
var moment = require("moment");
const Discord = require("discord.js");
exports.run = async(client, message, args, level) => {
	if (!args[0]) {
		message.channel.send("Incorrect syntax, use ``!helpme influence`` for correct usage. (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧");
		return;
	}
	var ParallelRequest = require('parallel-http-request');
	var config = {
    response: "simple"    // [optional] detail|simple|unirest, if empty then the response output is simple
};
	var request = new ParallelRequest(config)
	let factionDetail = "";
	let argu = ""
		for (var i = 0; i < args.length; i++) {
			if (i == args.length - 1)
				argu += args[i];
			else
				argu += args[i] + " ";
		}
	
	function download(sys) {
		let uri = `https://elitebgs.app/api/ebgs/v5/systems?name=${encodeURI(sys)}`;
		request.add(uri)
		//return JSON.parse(httpGet(uri));
	}
	function BGS(faction) {
		let uri = `https://elitebgs.app/api/ebgs/v5/factions?name=${encodeURI(faction)}`;
		request.add(uri)
		//return JSON.parse(httpGet(uri));
	}
	async function SENDIT(request){
		const output = new Promise((resolve) =>{
		request.send(resolve)
	}).then(function(result){
		return result
	})
	return output
	}
	BGS(argu)
	var factionSystems = await SENDIT(request)
	factionSystems = factionSystems[0].body
		if (factionSystems["docs"]["0"] == undefined) {
			message.channel.send("The faction wasn't found. Make sure you are spelling it correctly and that it "
				 + "is in game.")
			return;
		}
	var factions = [];
	var influence = [];
	for (var i = 0; i <= factionSystems["docs"]["0"]["faction_presence"].length - 1; i++) {
		if (factionSystems["docs"]["0"]["faction_presence"][i] != undefined) {
			factions.push(factionSystems["docs"]["0"]["faction_presence"][i]["system_name"]);
			influence.push(factionSystems["docs"]["0"]["faction_presence"][i]["influence"]);
		} else {
			break;
		}
	}
	var Header = "== Total Population Influence ==\nFaction :: " + argu + "\nSystems in :: " + factions.length + "\n";
	//var popAndInf = "";
	var str = 0;
	request.clean()
	for (var i = 0; i < factions.length; i++) {
		download(factions[i])
		}
	var sys = await SENDIT(request)
	for (var i = 0; i < sys.length; i++) {
		systems = sys[i].body
		var pop = systems["docs"]["0"]["population"];
		var infpop = pop * influence[i];
		infpop = Math.round(infpop)
		str += infpop
			//popAndInf += factions[i] + ", Pop : " + pop + ", INF : " + (influence[i] * 100) + "\nSystem Influenced : " + infpop + "\n"
	
	}
		
	const numberWithCommas = (x) => {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	str = numberWithCommas(str);
	Header += "People Under " + argu + "'s Flag :: " + str;
	message.channel.send(Header, {
		code: "asciidoc"
	})
	//message.channel.send(popAndInf, {code: "asciidoc"})
	//message.channel.send(Footer, {code: "asciidoc"})

}
exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ["inf"],
	permLevel: "User"
};

exports.help = {
	name: "influence",
	category: "Background Simulation",
	description: "Gives you the total population influence of a faction",
	usage: "inf <faction>"
};
