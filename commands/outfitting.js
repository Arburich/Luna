var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var moment = require("moment");
exports.run = async(client, message, args, level) => {
	var ParallelRequest = require('parallel-http-request');
	var config = {
    response: "simple"    // [optional] detail|simple|unirest, if empty then the response output is simple
};
	var request = new ParallelRequest(config);
	let factionDetail = "";
	var allFlag = 0
	if(args[0].toLowerCase() == "all"){
		args.shift()
		allFlag = 1
	}
	let argu = ""
		for (var i = 0; i < args.length; i++) {
			if (i == args.length - 1)
				argu += args[i];
			else
				argu += args[i] + " ";
		}
	if(args.length == 0){
		argu = "Alchemy Den"
	}
	var start = Date.now()
	function download(sys) {
		let systemLink = sys.replace('+', '%2B').replace('&', '%26').replace(/ /g, '+').replace("&", "%26");
		let uri = `https://elitebgs.app/api/ebgs/v5/stations?system=${systemLink}`;
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
	function outfits(station) {
		//let systemLink = station.replace('+', '%2B').replace('&', '%26').replace(/ /g, '+').replace("&", "%26");
		let uri = `https://www.edsm.net/api-system-v1/stations/outfitting?marketId=${station}`;
		request.add(uri)
		//return JSON.parse(httpGet(uri));
	}
	function controllers(faction) {
		let systemLink = faction.replace('+', '%2B').replace('&', '%26').replace(/ /g, '+').replace("&", "%26");
		let uri = `https://www.edsm.net/api-system-v1/factions?systemName=${systemLink}`;
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
	
	var allControl = []
	if(allFlag == 1){
		request.clean()
			for (var i = 0; i < factions.length; i++) {
				controllers(factions[i])
			}
		var controllers = await SENDIT(request)
		var inControl = 0
		for(var i = 0; i < controllers.length; i++){
			if(argu.toLowerCase() == controllers[i].body.controllingFaction.name.toLowerCase()){
				allControl.push(controllers[i].body.name)
			}
		}
		factions = allControl
	}
	request.clean()
	for (var i = 0; i < factions.length; i++) {
		download(factions[i])
	}
	var systemStations = await SENDIT(request)
	
	
	request.clean()
	var stationIDs = [128666762]
	for (var i = 0; i < systemStations.length; i++) {
		for(var j = 0; j < systemStations[i].body.docs.length; j++){
			if(systemStations[i].body.docs[j].type != "Fleet Carrier"){
				if(allFlag == 0){
					if(systemStations[i].body.docs[j].controlling_minor_faction == argu.toLowerCase()){
						stationIDs.push(systemStations[i].body.docs[j].market_id)
					}
				}
				else{
					stationIDs.push(systemStations[i].body.docs[j].market_id)
				}
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
	var totalships = 0
	var missingships = ""
	for(key in shinrataShips){
		if(shinrataShips[key] > 0){
			totalships++
		}
		else{
			missingships +=  "\n- " + key
		}
	}
	//message.channel.send(`Alchemy Den has ${totalships}/${Object.keys(shinrataShips).length} (${(totalships/Object.keys(shinrataShips).length).toFixed(4)*100}%) of ships available for purchase. We are missing ${missingships}`)
	
	
	request.clean()
	for (var i = 0; i < stationIDs.length; i++) {
		outfits(stationIDs[i])
	}
	var outfitting = await SENDIT(request)
	var shinrataOutfits = {}
	for (var i = 0; i < outfitting.length; i++) {
		if(i == 0){ //shinra shipyard 
			for(var j = 0; j < outfitting[i].body.outfitting.length; j++){
				if(!outfitting[i].body.outfitting[j].name.includes("Guardian")){
					shinrataOutfits[outfitting[i].body.outfitting[j].name] = 0
				}
				
			}
		}
		else{
			if (outfitting[i].body.outfitting != null){
				for(var j = 0; j < outfitting[i].body.outfitting.length; j++){
					shinrataOutfits[outfitting[i].body.outfitting[j].name] += 1
				}
			}
		}
	}
	var totaloutfits = 0
	var missingoutfits = []
	for(key in shinrataOutfits){
		if(shinrataOutfits[key] > 0){
			totaloutfits++
		}
		else{
			missingoutfits.push(key)
		}
	}
	//message.channel.send(`Alchemy Den has ${totaloutfits}/${Object.keys(shinrataOutfits).length} (${(totaloutfits/Object.keys(shinrataOutfits).length).toFixed(4)*100}%) of modules available for purchase. We are missing:`)
	/*var output = ""
	for(var i = 0; i < missingoutfits.length;i++){
		output += "\n- " + missingoutfits[i]
		missingoutfits.pop()
		if(missingoutfits.length % 20 == 0){
			message.channel.send(output)
			output = ""
		}
	}*/
	function missingOuts(missing){
		var gib = ""
		for(var i = 0; i < missing.length;i++){
			gib += "\n" + missing
		}
		return missing
	}
	//message.channel.send(output)
	let randomColor = "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });
	var titlestring = ""
	if(allFlag == 0){
		titlestring = "Stations"
	}
	else{
		titlestring = "Systems"
	}
	const embed = {
		"title": `Outfitting for ${argu} Owned ${titlestring}`,
		"description": `${argu} has ${totaloutfits}/${Object.keys(shinrataOutfits).length} (${(totaloutfits/Object.keys(shinrataOutfits).length).toFixed(4)*100}%) of modules available for purchase.\n\n${argu} has ${totalships}/${Object.keys(shinrataShips).length} (${(totalships/Object.keys(shinrataShips).length).toFixed(4)*100}%) of ships available for purchase.`,
		"color": randomColor,
		"thumbnail": {
			"url": `https://i.imgur.com/Wa72X0h.png?1`
		},
		"fields": [{
				"name": "Missing Ships",
				"value": missingOuts(missingships),
				"inline": true
			}, {
				"name": "Missing Modules (Minus Guardian Tech)",
				"value": missingOuts(missingoutfits),
				"inline": true
			}
		]
	};
	message.channel.send({ embed });
	
	
	
	
	
	var end = Date.now() - start
	console.log(`Time taken: ${end} miliseconds seconds`)
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ["out","outfit"],
	permLevel: "User"
};

exports.help = {
	name: "outfitting",
	category: "Custom Commands",
	description: "Outfitting and Shipyard information for Alchemy Den",
	usage: "outfitting <system(optional)>"
};
