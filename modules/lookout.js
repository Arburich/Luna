const { codeBlock } = require("@discordjs/builders");
module.exports = (client) => {

	async function SENDIT(request){
		const output = new Promise((resolve) =>{
		request.send(resolve)
	}).then(function(result){
		return result
	})
	return output
	}
	async function Athanor (){
		client.user.setActivity(`${client.config.defaultSettings.prefix}helpme`, {
		type: "PLAYING"
	});
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
		request.add(`https://elitebgs.app/api/ebgs/v5/ticks`)
		client.logger.log('Checking Alchemy Den Systems for changes. Standbye')
		for(var system in LookoutData["systems"]){
			download(system)
		}
		var systemData = await SENDIT(request)
		var tickHappenedWhen = moment(systemData[0].body[0]["time"]);
		//console.log(tickHappenedWhen)
		var hist = JSON.parse(fs.readFileSync(__dirname + "/../commandStorage/historical.json", "utf8"));
		//console.log(systemData.length)
		console.log("System Data start")
		try{
		for(var i = 1; i < systemData.length; i++){
			//console.log("setting current system " + i)
			current = systemData[i].body.docs[0]
			var currentINF = 0
			//console.log(`${i} out of ${systemData.length} systemData.length`)
			for(var j = 0; j < current.factions.length; j++){
				//console.log(`${j} out of ${current.factions.length} current.factions.length`)
				if(current.factions[j].name_lower == "alchemy den"){
					//console.log("found alchemy den")
					currentINF = current.factions[j]["faction_details"]["faction_presence"]["influence"]
					if(current.name in hist){
						var updatedAt = moment(current.updated_at)
						/*if (updatedAt.isBefore(tickHappenedWhen)){
							console.log("True")
							console.log(updatedAt)
							console.log(tickHappenedWhen)
							console.log("Updated at then actual")
						}else{
							console.log("false")
						}*/
						//console.log("checking ticks")
						if(updatedAt.isAfter(tickHappenedWhen) && (currentINF != hist[current.name]["lastINF"])){
							lastINF = hist[current.name]["lastINF"]
							dif = currentINF - lastINF
							hist[current.name]["last"] = updatedAt
							hist[current.name]["lastINF"] = currentINF
							//console.log(current.name + " was updated")
							var secondplace = []
							//console.log("checking second place")
							for (var u = 0; u < current.factions.length; u++){
								//console.log(`${u} out of ${current.factions.length}  current.factions.length`)
									secondplace.push(current.factions[u]["faction_details"]["faction_presence"]["influence"])
								}
							secondplace.sort(function(a, b){return b-a});			
							//console.log(secondplace)
							var sendto = `+ Updated Data for ${current.name} +\n- INF: ${(dif<0?"":"+")}${(dif*100).toFixed(2)}% :: ${(currentINF * 100).toFixed(2)}%`
							if(current["controlling_minor_faction"] == "alchemy den"){
								sendto += `\n-- Second Place Diff: ${((secondplace[0] - secondplace[1])*100).toFixed(2)}%`
							}
							else{
								sendto += `\n-- INF to Controller: ${((secondplace[0] - currentINF)*100).toFixed(2)}%`
							}
							
							sendto += `\n---active: `
							//console.log("checking active states")
							var activeArray = current.factions[j]["faction_details"]["faction_presence"]["active_states"]
							var active = ""
							if (activeArray == 0 || activeArray == undefined) {
								active += `None`
							} else{
								for(var k = 0; k < activeArray.length; k++){
									//console.log(`${k} out of ${activeArray.length}  activeArray.length`)
									active += activeArray[k].state + " "
								}
							}
							//console.log("checking pending states")
							var pendingArray = current.factions[j]["faction_details"]["faction_presence"]["pending_states"]
							var pending = ""
							if (pendingArray == 0 || pendingArray == undefined) {
								pending += `None`
							} else{
								for(var k = 0; k < pendingArray.length; k++){
									//console.log(`${k} out of ${pendingArray.length}   pendingArray.length`)
									pending += pendingArray[k].state + " "
								}
							}

							sendto += active.trim().replace(" ", ", ")
							sendto += `\n---pending: `
							sendto += pending.trim().replace(" ", ", ")
							//console.log("sending to channel")
							var channel = LookoutData["systems"][current.factions[j]["faction_details"]["faction_presence"]["system_name_lower"]]
							
							client.channels.cache.get(channel).send(codeBlock("diff", sendto));
						}
					}
					else{
						hist[current.name] = {"last": current.updated_at, "lastINF" : currentINF}
						//console.log(current.name + " was updated for the first time.")
			}
				}
			}
			
		}
		}catch(e){
			console.log(e)
		}
		fs.writeFileSync(__dirname + "/../commandStorage/historical.json", JSON.stringify(hist))
		request.clean()
		client.logger.log("Done Checking!")
	}
	
	var cron = require("node-cron")
	
	cron.schedule('*/10 * * * *', () => {Athanor()});
};
