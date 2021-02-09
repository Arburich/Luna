module.exports = (client) => {
	client.logger.log( 'STARTING BGS LOOKOUT o7')
	var fs = require("fs")
	var moment = require("moment");
	var LookoutData = JSON.parse(fs.readFileSync(__dirname + "/../commandStorage/lookoutData.json", "utf8"));
	var count = 0
	
	var ParallelRequest = require('parallel-http-request');
	var config = {
    response: "simple"    // [optional] detail|simple|unirest, if empty then the response output is simple
};
	var request = new ParallelRequest(config);
	function download(sys) {
		let systemLink = sys.replace('+', '%2B').replace('&', '%26').replace(/ /g, '+').replace("&", "%26");
		let uri = `https://elitebgs.app/api/ebgs/v5/systems?name=${systemLink}&factionDetails=true`;
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
	async function Athanor (){
		request.add(`https://elitebgs.app/api/ebgs/v4/ticks`)
		client.logger.log('Checking Alchemy Den Systems for changes. Standbye')
		for(var system in LookoutData["systems"]){
			download(system)
		}
		var systemData = await SENDIT(request)
		var tickHappenedWhen = moment(systemData[0].body["time"]);
		var hist = JSON.parse(fs.readFileSync(__dirname + "/../commandStorage/historical.json", "utf8"));
		for(var i = 1; i < systemData.length; i++){
			current = systemData[i].body.docs[0]
			var currentINF = 0
			for(var j = 0; j < current.factions.length; j++){
				if(current.factions[j].name_lower == "alchemy den"){
					currentINF = current.factions[j]["faction_details"]["faction_presence"]["influence"]
					if(current.name in hist){
						var updatedAt = moment(current.updated_at)
						if(updatedAt.isBefore(tickHappenedWhen) && (currentINF != hist[current.name]["lastINF"])){
							lastINF = hist[current.name]["lastINF"]
							dif = currentINF - lastINF
							hist[current.name]["last"] = updatedAt
							hist[current.name]["lastINF"] = currentINF
							console.log(current.name + " was updated")
							var secondplace = []
							for (var u = 0; u < current.factions.length; u++){
									secondplace.push(current.factions[u]["faction_details"]["faction_presence"]["influence"])
								}
							secondplace.sort(function(a, b){return b-a});			
							//console.log(secondplace)
							var sendto = `+ Updated Data Detected +\n- INF: ${(dif<0?"":"+")}${(dif*100).toFixed(2)}% :: ${(currentINF * 100).toFixed(2)}%`
							if(current["controlling_minor_faction"] == "alchemy den"){
								sendto += `\n-- Second Place Diff: ${((secondplace[0] - secondplace[1])*100).toFixed(2)}%`
							}
							else{
								sendto += `\n-- INF to Controller: ${((secondplace[0] - currentINF)*100).toFixed(2)}%`
							}
							
							sendto += `\n---active: `
							var activeArray = current.factions[j]["faction_details"]["faction_presence"]["active_states"]
							var active = ""
							if (activeArray == 0) {
								active += `None`
							} else{
								for(var k = 0; k < activeArray.length; k++){
									active += activeArray[k].state + " "
								}
							}

							var pendingArray = current.factions[j]["faction_details"]["faction_presence"]["pending_states"]
							var pending = ""
							if (pendingArray == 0) {
								pending += `None`
							} else{
								for(var k = 0; k < pendingArray.length; k++){
									pending += pendingArray[k].state + " "
								}
							}

							sendto += active.trim().replace(" ", ", ")
							sendto += `\n---pending: `
							sendto += pending.trim().replace(" ", ", ")
							var channel = LookoutData["systems"][current.factions[j]["faction_details"]["faction_presence"]["system_name_lower"]]
							client.channels.cache.get(channel).send(sendto, {code: "diff"})
						}
					}
					else{
						hist[current.name] = {"last": current.updated_at, "lastINF" : currentINF}
						console.log(current.name + " was updated for the first time.")
			}
				}
			}
			
		}
		fs.writeFileSync(__dirname + "/../commandStorage/historical.json", JSON.stringify(hist))
		request.clean()
		client.logger.log("Done Checking!")
	}
	
	var cron = require("node-cron")
	
	cron.schedule('*/10 * * * *', () => {Athanor()});
};
