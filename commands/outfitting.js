var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var moment = require("moment");
exports.run = async(client, message, args, level) => {
	var ParallelRequest = require('parallel-http-request');
	var config = {
    response: "simple"    // [optional] detail|simple|unirest, if empty then the response output is simple
};
	var request = new ParallelRequest(config);
	let factionDetail = "";
	let argu = ""
		for (var i = 0; i < args.length; i++) {
			if (i == args.length - 1)
				argu += args[i];
			else
				argu += args[i] + " ";
		}
	var start = Date.now()
	function download(sys) {
		let systemLink = sys.replace('+', '%2B').replace('&', '%26').replace(/ /g, '+').replace("&", "%26");
		let uri = `https://www.edsm.net/api-system-v1/stations?systemName=${systemLink}`;
		request.add(uri)
		//return JSON.parse(httpGet(uri));
	}
	function BGS(faction) {
		let systemLink = faction.replace('+', '%2B').replace('&', '%26').replace(/ /g, '+').replace("&", "%26");
		let uri = `https://elitebgs.app/api/ebgs/v5/factions?name=${systemLink}`;
		request.add(uri)
		//return JSON.parse(httpGet(uri));
	}
	function shipyard(station) {
		//let systemLink = station.replace('+', '%2B').replace('&', '%26').replace(/ /g, '+').replace("&", "%26");
		let uri = `https://www.edsm.net/api-system-v1/stations/shipyard?marketId=${station}`;
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
	for (var i = 0; i <= factionSystems["docs"]["0"]["faction_presence"].length - 1; i++) {
		if (factionSystems["docs"]["0"]["faction_presence"][i] != undefined) {
			factions.push(factionSystems["docs"]["0"]["faction_presence"][i]["system_name"]);
		} else {
			break;
		}
	}
	request.clean()
	for (var i = 0; i < factions.length; i++) {
		download(factions[i])
	}
	
	var systemStations = await SENDIT(request)
	
	request.clean()
	var stationIDs = [128666762]
	for (var i = 0; i < systemStations.length; i++) {
		for(var j = 0; j < systemStations[i].body.stations.length; j++){
			if(systemStations[i].body.stations[j].type != "Fleet Carrier"){
				stationIDs.push(systemStations[i].body.stations[j].marketId)
			}
		}
	}
	
	request.clean()
	for (var i = 0; i < stationIDs.length; i++) {
		shipyard(stationIDs[i])
	}
	var shipyard = await SENDIT(request)
	var shinrataShips = {}
	for (var i = 0; i < shipyard.length; i++) {
		if(i == 0){ //shinra shipyard 
			for(var j = 0; j < shipyard[i].body.ships.length; j++){
				shinrataShips[shipyard[i].body.ships[j].name] = 0
			}
		}
		else{
			if (shipyard[i].body.ships != null){
				for(var j = 0; j < shipyard[i].body.ships.length; j++){
					shinrataShips[shipyard[i].body.ships[j].name] += 1
				}
			}
		}
	}
	
	for(var i = 0; i < shinrataShips.length; i++){
		console.log(shinrataShips)
	}
	var end = Date.now() - start
	console.log(`Time taken: ${end} miliseconds seconds`)
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ["out"],
	permLevel: "Bot Owner"
};

exports.help = {
	name: "outfitting",
	category: "Custom Commands",
	description: "Outfitting and Shipyard information for Alchemy Den",
	usage: "outfitting <system(optional)>"
};
